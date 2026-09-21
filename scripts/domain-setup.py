#!/usr/bin/env python3
"""Set up yorix-app.com on Cloudflare and point the registrar at it.

Every step is idempotent: run it again and it reports «already» instead of
rewriting settings. That matters because Cloudflare rate-limits repeated
configuration writes, and because a half-applied setup is worse than none.

Credentials, never passed on the command line:
  CF_API_TOKEN            a Cloudflare API token (see README of this script)
  ~/.config/yorix/spaceship.env   the registrar's API key and secret

Steps, in the order they must happen:
  status      what the zone and the registrar look like right now
  create      add the zone to the Cloudflare account (prints the nameservers)
  registrar   point the domain at those nameservers, through Spaceship's API
  harden      TLS and HTTPS settings once the zone is active
  attach      give the Worker the apex and www as custom domains
  hsts        turn on HSTS — only after the site has served fine over HTTPS
"""

from __future__ import annotations

import json
import os
import pathlib
import re
import sys
import time
import urllib.error
import urllib.request

DOMAIN = 'yorix-app.com'
ACCOUNT_ID = 'd8fb623c7f273b6064d02b397751d0f5'
WORKER = 'yorix-website'
CF_API = 'https://api.cloudflare.com/client/v4'
SPACESHIP_API = 'https://spaceship.dev/api/v1'


def die(message: str) -> None:
    print(f'✘ {message}')
    raise SystemExit(1)


def wrangler_token() -> str | None:
    """Wrangler's own login. It may read zones, which is enough for `status`."""
    config = pathlib.Path.home() / 'Library/Preferences/.wrangler/config/default.toml'
    if not config.exists():
        return None
    found = re.search(r'oauth_token\s*=\s*"([^"]+)"', config.read_text())
    return found.group(1) if found else None


def cf_token(*, writing: bool = True) -> str:
    token = os.environ.get('CF_API_TOKEN')
    if token:
        return token
    borrowed = wrangler_token() if not writing else None
    if borrowed:
        return borrowed
    die('CF_API_TOKEN is not set. Create a token with: Account · Zone · Create;\n'
        '  Zone · Zone · Edit; Zone · DNS · Edit; Zone · Zone Settings · Edit;\n'
        '  Zone · SSL and Certificates · Edit; Zone · Workers Routes · Edit.')


def call(url: str, *, token: str, method: str = 'GET', body: dict | None = None, headers: dict | None = None) -> dict:
    data = json.dumps(body).encode() if body is not None else None
    request = urllib.request.Request(url, data=data, method=method)
    request.add_header('Content-Type', 'application/json')
    if token:
        request.add_header('Authorization', f'Bearer {token}')
    for key, value in (headers or {}).items():
        request.add_header(key, value)
    try:
        with urllib.request.urlopen(request, timeout=45) as response:
            return json.loads(response.read())
    except urllib.error.HTTPError as error:
        raw = error.read().decode(errors='replace')
        try:
            return json.loads(raw)
        except ValueError:
            return {'success': False, 'errors': [{'message': f'HTTP {error.code}: {raw[:200]}'}]}


def cf(route: str, *, method: str = 'GET', body: dict | None = None) -> dict:
    answer = call(f'{CF_API}{route}', token=cf_token(writing=method != 'GET'), method=method, body=body)
    if not answer.get('success', False):
        messages = '; '.join(str(e.get('message')) for e in answer.get('errors', []))
        die(f'Cloudflare said no on {method} {route}: {messages}')
    return answer


def zone() -> dict | None:
    found = cf(f'/zones?name={DOMAIN}').get('result') or []
    return found[0] if found else None


def spaceship_credentials() -> tuple[str, str]:
    env = pathlib.Path.home() / '.config/yorix/spaceship.env'
    if not env.exists():
        die(f'missing {env}')
    text = env.read_text()
    key = re.search(r'SPACESHIP_API_KEY=(\S+)', text)
    secret = re.search(r'SPACESHIP_API_SECRET=(\S+)', text)
    if not key or not secret:
        die(f'{env} has no SPACESHIP_API_KEY / SPACESHIP_API_SECRET')
    return key.group(1), secret.group(1)


def spaceship(route: str, *, method: str = 'GET', body: dict | None = None) -> dict:
    key, secret = spaceship_credentials()
    return call(f'{SPACESHIP_API}{route}', token='', method=method, body=body,
                headers={'X-Api-Key': key, 'X-Api-Secret': secret})


def cmd_status() -> None:
    here = zone()
    print(f'zone: {"—" if not here else here["status"]}'
          f'{"" if not here else f" (id {here['id']}, plan {here.get('plan', {}).get('name')})"}')
    if here:
        print(f'  Cloudflare nameservers: {", ".join(here.get("name_servers") or [])}')
    domain = spaceship(f'/domains/{DOMAIN}')
    hosts = (domain.get('nameservers') or {}).get('hosts')
    print(f'registrar: nameservers {hosts}, expires {domain.get("expirationDate")}, autoRenew {domain.get("autoRenew")}')
    if here and here['status'] == 'active':
        for setting in ('ssl', 'always_use_https', 'min_tls_version', 'automatic_https_rewrites', 'tls_1_3', 'security_header'):
            value = cf(f'/zones/{here["id"]}/settings/{setting}')['result'].get('value')
            print(f'  {setting}: {json.dumps(value, ensure_ascii=False)[:120]}')
        routes = cf(f'/accounts/{ACCOUNT_ID}/workers/domains?zone_name={DOMAIN}').get('result') or []
        print(f'  worker custom domains: {[r.get("hostname") + " → " + r.get("service", "?") for r in routes] or "none"}')


def cmd_create() -> None:
    here = zone()
    if here:
        print(f'already: zone exists, status {here["status"]}')
    else:
        here = cf('/zones', method='POST', body={'name': DOMAIN, 'account': {'id': ACCOUNT_ID}, 'type': 'full'})['result']
        print(f'created zone {here["id"]}')
    print('nameservers to set at the registrar:')
    for host in here.get('name_servers') or []:
        print(f'  {host}')


def cmd_registrar() -> None:
    here = zone()
    if not here:
        die('create the zone first: the registrar needs Cloudflare\'s nameservers')
    wanted = sorted(h.lower() for h in here.get('name_servers') or [])
    if not wanted:
        die('Cloudflare has not assigned nameservers yet')
    current = sorted(h.lower() for h in (spaceship(f'/domains/{DOMAIN}').get('nameservers') or {}).get('hosts') or [])
    if current == wanted:
        print(f'already: registrar points at {", ".join(wanted)}')
        return
    print(f'registrar: {", ".join(current)} → {", ".join(wanted)}')
    answer = spaceship(f'/domains/{DOMAIN}/nameservers', method='PUT',
                       body={'provider': 'custom', 'hosts': wanted})
    if answer.get('detail'):
        die(f'Spaceship said no: {answer.get("detail")}')
    print('done — DNS usually moves within an hour, sometimes up to 24')


# Settings the site needs, and why:
#   ssl=strict          Cloudflare checks the origin's certificate, so nobody
#                       can sit in the middle between Cloudflare and the Worker.
#   always_use_https    plain http is answered with a redirect, never content.
#   min_tls_version=1.2 1.0/1.1 are broken and fail PCI checks.
#   tls_1_3=on          faster handshakes for everyone.
#   automatic_https_rewrites  an http:// link inside a page is served over https.
#   browser_check / security_level are left at Cloudflare's defaults on purpose:
#                       turning them up blocks crawlers and link previews.
HARDENING = {
    'ssl': 'strict',
    'always_use_https': 'on',
    'min_tls_version': '1.2',
    'tls_1_3': 'on',
    'automatic_https_rewrites': 'on',
}


def cmd_harden() -> None:
    here = zone()
    if not here:
        die('no zone yet')
    if here['status'] != 'active':
        die(f'zone is {here["status"]}: wait until Cloudflare sees its own nameservers, then run this again')
    for setting, wanted in HARDENING.items():
        current = cf(f'/zones/{here["id"]}/settings/{setting}')['result'].get('value')
        if current == wanted:
            print(f'already: {setting} = {wanted}')
            continue
        cf(f'/zones/{here["id"]}/settings/{setting}', method='PATCH', body={'value': wanted})
        print(f'set {setting}: {current} → {wanted}')


def cmd_attach() -> None:
    here = zone()
    if not here or here['status'] != 'active':
        die('zone must be active before a Worker can take the hostname')
    existing = {r.get('hostname') for r in (cf(f'/accounts/{ACCOUNT_ID}/workers/domains?zone_name={DOMAIN}').get('result') or [])}
    for hostname in (DOMAIN, f'www.{DOMAIN}'):
        if hostname in existing:
            print(f'already: {hostname} serves {WORKER}')
            continue
        cf(f'/accounts/{ACCOUNT_ID}/workers/domains', method='PUT',
           body={'environment': 'production', 'hostname': hostname, 'service': WORKER, 'zone_id': here['id']})
        print(f'{hostname} → {WORKER} (Cloudflare issues and renews the certificate itself)')


def cmd_hsts() -> None:
    """Tell browsers to refuse plain http for this host.

    Deliberately without `preload`: a preloaded domain is baked into browsers
    and takes months to undo. Six months of max-age with subdomains is what a
    careful launch uses; preload is a later, separate decision.
    """
    here = zone()
    if not here or here['status'] != 'active':
        die('zone must be active')
    for hostname in (DOMAIN, f'www.{DOMAIN}'):
        try:
            with urllib.request.urlopen(f'https://{hostname}/', timeout=30) as response:
                if response.status >= 400:
                    die(f'{hostname} answers {response.status} — fix that before locking browsers to https')
        except Exception as error:  # noqa: BLE001 - any failure here means «not ready»
            die(f'{hostname} is not serving yet ({error}); HSTS would lock visitors out')
    cf(f'/zones/{here["id"]}/settings/security_header', method='PATCH', body={'value': {'strict_transport_security': {
        'enabled': True, 'max_age': 15552000, 'include_subdomains': True, 'preload': False, 'nosniff': True,
    }}})
    print('HSTS on: 6 months, subdomains included, no preload')


COMMANDS = {
    'status': cmd_status,
    'create': cmd_create,
    'registrar': cmd_registrar,
    'harden': cmd_harden,
    'attach': cmd_attach,
    'hsts': cmd_hsts,
}

if __name__ == '__main__':
    name = sys.argv[1] if len(sys.argv) > 1 else 'status'
    if name not in COMMANDS:
        die(f'unknown step «{name}». Steps: {", ".join(COMMANDS)}')
    COMMANDS[name]()

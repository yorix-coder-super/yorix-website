'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import Image from 'next/image';
import { ArrowDownRight, ArrowLeft, ArrowRight, Check, ChevronDown, Copy, Crown, MonitorSmartphone, Share2 } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { Art, Sparkle } from '../home/art';
import { Magnetic } from '../subscription/Magnetic';
import { campaignLocales, languageNames, type CampaignCopy, type CampaignLocale } from '../i18n/campaigns/instagram';
import type { campaignLinks } from '../ru/start/campaign';

const stepFromHash = () => Math.max(0, Math.min(3, Number(/^#step-([1-4])$/.exec(window.location.hash)?.[1] ?? 1) - 1));

const subscribeHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const serverStep = () => 0;
function subscribeStep(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  window.addEventListener('popstate', onChange);
  return () => {
    window.removeEventListener('hashchange', onChange);
    window.removeEventListener('popstate', onChange);
  };
}

type Props = { locale: CampaignLocale; copy: CampaignCopy; links: ReturnType<typeof campaignLinks>; qr: ReactNode; languageQuery: string };

export function Funnel({ locale, copy, links, qr, languageQuery }: Props) {
  const step = useSyncExternalStore(subscribeStep, stepFromHash, serverStep);
  const enhanced = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);
  const canShare = enhanced && typeof navigator.share === 'function';
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'manual'>('idle');
  const device = {
    android: enhanced && /Android/i.test(navigator.userAgent),
    instagram: enhanced && /Instagram/i.test(navigator.userAgent),
  };
  const visited = useRef(new Set<number>());
  const root = useRef<HTMLDivElement>(null);
  const hasEntered = useRef(false);

  const track = useCallback((event: string, screen: number) => {
    const detail = { event, screen: screen + 1, locale, campaign: links.tag };
    window.dispatchEvent(new CustomEvent('yorix:funnel', { detail }));
    const target = window as Window & { dataLayer?: Record<string, unknown>[] };
    target.dataLayer ??= [];
    target.dataLayer.push(detail);
  }, [locale, links.tag]);

  useEffect(() => {
    if (!enhanced || visited.current.has(step)) return;
    visited.current.add(step);
    track('funnel_step_view', step);
  }, [step, enhanced, track]);

  useEffect(() => {
    if (enhanced) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [enhanced, step]);

  useEffect(() => {
    const node = root.current;
    if (!enhanced || !node) return;
    node.dataset.entrance = hasEntered.current || performance.now() < 2500 ? 'on' : 'off';
    hasEntered.current = true;
    const visual = node.querySelector('.funnel-screen:not([hidden]) .funnel-visual');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;
    const sync = () => { node.dataset.motion = inView && !document.hidden && !reduced.matches ? 'on' : 'off'; };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    if (visual) observer.observe(visual);
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', sync);
      node.dataset.motion = 'off';
    };
  }, [enhanced, step]);

  useEffect(() => {
    if (!enhanced || step >= 3 || !root.current) return;
    const next = root.current.querySelector(`#step-${step + 2}`);
    let idle: number | undefined;
    let timer: number | undefined;
    const prepare = () => {
      next?.querySelectorAll('img').forEach(img => {
        img.loading = 'eager';
        void img.decode().catch(() => {});
      });
    };
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(prepare, { timeout: 2000 });
      else timer = window.setTimeout(prepare, 300);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    return () => {
      window.removeEventListener('load', schedule);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [enhanced, step]);

  function go(next: number) {
    if (next === step) return;
    window.history.pushState(null, '', `#step-${next + 1}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    requestAnimationFrame(() => {
      root.current?.querySelector<HTMLElement>(`#step-${next + 1} h1, #step-${next + 1} h2`)?.focus({ preventScroll: true });
    });
  }

  async function share() {
    if (canShare) {
      try { await navigator.share({ title: 'Yorix', url: links.share }); track('funnel_share', 3); return; }
      catch (error) { if (error instanceof Error && error.name === 'AbortError') return; }
    }
    try { await navigator.clipboard.writeText(links.share); setShareState('copied'); track('funnel_copy', 3); }
    catch { setShareState('manual'); }
  }

  const home = locale === 'en' ? '/' : `/${locale}`;
  return (
    <div ref={root} data-native-scroll="true" className={`funnel ${enhanced ? 'funnel-enhanced' : ''}`} lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <header className="funnel-header">
        <a href={home} aria-label="Yorix"><BrandLogo size="sm" tone="dark" /></a>
        <div className="funnel-header-actions">
          <details className="funnel-language">
            <summary aria-label={copy.language}>{locale.toUpperCase()}<ChevronDown size={14} aria-hidden="true" /></summary>
            <nav aria-label={copy.language}>
              {campaignLocales.map(lang => (
                <a key={lang} href={`/${lang}/start${languageQuery}${languageQuery ? '&' : '?'}lang=${lang}#step-${step + 1}`} lang={lang} aria-current={locale === lang ? 'true' : undefined}>{languageNames[lang]}</a>
              ))}
            </nav>
          </details>
          {step < 3 && <a href="#step-4" className="funnel-skip" onClick={event => { event.preventDefault(); go(3); }}>{copy.skip}<ArrowRight size={15} className="funnel-arrow" aria-hidden="true" /></a>}
        </div>
      </header>
      <main>
        {copy.screens.map((screen, index) => (
          <section id={`step-${index + 1}`} key={index} className={`funnel-screen funnel-screen-${index + 1}`} hidden={enhanced && index !== step} aria-labelledby={`title-${index + 1}`}>
            <div className="funnel-layout">
              <div className="funnel-copy">
                <p className="funnel-eyebrow"><span>0{index + 1}</span>{copy.steps[index]}</p>
                {index === 0
                  ? <h1 id="title-1" tabIndex={-1}><CampaignTitle title={screen.title} accent={screen.accent} /></h1>
                  : <h2 id={`title-${index + 1}`} tabIndex={-1}><CampaignTitle title={screen.title} accent={screen.accent} /></h2>}
                {'body' in screen && <p className="funnel-body">{screen.body}</p>}
              </div>
              <div className="funnel-visual">
                <div className="funnel-halo" />
                <Art fetchPriority="low" name="cloud-bank" width={1536} height={512} className="funnel-clouds" />
                <Sparkle className="funnel-sparkle-one" />
                <Sparkle className="funnel-sparkle-two" tone="lavender" delay={800} />
                {index === 0 && <>
                  <Art name="hero-baby-moon" width={817} height={900} priority className="funnel-baby" />
                  <Art fetchPriority="low" name="star-mascot" width={410} height={420} className="funnel-companion" />
                </>}
                {index === 1 && <div className="funnel-timing-scene">
                  <Art fetchPriority="low" name="scene-nightlight" width={390} height={440} className="funnel-nightlight" />
                  <Art fetchPriority="low" name="scene-clock" width={436} height={440} className="funnel-clock" />
                </div>}
                {index === 2 && <div className="funnel-demo-wrap">
                  <span className="funnel-example font-hand">{copy.example}<ArrowDownRight size={24} className="funnel-arrow" aria-hidden="true" /></span>
                  <Art fetchPriority="low" name="star-mascot" width={410} height={420} className="funnel-demo-mascot" />
                  <div className="funnel-demo">
                    <div className="funnel-demo-heading"><Art fetchPriority="low" name="icon-moon-crescent" width={96} height={96} />{copy.nextSleep}</div>
                    <div className="funnel-prediction">
                      <Art fetchPriority="low" name="icon-clock" width={96} height={96} />
                      <div><strong>{copy.time}</strong><span>{copy.window}</span><b dir="ltr">13:10 — 13:50</b></div>
                    </div>
                  </div>
                  <p className="funnel-demo-label">{copy.demoNote}</p>
                </div>}
                {index === 3 && <>
                  <Art fetchPriority="low" name="cta-baby-star" width={503} height={560} className="funnel-final-baby" />
                </>}
              </div>
              <div className="funnel-detail">
                {index === 1 && 'bullets' in screen && <ul className="funnel-benefits">
                  {screen.bullets?.map((item, i) => <li key={item} className="spotlight"><Art fetchPriority="low" name={['icon-moon-crescent', 'icon-bolt', 'icon-calendar'][i]} width={64} height={64} /><span>{item}</span></li>)}
                </ul>}
                {index === 2 && <p className="funnel-premium"><Crown size={20} aria-hidden="true" />{copy.premium}</p>}
              </div>
              <div className="funnel-bottom">
                {index < 3
                  ? <Magnetic><a className="funnel-button" href={`#step-${index + 2}`} onClick={event => { event.preventDefault(); go(index + 1); }}>{'cta' in screen ? screen.cta : ''}<ArrowRight size={21} className="funnel-arrow" aria-hidden="true" /></a></Magnetic>
                  : <div className="funnel-download-actions">
                    <div className="funnel-install-links">
                    <a className="funnel-store" href={links.download} aria-label={copy.download} onClick={() => track('funnel_app_store_click', 3)}><Image src={`/badges/app-store-${locale}.svg`} alt={copy.download} width={180} height={60} unoptimized /></a>
                    <a className="funnel-qr" href={links.qr} aria-label={copy.qr} onClick={() => track('funnel_qr_click', 3)}>{qr}</a>
                    </div>
                    <p className="funnel-device"><MonitorSmartphone size={19} aria-hidden="true" />{copy.device}</p>
                    <p className="funnel-free">{copy.free}</p>
                    {device.android && <p className="funnel-device-note">{copy.android}</p>}
                  </div>}
                <div className="funnel-controls">
                  {index > 0 ? <a href={`#step-${index}`} onClick={event => { event.preventDefault(); go(index - 1); }} className="funnel-back"><ArrowLeft size={16} className="funnel-arrow" aria-hidden="true" />{copy.back}</a> : <span />}
                  <nav className="funnel-dots" aria-label={copy.steps.join(' · ')}>
                    {copy.steps.map((label, dot) => <a key={label} href={`#step-${dot + 1}`} aria-label={`${dot + 1}. ${label}`} aria-current={index === dot ? 'step' : undefined} onClick={event => { event.preventDefault(); go(dot); }}><span /></a>)}
                  </nav>
                  <span className="funnel-count" aria-hidden="true" dir="ltr">0{index + 1} / 04</span>
                </div>
              </div>
            </div>
            {index === 3 && <div className="funnel-after">
              <button type="button" onClick={share}>{shareState === 'copied' ? <Check size={16} /> : canShare ? <Share2 size={16} /> : <Copy size={16} />}{shareState === 'copied' ? copy.copied : canShare ? copy.share : copy.copy}</button>
              <output className="sr-only">{shareState === 'copied' ? copy.copied : ''}</output>
              {shareState === 'manual' && <label>{copy.manual}<input aria-label={copy.copy} readOnly value={links.share} onFocus={event => event.currentTarget.select()} /></label>}
              {device.instagram && <p>{copy.instagram}</p>}
            </div>}
          </section>
        ))}
      </main>
      <footer className="funnel-footer">
        <p>{copy.caution}</p>
        <nav><a href={locale === 'ru' ? '/ru/subscription/privacy' : '/subscription/privacy'}>{copy.privacy}</a><a href={`${locale === 'en' ? '' : `/${locale}`}/support#contact`}>{copy.support}</a></nav>
      </footer>
    </div>
  );
}

function CampaignTitle({ title, accent }: { title: string; accent: string }) {
  const start = title.indexOf(accent);
  if (start < 0) return title;
  return <>{title.slice(0, start)}<em>{accent}</em>{title.slice(start + accent.length)}</>;
}

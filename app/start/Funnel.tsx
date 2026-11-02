'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Copy, Heart, Moon, RefreshCw, Share2, Sparkles } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { Art, Sparkle } from '../home/art';
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

  function go(next: number) {
    if (next === step) return;
    window.history.pushState(null, '', `#step-${next + 1}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    requestAnimationFrame(() => {
      root.current?.querySelector<HTMLElement>(`#step-${next + 1} h1, #step-${next + 1} h2`)?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
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
  return <div ref={root} className={`funnel ${enhanced ? 'funnel-enhanced' : ''}`} lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
    <header className="funnel-header">
      <a href={home} aria-label="Yorix"><BrandLogo size="sm" /></a>
      <div className="funnel-header-actions">
        <details className="funnel-language"><summary aria-label={copy.language}>{locale.toUpperCase()}<ChevronDown size={14} aria-hidden="true" /></summary><nav aria-label={copy.language}>{campaignLocales.map(lang => <a key={lang} href={`/${lang}/start${languageQuery}${languageQuery ? '&' : '?'}lang=${lang}#step-${step + 1}`} lang={lang} aria-current={locale === lang ? 'true' : undefined}>{languageNames[lang]}</a>)}</nav></details>
        {step < 3 && <a href="#step-4" className="funnel-skip" onClick={event => { event.preventDefault(); go(3); }}>{copy.skip}<ArrowRight size={15} className="funnel-arrow" aria-hidden="true" /></a>}
      </div>
    </header>
    <main>
      {copy.screens.map((screen, index) => <section id={`step-${index + 1}`} key={index} className={`funnel-screen funnel-screen-${index + 1}`} hidden={enhanced && index !== step} aria-labelledby={`title-${index + 1}`}>
        <div className="funnel-layout">
          <div className="funnel-copy">
            <div className="funnel-eyebrow"><span className="funnel-step-number">0{index + 1}</span><span>{copy.steps[index]}</span><span className="funnel-eyebrow-line" /></div>
            {index === 0 ? <h1 id="title-1" tabIndex={-1}>{screen.title}</h1> : <h2 id={`title-${index + 1}`} tabIndex={-1}>{screen.title}</h2>}
            {'body' in screen && <p className="funnel-body">{screen.body}</p>}
            {index === 0 && <div className="funnel-insight"><Sparkles size={23} aria-hidden="true" /><p>{screen.note}</p></div>}
            {(index === 1 || index === 3) && <ul className="funnel-benefits">{('bullets' in screen ? screen.bullets : [])?.map((item, i) => <li key={item}><span>{index === 1 ? <Check size={19} /> : i === 0 ? <Moon size={19} /> : i === 1 ? <Sparkles size={19} /> : <Heart size={19} />}</span>{item}</li>)}</ul>}
            {index === 2 && <><div className="funnel-insight"><RefreshCw size={23} aria-hidden="true" /><p>{screen.note}</p></div><p className="funnel-premium">{copy.premium}</p></>}
            {index === 3 && <><p className="funnel-free">{copy.free}</p>{device.android && <p className="funnel-device-note">{copy.android}</p>}</>}
            <div className="funnel-desktop-note">{index === 0 ? copy.intro : index === 3 ? copy.device : copy.caution}</div>
          </div>
          <div className="funnel-visual">
            <div className="funnel-halo" />
            {index === 0 && <><Art name="hero-baby-moon" width={816} height={896} priority className="funnel-baby" /><Sparkle className="funnel-sparkle-one" /><Sparkle className="funnel-sparkle-two" tone="lavender" delay={800} /><p className="funnel-art-note font-hand">{copy.intro}</p></>}
            {index === 1 && <><Art name="scene-nightlight" width={500} height={500} className="funnel-nightlight" /><Sparkle className="funnel-sparkle-one" /><div className="funnel-orbit" /><Art name="icon-clock" width={96} height={96} className="funnel-clock" /></>}
            {index === 2 && <div className="funnel-demo-wrap"><span className="funnel-example">{copy.example}</span><div className="funnel-demo"><div className="funnel-demo-brand">Yorix <Moon size={17} /></div><Art name="hero-baby-moon" width={816} height={896} className="funnel-demo-baby" /><div className="funnel-prediction"><span>{copy.nextSleep}</span><strong>{copy.time}</strong><div><span>{copy.window}</span><b dir="ltr">13:10 — 13:50</b></div></div><div className="funnel-demo-stars" aria-hidden="true">✧ · ✦ · ✧</div></div><p className="funnel-demo-label">{copy.demoNote}</p></div>}
            {index === 3 && <><Art name="cta-baby-star" width={480} height={480} className="funnel-final-baby" /><a className="funnel-qr" href={links.qr} aria-label={copy.qr} onClick={() => track('funnel_qr_click', 3)}>{qr}</a><Sparkle className="funnel-sparkle-one" /></>}
          </div>
          <div className="funnel-bottom">
            {index < 3 ? <a className="funnel-button" href={`#step-${index + 2}`} onClick={event => { event.preventDefault(); go(index + 1); }}>{'cta' in screen ? screen.cta : ''}<ArrowRight size={20} className="funnel-arrow" aria-hidden="true" /></a> : <div className="funnel-download-actions"><a className="funnel-store" href={links.download} aria-label={copy.download} onClick={() => track('funnel_app_store_click', 3)}><Image src={`/badges/app-store-${locale}.svg`} alt={copy.download} width={180} height={60} unoptimized /></a><p>{copy.device}</p></div>}
            <div className="funnel-controls">
              {index > 0 ? <a href={`#step-${index}`} onClick={event => { event.preventDefault(); go(index - 1); }} className="funnel-back"><ArrowLeft size={16} className="funnel-arrow" aria-hidden="true" />{copy.back}</a> : <span className="funnel-count" aria-hidden="true">01 / 04</span>}
              <nav className="funnel-dots" aria-label={copy.steps.join(' · ')}>{copy.steps.map((label, dot) => <a key={label} href={`#step-${dot + 1}`} aria-label={`${dot + 1}. ${label}`} aria-current={index === dot ? 'step' : undefined} onClick={event => { event.preventDefault(); go(dot); }}><span /></a>)}</nav>
              <span className="funnel-count" aria-hidden="true">0{index + 1} / 04</span>
            </div>
          </div>
        </div>
        {index === 3 && <div className="funnel-after"><button type="button" onClick={share}>{shareState === 'copied' ? <Check size={16} /> : canShare ? <Share2 size={16} /> : <Copy size={16} />}{shareState === 'copied' ? copy.copied : canShare ? copy.share : copy.copy}</button><output className="sr-only">{shareState === 'copied' ? copy.copied : ''}</output>{shareState === 'manual' && <label>{copy.manual}<input aria-label={copy.copy} readOnly value={links.share} onFocus={event => event.currentTarget.select()} /></label>}{device.instagram && <p>{copy.instagram}</p>}</div>}
      </section>)}
    </main>
    <footer className="funnel-footer"><p>{copy.caution}</p><nav><a href={locale === 'ru' ? '/ru/subscription/privacy' : '/subscription/privacy'}>{copy.privacy}</a><a href={`${locale === 'en' ? '' : `/${locale}`}/support#contact`}>{copy.support}</a></nav></footer>
  </div>;
}

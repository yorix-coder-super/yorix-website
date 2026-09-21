import { Mail } from 'lucide-react';
import { Art, Sparkle } from '../home/art';
import { whitePill } from '../home/CtaBand';
import { siteCopy, type SiteLocale } from '../i18n';
import { Magnetic } from '../subscription/Magnetic';
import { Reveal } from '../subscription/Reveal';

// «Still have questions? Write to us» under a block of answers: the way to a
// person is one bright button, never an address to copy.
export function ContactTeaser({ locale }: { locale: SiteLocale }) {
  const site = siteCopy(locale);
  const support = locale === 'en' ? '/support' : `/${locale}/support`;
  return (
    <Reveal>
      <div className="spotlight relative isolate mt-8 flex flex-col items-center gap-5 overflow-hidden rounded-[1.75rem] border border-white/12 bg-[linear-gradient(100deg,rgb(99_102_241/0.22)_0%,rgb(255_255_255/0.05)_60%)] p-5 text-center backdrop-blur-xl transition-colors duration-500 hover:border-white/25 sm:flex-row sm:justify-between sm:p-6 sm:text-start">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div aria-hidden="true" className="relative shrink-0">
            <div className="bob">
              <Art className="h-20 w-20 object-contain drop-shadow-[0_12px_24px_rgb(30_27_75/40%)]" height={765} name="contact-letter" width={760} />
            </div>
            <Sparkle className="-end-2 -top-1 w-3" delay={400} />
          </div>
          <p className="min-w-0 text-xl font-semibold leading-7 text-white">{site.support.contact.title}</p>
        </div>
        <Magnetic className="inline-flex shrink-0">
          <a className={whitePill} href={`${support}#contact`}>
            <Mail aria-hidden="true" className="h-5 w-5" />
            {site.footerLabels.write}
          </a>
        </Magnetic>
      </div>
    </Reveal>
  );
}

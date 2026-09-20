import { Mail } from 'lucide-react';
import { Art } from '../home/art';
import { whitePill } from '../home/CtaBand';
import { siteCopy, type SiteLocale } from '../i18n';
import { Reveal } from '../subscription/Reveal';

// «Still have questions? Write to us» under a block of answers: the way to a
// person is one bright button, never an address to copy.
export function ContactTeaser({ locale }: { locale: SiteLocale }) {
  const site = siteCopy(locale);
  const support = locale === 'en' ? '/support' : `/${locale}/support`;
  return (
    <Reveal>
      <div className="relative isolate mt-8 flex flex-col items-center gap-5 overflow-hidden rounded-[1.75rem] border border-white/12 bg-[linear-gradient(100deg,rgb(99_102_241/0.22)_0%,rgb(255_255_255/0.05)_60%)] p-5 text-center backdrop-blur-xl sm:flex-row sm:justify-between sm:p-6 sm:text-start">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Art className="h-20 w-20 shrink-0 object-contain drop-shadow-[0_12px_24px_rgb(30_27_75/40%)]" height={765} name="contact-letter" width={760} />
          <p className="min-w-0 text-xl font-semibold leading-7 text-white">{site.support.contact.title}</p>
        </div>
        <a className={`${whitePill} shrink-0`} href={`${support}#contact`}>
          <Mail aria-hidden="true" className="h-5 w-5" />
          {site.footerLabels.write}
        </a>
      </div>
    </Reveal>
  );
}

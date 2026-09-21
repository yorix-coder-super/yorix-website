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
      <div className="spotlight relative isolate mt-8 flex flex-col items-center gap-5 overflow-hidden rounded-[1.75rem] border border-white/12 bg-[linear-gradient(135deg,#312E81_0%,#3730A3_45%,#4F46E5_100%)] p-5 text-center transition-colors duration-500 hover:border-white/25 sm:flex-row sm:justify-between sm:p-6 sm:text-start">
        {/* The same sky as the contact card this band leads to: a gold glow
            off the top corner, the cloud bank drifting along the bottom. */}
        <div aria-hidden="true" className="absolute -top-20 start-[4%] -z-10 h-44 w-44 rounded-full bg-[#FDE68A]/15 blur-3xl" />
        <Art
          className="drift pointer-events-none absolute -bottom-[42%] start-[-5%] -z-10 w-[110%] max-w-none opacity-25 rtl:-scale-x-100"
          height={511}
          name="cloud-bank"
          width={1536}
        />
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

import Image from "next/image";
import Link from "next/link";

const NAV = [
  { href: "#academy", label: "Academy" },
  { href: "#programs", label: "Programs" },
  { href: "#coaches", label: "Coaches" },
  { href: "#contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://www.instagram.com/fsasoccer/", label: "Instagram" },
  { href: "https://www.facebook.com/FSAsoccer/", label: "Facebook" },
  { href: "https://x.com/fariasacademy", label: "Twitter / X" },
];

export function Footer() {
  return (
    <footer className="relative bg-fsa-black border-t border-fsa-bone/10 py-16 lg:py-20 overflow-hidden">
      <div className="diagonal-lines absolute inset-0 opacity-50 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-4">
              <div className="relative w-14 h-14">
                <Image
                  src="/logo.png"
                  alt="FSA crest"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl tracking-wider text-fsa-bone">
                  FARIAS SOCCER ACADEMY
                </span>
                <span className="eyebrow text-fsa-gold mt-2">
                  Nova Scotia
                </span>
              </div>
            </Link>
            <p className="mt-8 text-fsa-bone-muted text-sm leading-relaxed max-w-md">
              Our passion is the beautiful game. Developing the next generation
              of footballers through elite coaching, structured pathways, and
              uncompromising standards.
            </p>
          </div>

          {/* Nav */}
          <div className="lg:col-span-3">
            <div className="eyebrow text-fsa-gold mb-6">Explore</div>
            <ul className="space-y-3">
              {NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-fsa-bone-muted hover:text-fsa-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="lg:col-span-4">
            <div className="eyebrow text-fsa-gold mb-6">Follow FSA</div>
            <ul className="space-y-3">
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-fsa-bone-muted hover:text-fsa-gold transition-colors text-sm"
                  >
                    {s.label}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stars + copyright */}
        <div className="mt-16 pt-8 border-t border-fsa-bone/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <svg
                key={i}
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-fsa-gold"
              >
                <path d="M12 .587l3.668 7.568L24 9.75l-6 5.85 1.417 8.265L12 19.771l-7.417 4.094L6 15.6 0 9.75l8.332-1.595z" />
              </svg>
            ))}
            <span className="eyebrow text-fsa-bone-dim ml-3">
              Our passion is the beautiful game
            </span>
          </div>
          <div className="text-fsa-bone-dim text-xs">
            © {new Date().getFullYear()} Farias Soccer Academy. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

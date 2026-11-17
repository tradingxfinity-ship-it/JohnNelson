import Link from "next/link";
import { navLinks, site } from "@/content/site";
import { Logo } from "./Logo";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="bg-navy text-white/75">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.4fr]">
          <div>
            <Logo inverse />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed">
              Irma and John Nelson help people buy, sell, and rent homes across San Antonio.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-medium text-white">Explore</h2>
            <ul className="mt-4 space-y-3 text-[15px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white hover:underline underline-offset-4">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-medium text-white">Contact</h2>
            <ul className="mt-4 space-y-3 text-[15px]">
              <li>
                <a href={site.contact.phoneHref} className="hover:text-white hover:underline underline-offset-4">
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:text-white hover:underline underline-offset-4">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <address className="not-italic leading-relaxed">
                  {site.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>San Antonio, Texas</p>
        </div>
      </Container>
    </footer>
  );
}

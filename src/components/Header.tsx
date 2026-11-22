"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CONTACT_HREF, navLinks, type NavGroup } from "@/content/site";
import { Logo } from "./Logo";
import { buttonStyles, Container } from "./ui";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // A section stays active on its subpages, e.g. /blog on /blog/some-post
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const linkClass = (href: string) =>
    `relative py-2 text-[15px] font-medium transition-colors hover:text-blue ${
      isActive(href) ? "text-blue after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-red" : "text-slate"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-blue focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Container className="flex h-[76px] items-center justify-between gap-6 sm:h-[84px] lg:h-[96px]">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) =>
              "children" in link ? (
                <li key={link.label}>
                  <NavDropdown group={link} pathname={pathname} />
                </li>
              ) : (
                <li key={link.href}>
                  <Link href={link.href} aria-current={isActive(link.href) ? "page" : undefined} className={linkClass(link.href)}>
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href={CONTACT_HREF} className={`${buttonStyles.primary} min-h-11 px-4 max-[359px]:hidden`}>
            Contact us
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-blue lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
              {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </Container>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-white lg:hidden">
        <Container className="py-3">
          <nav aria-label="Mobile">
            <ul>
              {navLinks.map((link) =>
                "children" in link ? (
                  <li key={link.label} className="border-b border-line py-2">
                    <p className="flex min-h-10 items-center text-base font-medium text-blue">{link.label}</p>
                    <ul className="mb-1 border-l border-line pl-4">
                      {link.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            aria-current={isActive(c.href) ? "page" : undefined}
                            className={`flex min-h-11 items-center text-[15px] font-medium ${isActive(c.href) ? "text-blue" : "text-slate"}`}
                            onClick={() => setOpen(false)}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={link.href} className="border-b border-line last:border-b-0">
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`flex min-h-12 items-center text-base font-medium ${isActive(link.href) ? "text-blue" : "text-slate"}`}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <Link href={CONTACT_HREF} className={`${buttonStyles.primary} mb-2 mt-3 w-full`} onClick={() => setOpen(false)}>
            Contact us
          </Link>
        </Container>
      </div>
    </header>
  );
}

/** Desktop dropdown for a menu group. Opens on click or keyboard; closes on Escape, an outside click, or navigation. */
function NavDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const active = group.children.some((c) => c.href.split("#")[0] === pathname);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    // Close when focus leaves the menu (e.g. tabbing past the last link)
    const onFocus = (e: FocusEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="nav-who-we-help"
        onClick={() => setOpen((o) => !o)}
        className={`relative flex items-center gap-1.5 py-2 text-[15px] font-medium transition-colors hover:text-blue ${
          active || open ? "text-blue" : "text-slate"
        } ${active ? "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-red" : ""}`}
      >
        {group.label}
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className={`transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1.5l5 5 5-5" />
        </svg>
      </button>
      <div
        id="nav-who-we-help"
        hidden={!open}
        className="absolute left-1/2 top-full z-50 mt-4 w-[340px] -translate-x-1/2 rounded-lg border border-line bg-white p-2 shadow-lg"
      >
        <ul>
          {group.children.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                aria-current={pathname === c.href ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="block rounded-md px-4 py-3 transition-colors hover:bg-cloud focus-visible:bg-cloud"
              >
                <span className="block text-[15px] font-medium text-blue">{c.label}</span>
                {c.blurb && <span className="mt-0.5 block text-[13px] leading-snug text-slate">{c.blurb}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

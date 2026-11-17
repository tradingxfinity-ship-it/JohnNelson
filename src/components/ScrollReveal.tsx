"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fades and lifts each section's content into place as it scrolls into view,
 * with a short stagger between items that arrive together.
 *
 * It finds targets on its own: inside every section's content container, each
 * column, heading, paragraph, and list item becomes a target, so pages need no
 * extra markup. Content already on screen when the page loads is left alone,
 * and nothing animates when the visitor prefers reduced motion.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets: HTMLElement[] = [];
    const isTarget = (el: Element): el is HTMLElement => {
      if (!(el instanceof HTMLElement) || el.getAttribute("aria-hidden") === "true") return false;
      if (el.matches("script, style, dialog, img, [data-no-reveal]")) return false;
      const cs = getComputedStyle(el);
      return cs.position !== "absolute" && cs.position !== "fixed" && cs.display !== "none" && el.offsetHeight > 0;
    };

    // Lists of cards reveal one item at a time; columns reveal their parts.
    const collect = (el: HTMLElement, depth: number) => {
      const kids = [...el.children].filter(isTarget);
      const scrolls = /(auto|scroll)/.test(getComputedStyle(el).overflowX);
      if (el.tagName === "UL" || el.tagName === "OL") {
        // Carousels and long lists come in as one block
        if (scrolls || kids.length < 2 || kids.length > 12) targets.push(el);
        else targets.push(...kids);
        return;
      }
      // Cards and panels (anything with its own background or border) move as one piece
      const cs = getComputedStyle(el);
      const surface =
        depth > 0 && (cs.backgroundColor !== "rgba(0, 0, 0, 0)" || parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0);
      if (surface || scrolls || depth >= 2 || el.matches("form, a, button") || (kids.length < 2 && depth > 0)) {
        targets.push(el);
        return;
      }
      for (const k of kids) {
        if (k.children.length > 0) collect(k, depth + 1);
        else targets.push(k);
      }
    };

    document.querySelectorAll("main section, footer").forEach((section) => {
      const containers = [...section.children].filter(
        (c): c is HTMLElement => isTarget(c) && !c.closest("[data-reveal]"),
      );
      containers.forEach((c) => collect(c, 0));
    });

    const fold = window.innerHeight;
    const pending = new Set<HTMLElement>();
    for (const el of new Set(targets)) {
      // Skip anything nested in another target, and anything already in view
      if (targets.some((t) => t !== el && t.contains(el))) continue;
      if (el.getBoundingClientRect().top < fold * 0.92) continue;
      el.dataset.reveal = "hidden";
      pending.add(el);
    }

    const finish = (el: HTMLElement) => {
      el.removeAttribute("data-reveal");
      el.style.removeProperty("--reveal-delay");
    };

    const reveal = (arriving: HTMLElement[]) => {
      arriving
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
        .forEach((el, i) => {
          observer.unobserve(el);
          pending.delete(el);
          el.style.setProperty("--reveal-delay", `${Math.min(i, 6) * 90}ms`);
          el.dataset.reveal = "shown";
          // Drop the reveal styles once done so the element's own transitions return
          window.setTimeout(() => finish(el), 900 + Math.min(i, 6) * 90);
        });
    };

    const observer = new IntersectionObserver(
      (entries) => reveal(entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement)),
      { rootMargin: "0px 0px -8% 0px" },
    );
    pending.forEach((el) => observer.observe(el));

    // Content at the very bottom never clears the trigger margin; show it at the end of the page
    const onScroll = () => {
      if (pending.size && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        reveal([...pending].filter((el) => el.getBoundingClientRect().top < window.innerHeight));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      pending.forEach(finish);
    };
  }, [pathname]);

  return null;
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="site-footer">
      <p className="footer-copy">&copy; 2026 Apiece, Inc.</p>
      <nav className="footer-nav" aria-label="Footer">
        {LINKS.map(({ href, label }) =>
          // The current page reads as plain text rather than a self-link.
          pathname === href ? (
            <span key={href} className="footer-link is-current" aria-current="page">
              {label}
            </span>
          ) : (
            <Link key={href} href={href} className="footer-link">
              {label}
            </Link>
          )
        )}
      </nav>
    </footer>
  );
}

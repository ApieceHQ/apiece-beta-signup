import Link from "next/link";
import ApieceLogo from "../ApieceLogo";
import { pageMeta } from "../pageMeta";

export const metadata = pageMeta({
  title: "Contact",
  description: "Get in touch with Apiece — hello@apiece.co.",
});

export default function ContactPage() {
  return (
    <main className="doc">
      <Link href="/" className="doc-home" aria-label="Apiece — home">
        <ApieceLogo size={30} />
        <span className="wordmark-text">Apiece</span>
      </Link>

      <div className="doc-body">
        <h1 className="doc-title">Say hello.</h1>

        <p className="doc-contact">
          <a className="doc-link" href="mailto:hello@apiece.co">
            hello@apiece.co
          </a>
        </p>

        <address className="doc-address">
          Apiece, Inc.
          <br />
          NYC
        </address>
      </div>
    </main>
  );
}

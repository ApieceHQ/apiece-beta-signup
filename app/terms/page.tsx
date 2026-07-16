import Link from "next/link";
import ApieceLogo from "../ApieceLogo";
import { pageMeta } from "../pageMeta";

export const metadata = pageMeta({
  title: "Terms of Service",
  description: "The terms that govern your use of apiece.co.",
});

// Static on purpose: a computed date would silently rewrite "Last updated" on
// every rebuild. Bump this by hand when the terms actually change.
const LAST_UPDATED = "July 16, 2026";

export default function TermsPage() {
  return (
    <main className="doc">
      <Link href="/" className="doc-home" aria-label="Apiece — home">
        <ApieceLogo size={30} />
        <span className="wordmark-text">Apiece</span>
      </Link>

      <div className="doc-body">
        <h1 className="doc-title doc-title--legal">Terms of Service</h1>
        <p className="doc-meta">Last updated: {LAST_UPDATED}</p>

        <p className="doc-p doc-p--legal">
          Welcome to apiece.co (the &ldquo;Site&rdquo;), operated by Apiece, Inc.
          By using the Site, you agree to these terms.
        </p>

        <p className="doc-p doc-p--legal">
          <strong>Use of the Site.</strong> Lawful purposes only. Don&rsquo;t
          interfere with the Site&rsquo;s operation or attempt to access
          non-public areas.
        </p>

        <p className="doc-p doc-p--legal">
          <strong>Early access.</strong> Submitting an application doesn&rsquo;t
          guarantee access to any product or service. Future products will be
          governed by their own terms.
        </p>

        <p className="doc-p doc-p--legal">
          <strong>Intellectual property.</strong> The Site and its content (text,
          design, logos) are owned by Apiece, Inc. and protected by applicable
          law. Please don&rsquo;t reproduce them without permission.
        </p>

        <p className="doc-p doc-p--legal">
          <strong>Disclaimer.</strong> The Site is provided &ldquo;as is,&rdquo;
          without warranties of any kind. To the fullest extent permitted by law,
          Apiece, Inc. disclaims all implied warranties and will not be liable
          for damages arising from your use of the Site.
        </p>

        <p className="doc-p doc-p--legal">
          <strong>Governing law.</strong> These terms are governed by the laws of
          the State of New York, without regard to conflict-of-law rules.
        </p>

        <p className="doc-p doc-p--legal">
          <strong>Changes.</strong> We may update these terms; continued use
          after changes means you accept them.
        </p>

        <p className="doc-p doc-p--legal">
          <strong>Contact.</strong>{" "}
          <a className="doc-link" href="mailto:hello@apiece.co">
            hello@apiece.co
          </a>
        </p>
      </div>
    </main>
  );
}

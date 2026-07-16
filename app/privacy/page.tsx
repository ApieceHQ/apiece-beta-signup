import Link from "next/link";
import ApieceLogo from "../ApieceLogo";
import { pageMeta } from "../pageMeta";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "How Apiece handles information collected through apiece.co.",
});

// Static on purpose: a computed date would silently rewrite "Last updated" on
// every rebuild. Bump this by hand when the policy actually changes.
const LAST_UPDATED = "July 16, 2026";

export default function PrivacyPage() {
  return (
    <main className="doc">
      <Link href="/" className="doc-home" aria-label="Apiece — home">
        <ApieceLogo size={30} />
        <span className="wordmark-text">Apiece</span>
      </Link>

      <div className="doc-body">
        <h1 className="doc-title doc-title--legal">Privacy Policy</h1>
        <p className="doc-meta">Last updated: {LAST_UPDATED}</p>

        <p className="doc-p doc-p--legal">
          Apiece, Inc. (&ldquo;Apiece,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;)
          operates apiece.co (the &ldquo;Site&rdquo;). This policy describes how
          we handle information collected through the Site.
        </p>

        <p className="doc-p doc-p--legal">
          <strong>What we collect.</strong> When you apply for early access: your
          email address and any optional details you submit (such as links to
          where you curate today). We may also collect standard technical
          information (browser type, device, pages visited) via cookies or
          similar technologies.
        </p>

        <p className="doc-p doc-p--legal">
          <strong>How we use it.</strong> To operate the Site, review
          early-access applications, communicate with you about Apiece, and
          improve the Site. We do not sell your personal information.
        </p>

        <p className="doc-p doc-p--legal">
          <strong>Sharing.</strong> Only with service providers who help us
          operate the Site (hosting, email), or where required by law.
        </p>

        <p className="doc-p doc-p--legal">
          <strong>Your choices.</strong> Unsubscribe anytime via the link in any
          email, or by contacting us. To request access to or deletion of your
          information, email{" "}
          <a className="doc-link" href="mailto:hello@apiece.co">
            hello@apiece.co
          </a>
          .
        </p>

        <p className="doc-p doc-p--legal">
          <strong>Retention.</strong> We keep application information as long as
          needed for the purposes above, then delete or anonymize it.
        </p>

        <p className="doc-p doc-p--legal">
          <strong>Children.</strong> The Site is not directed at children under
          13, and we do not knowingly collect their information.
        </p>

        <p className="doc-p doc-p--legal">
          <strong>Changes.</strong> We may update this policy; we&rsquo;ll post
          the revised version here with an updated date.
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

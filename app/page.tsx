import SignupForm from "./SignupForm";
import ApieceLogo from "./ApieceLogo";

// Referral keys we care about, in a stable order.
const REFERRAL_KEYS = [
  "ref",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

function buildReferral(
  params: Record<string, string | string[] | undefined>
): string {
  const parts: string[] = [];
  for (const key of REFERRAL_KEYS) {
    const raw = params[key];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (value && value.trim()) {
      parts.push(`${key}=${value.trim()}`);
    }
  }
  return parts.join("&");
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Capture referral source server-side (SSR) from ?ref= / ?utm_* params.
  const params = await searchParams;
  const referral = buildReferral(params);

  return (
    <main className="page">
      <div className="column">
        <div className="wordmark">
          <ApieceLogo size={30} />
          <span className="wordmark-text">Apiece</span>
        </div>

        <div className="hero">
          <h1 className="headline">A place for curation</h1>
          <p className="subhead">Collect anything. Curate everywhere.</p>
        </div>

        <SignupForm referral={referral} />
      </div>
    </main>
  );
}

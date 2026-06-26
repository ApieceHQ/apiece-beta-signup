"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm({ referral }: { referral: string }) {
  const [email, setEmail] = useState("");
  const [urls, setUrls] = useState<string[]>([""]);
  const [company, setCompany] = useState(""); // honeypot
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function updateUrl(index: number, value: string) {
    setUrls((prev) => prev.map((u, i) => (i === index ? value : u)));
  }

  function addUrl() {
    setUrls((prev) => [...prev, ""]);
  }

  function removeUrl(index: number) {
    setUrls((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!EMAIL_RE.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError(null);

    const audienceUrls = urls.map((u) => u.trim()).filter(Boolean);

    setSubmitting(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          urls: audienceUrls,
          referral,
          company, // honeypot — must stay empty
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }

      setDone(true);
    } catch {
      setFormError(
        "Something went wrong submitting your application. Please try again."
      );
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section className="success" aria-live="polite">
        <p className="successTitle">You&rsquo;re on the list!</p>
        <p className="successBody">Big thanks for checking this out.</p>
        <p className="successBody">
          We&rsquo;re rolling out Apiece steadily, incorporating feedback from
          individual curators to ensure we can build something enduring.
          We&rsquo;ll be in touch as new spots open up over the coming months.
        </p>
      </section>
    );
  }

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="input"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={emailError ? "true" : undefined}
          aria-describedby={emailError ? "email-error" : undefined}
          required
        />
        {emailError && (
          <p className="error" id="email-error">
            {emailError}
          </p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="url-0">
          Where do you curate today?{" "}
          <span className="optional">(optional)</span>
        </label>
        <div className="urls">
          {urls.map((url, i) => (
            <div className="urlRow" key={i}>
              <input
                id={`url-${i}`}
                name="url"
                type="url"
                className="input"
                inputMode="url"
                autoComplete="off"
                placeholder="Substack, Spotify profile, IG, your site…"
                value={url}
                onChange={(e) => updateUrl(i, e.target.value)}
                aria-label={`Audience channel ${i + 1}`}
              />
              {urls.length > 1 && (
                <button
                  type="button"
                  className="removeBtn"
                  onClick={() => removeUrl(i)}
                  aria-label={`Remove channel ${i + 1}`}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="button" className="addBtn" onClick={addUrl}>
          Add another
        </button>
      </div>

      {/* Honeypot — hidden from users; bots tend to fill it. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <button type="submit" className="submit" disabled={submitting}>
        {submitting ? "Submitting…" : "Apply for early access"}
      </button>

      {formError && (
        <p className="formError" role="alert">
          {formError}
        </p>
      )}
    </form>
  );
}

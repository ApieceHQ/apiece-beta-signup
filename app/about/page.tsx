import Link from "next/link";
import ApieceLogo from "../ApieceLogo";
import { pageMeta } from "../pageMeta";

export const metadata = pageMeta({
  title: "About",
  description:
    "Apiece is built for the people who collect and curate. A place to collect anything and curate everywhere.",
});

export default function AboutPage() {
  return (
    <main className="doc">
      <Link href="/" className="doc-home" aria-label="Apiece — home">
        <ApieceLogo size={30} />
        <span className="wordmark-text">Apiece</span>
      </Link>

      <div className="doc-body">
        <h1 className="doc-title">
          A place for people who collect &amp; curate.
        </h1>

        <p className="doc-p">
          Algorithms simplify choice and often deliver good recommendations. But
          when options are unlimited and quality is subjective, human curation is
          unmatched. Consider your friend with great taste, the clerk at the
          independent record store or bookshop, a writer or DJ you trust.
        </p>

        <p className="doc-p">
          What they offer, no algorithm can. The trusted pick that expands your
          taste. The context that makes a discovery mean more. The human
          connection around a shared passion.
        </p>

        <p className="doc-p">
          <strong>Apiece is built for the people who do that work.</strong> We
          offer a place to collect anything and curate everywhere.
        </p>

        <p className="doc-p">
          We&rsquo;re in private beta, building with a small group of early
          customers, iterating on the experience to create something
          you&rsquo;ll love.
        </p>
      </div>

      <Link href="/#apply" className="cta">
        Apply for early access &rarr;
      </Link>

      <hr className="doc-rule" />

      <p className="doc-credit">
        Founded by{" "}
        <a
          className="doc-link"
          href="https://substack.com/@sampledandsorted"
          target="_blank"
          rel="noopener noreferrer"
        >
          David Porter
        </a>{" "}
        in NYC.
      </p>
    </main>
  );
}

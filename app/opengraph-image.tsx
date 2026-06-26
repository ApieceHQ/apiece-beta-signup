import { ImageResponse } from "next/og";

export const alt = "Apiece — A place for curation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fetch a TTF subset of Inter from Google Fonts (old UA forces ttf, which
// Satori needs). Returns null on any failure so the image still renders with
// next/og's default font.
async function loadInter(weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(
      text
    )}`;
    const css = await (
      await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30",
        },
      })
    ).text();
    const match = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/);
    if (!match) return null;
    return await (await fetch(match[1])).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  // Weights match the page exactly: wordmark 800, headline 600, subhead 400.
  const extrabold = await loadInter(800, "Apiece");
  const semibold = await loadInter(600, "A place for curation");
  const regular = await loadInter(400, "Collect anything. Curate everywhere.");

  const fonts =
    extrabold && semibold && regular
      ? [
          { name: "Inter", data: extrabold, weight: 800 as const, style: "normal" as const },
          { name: "Inter", data: semibold, weight: 600 as const, style: "normal" as const },
          { name: "Inter", data: regular, weight: 400 as const, style: "normal" as const },
        ]
      : undefined;

  const navy = "#23324f";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          backgroundColor: "#F4F0F5",
          fontFamily: "Inter",
        }}
      >
        {/* Lockup: mark + wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginBottom: "60px",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#1a1a1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 39,
                height: 39,
                borderRadius: "50%",
                backgroundColor: navy,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#F4F0F5",
                  border: "2px solid rgba(255,255,255,0.6)",
                }}
              />
            </div>
          </div>
          <div style={{ fontSize: 36, fontWeight: 800, color: navy }}>Apiece</div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 92,
            fontWeight: 600,
            color: navy,
            letterSpacing: "-3px",
            lineHeight: 1.05,
            marginBottom: "28px",
          }}
        >
          A place for curation
        </div>

        {/* Subhead */}
        <div style={{ fontSize: 42, fontWeight: 400, color: "rgba(35,50,79,0.7)" }}>
          Collect anything. Curate everywhere.
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}

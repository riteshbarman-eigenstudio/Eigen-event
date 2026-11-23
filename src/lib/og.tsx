import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared 1200x630 share card: logo tile, headline, supporting line. */
export function renderOg({ title, subtitle, eyebrow }: { title: string; subtitle: string; eyebrow?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #ffffff 0%, #eef0f3 100%)",
          color: "#111827",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#262a32",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              fontWeight: 700,
            }}
          >
            λ
          </div>
          <div style={{ display: "flex", fontSize: 40, letterSpacing: -1 }}>
            <span style={{ fontWeight: 300 }}>eigen</span>
            <span style={{ fontWeight: 700 }}>event</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {eyebrow && <div style={{ fontSize: 28, color: "#667085", textTransform: "uppercase", letterSpacing: 2 }}>{eyebrow}</div>}
          <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
          <div style={{ fontSize: 34, color: "#475467", lineHeight: 1.3 }}>{subtitle}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#262a32", borderRadius: 16, color: "#fff", fontSize: 46, fontWeight: 700 }}>
        λ
      </div>
    ),
    size,
  );
}

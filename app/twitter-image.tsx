import { ImageResponse } from "next/og";

export const alt = "AXN Labs — IMAGINAMOS FUTUROS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#090a0a",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "#f2f1ee",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          IMAGINAMOS FUTUROS
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 28,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#a3a5a3",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          AXN Labs
        </div>
      </div>
    ),
    { ...size }
  );
}

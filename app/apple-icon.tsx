import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#090a0a",
          padding: 20,
        }}
      >
        <svg width="140" height="105" viewBox="0 0 28 21" fill="none" aria-hidden="true">
          <path d="M0 0h28v21H0z" fill="#f2f1ee" />
          <path d="M4 4h8v13H4zM16 4h8v9h-8z" fill="#090a0a" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ajit Kumar — Full Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#C9A84C";
const TEAL = "#25C4B2";
const BG = "#030612";
const TEXT = "#F2EDE6";
const MUTED = "#A59D91";
const BORDER = "rgba(201,168,76,0.25)";

const BADGES = ["Java · Spring Boot", "Angular · React", "AWS · Microservices"];

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: BG,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Teal glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-8%",
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,196,178,0.18), transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        {/* Gold glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-10%",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.16), transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        {/* Monogram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 10,
            background: GOLD,
            color: BG,
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 36,
          }}
        >
          AK
        </div>

        {/* Name */}
        <div style={{ fontSize: 76, fontWeight: 700, color: GOLD, lineHeight: 1, letterSpacing: "-1px" }}>
          Ajit Kumar.
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 22,
            color: TEAL,
            marginTop: 18,
            fontFamily: "monospace",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Full Stack Software Engineer
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 19, color: MUTED, marginTop: 20, maxWidth: 680, lineHeight: 1.6 }}>
          3.5+ years building scalable SaaS and healthcare platforms — end-to-end from system design to production.
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
          {BADGES.map((badge) => (
            <div
              key={badge}
              style={{
                border: `1px solid ${BORDER}`,
                borderRadius: 999,
                padding: "8px 22px",
                fontFamily: "monospace",
                fontSize: 13,
                color: TEXT,
                letterSpacing: "0.1em",
              }}
            >
              {badge}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            right: 80,
            fontFamily: "monospace",
            fontSize: 15,
            color: MUTED,
            letterSpacing: "0.12em",
          }}
        >
          ajkumarray.dev
        </div>
      </div>
    ),
    size,
  );
}

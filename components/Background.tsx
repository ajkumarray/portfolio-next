export default function Background() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* base */}
      <div className="absolute inset-0" style={{ background: "var(--ambient-base)" }} />

      {/* drifting orbs */}
      <div
        className="absolute"
        style={{
          top: "-20%",
          right: "-10%",
          width: "70vmax",
          height: "70vmax",
          borderRadius: "50%",
          filter: "blur(120px)",
          background:
            "radial-gradient(circle, var(--ambient-teal), transparent 65%)",
          animation: "orb-drift-a 28s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "-25%",
          left: "-15%",
          width: "60vmax",
          height: "60vmax",
          borderRadius: "50%",
          filter: "blur(120px)",
          background:
            "radial-gradient(circle, var(--ambient-gold), transparent 65%)",
          animation: "orb-drift-b 34s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "30%",
          left: "35%",
          width: "45vmax",
          height: "45vmax",
          borderRadius: "50%",
          filter: "blur(140px)",
          background:
            "radial-gradient(circle, var(--ambient-mid), transparent 70%)",
          animation: "orb-drift-c 40s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* faint vignette on top + bottom */}
      <div
        className="absolute inset-x-0 top-0 h-48"
        style={{
          background:
            "linear-gradient(to bottom, var(--ambient-edge), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background:
            "linear-gradient(to top, var(--ambient-edge), transparent)",
        }}
      />
    </div>
  );
}

import { site } from "@/content/site";
import Container from "./Container";

function PixelHeart() {
  const pixels = [
    [0, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
  ];
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 7 6"
      style={{ imageRendering: "pixelated" }}
      aria-hidden
    >
      {pixels.flatMap((row, y) =>
        row.map((cell, x) =>
          cell ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
          ) : null,
        ),
      )}
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-6">
      <Container>
        <p className="font-mono text-xs text-muted">
          © {year} {site.name} — Made with{" "}
          <span className="inline-flex items-center align-middle text-accent">
            <PixelHeart />
          </span>
          {" "}using Next.js &amp; Tailwind CSS
        </p>
      </Container>
    </footer>
  );
}

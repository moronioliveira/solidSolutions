/** Ícones das redes sociais da marca (SVG próprio, herda a cor do texto). */
export function SocialIcon({
  network,
  size = 16,
}: {
  network: "instagram" | "tiktok";
  size?: number;
}) {
  if (network === "instagram") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.37-2.48V9.66a5.7 5.7 0 0 0-.77-.05A5.68 5.68 0 0 0 4.18 15.3 5.68 5.68 0 0 0 9.86 21a5.68 5.68 0 0 0 5.68-5.68V9.01a7.33 7.33 0 0 0 4.28 1.37V7.3a4.28 4.28 0 0 1-3.22-1.48Z" />
    </svg>
  );
}

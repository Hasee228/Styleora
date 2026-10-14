const palettes = {
  dresses: ["#F5F0E8", "#E8C9C5", "#171717", "#D4B5A8"],
  tops: ["#FAF7F2", "#C9B7A4", "#171717", "#E8C9C5"],
  "ethnic-wear": ["#E8D5B5", "#8B3A3A", "#171717", "#F5F0E8"],
  jeans: ["#C5CDD4", "#3D4A57", "#171717", "#F5F0E8"],
  accessories: ["#F5F0E8", "#C6A15B", "#171717", "#E8C9C5"],
};

const hash = (str) =>
  str.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

export function productArt(product, variant = 0) {
  const [a, b, c, d] = palettes[product.category] || palettes.dresses;
  const n = hash(product.id + variant);
  const tilt = 8 + (n % 10);
  const label = product.name.split(" ").slice(0, 2).join(" ");

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
    <rect width="900" height="1200" fill="${a}"/>
    <rect x="70" y="70" width="760" height="1060" fill="none" stroke="${c}" stroke-opacity="0.12"/>
    <circle cx="${180 + (n % 80)}" cy="${160 + (n % 40)}" r="${90 + (n % 40)}" fill="${b}" fill-opacity="0.85"/>
    <path d="M280 240 C340 180, 560 180, 640 280 C720 400, 700 720, 540 980 C430 1140, 340 1080, 300 900 C250 680, 210 360, 280 240Z" fill="${b}" fill-opacity="0.95" transform="rotate(${tilt - 12} 450 600)"/>
    <path d="M360 300 C420 250, 540 260, 580 360 C610 470, 560 820, 470 980 C410 1080, 360 980, 350 820 C330 600, 310 380, 360 300Z" fill="${c}" fill-opacity="0.18"/>
    <rect x="120" y="980" width="660" height="1" fill="${c}" fill-opacity="0.2"/>
    <text x="450" y="1040" text-anchor="middle" font-family="Georgia, serif" font-size="36" fill="${c}">${label}</text>
    <text x="450" y="1080" text-anchor="middle" font-family="sans-serif" font-size="16" letter-spacing="6" fill="${d}">STYLEORA ATELIER</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

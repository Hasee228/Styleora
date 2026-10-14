import fs from "fs";

const p = new URL("../src/data/products.js", import.meta.url);
let s = fs.readFileSync(p, "utf8");
s = s.replace(/\n    images: \[[\s\S]*?\],/g, "");
if (!s.includes("productArt")) {
  s = s.replace(
    "export const products = [",
    "import { productArt } from '../utils/productArt';\n\nconst catalog = ["
  );
  s = s.replace(
    "];\n\nexport const testimonials",
    `];

export const products = catalog.map((item) => ({
  ...item,
  images: [productArt(item, 0), productArt(item, 1)],
}));

export const testimonials`
  );
}
fs.writeFileSync(p, s);
console.log("updated");

export default function DarkenHexColor(hex: string, factor = 0.6) {
  const r = Math.floor(parseInt(hex.substr(1, 2), 16) * factor);
  const g = Math.floor(parseInt(hex.substr(3, 2), 16) * factor);
  const b = Math.floor(parseInt(hex.substr(5, 2), 16) * factor);
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

import { interpolateOranges } from "d3-scale-chromatic";

const PERSON_ICON = {
  type: "textIcon",
  family: "Material Icons",
  text: "",
  color: "maroon",
  size: 22
};

export function concatSet(a, b) {
  const newSet = new Set();
  a.forEach((item) => newSet.add(item));
  b.forEach((item) => newSet.add(item));
  return newSet;
}

// Dont mind me, just having some fun with d3-scale-chromatic
const color = (x) => interpolateOranges(Math.max(Math.min(9, x), 4) / 10);

export const styleNode = (node, hover) => {
  let style = {
    ...node.style,
    /* color: "#2c698d", */
    labelSize: 20,
    labelWordWrap: 260,
    icon: PERSON_ICON,
    /* badge: [
      {
        position: 45,
        color: "#2c698d",
        stroke: "#bae8e8",
        icon: {
          type: "textIcon",
          family: "Helvetica",
          size: 10,
          color: "#2c698d",
          text: node.count
        }
      }
    ] */
  };

  if (hover) {
    style.stroke = [
      { color: "#bae8e8", width: 2 },
      { color: color(node.count), width: 2 },
      { color: "#bae8e8", width: 4 }
    ];
  } else {
    style.stroke = [
      { color: "#bae8e8", width: 2 },
      /* { color: color(node.count), width: 2 } */
    ];
  }
  return { ...node, radius: node.size > 0 ? node.size : 12, style };
};

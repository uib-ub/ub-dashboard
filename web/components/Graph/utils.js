import { interpolateOranges } from "d3-scale-chromatic";

const PERSON_ICON = {
  type: "textIcon",
  family: "Material Icons",
  text: "person",
  color: "#fff",
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
    color: color(node.count),
    labelSize: 10,
    labelWordWrap: 260,
    icon: PERSON_ICON,
    badge: [
      {
        position: 45,
        color: color(node.count),
        stroke: "#FFF",
        icon: {
          type: "textIcon",
          family: "Helvetica",
          size: 10,
          color: "#FFF",
          text: node.count
        }
      }
    ]
  };

  if (hover) {
    style.stroke = [
      { color: "#FFF", width: 2 },
      { color: color(node.count), width: 2 },
      { color: "#CCC", width: 4 }
    ];
  } else {
    style.stroke = [
      { color: "#FFF", width: 2 },
      { color: color(node.count), width: 2 }
    ];
  }
  return { ...node, radius: 18, style };
};

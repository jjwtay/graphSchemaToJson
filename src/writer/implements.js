export const addImplements = (txt, implements) =>
  [txt, writeImplements(implements)].join(" ");

const writeImplements = implements => implements.join(", ");

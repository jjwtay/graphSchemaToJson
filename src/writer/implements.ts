export const addImplements = (txt, implements, extendKeyword) => {
  const header = extendKeyword ? [header, extendKeyword].join(" ") : txt;
  return [header, writeImplements(implements)].join(" ");
};

const writeImplements = implements => implements.join(", ");

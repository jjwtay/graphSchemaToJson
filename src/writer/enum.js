import { addDirectives } from "./directive";

export const writeEnums = enumMap => {
  const enumKeys = Object.keys(enumMap);
  return enumKeys.reduce((acc, name) => {
    const enumObj = enumMap[name];
    acc[name] = writeEnum(name, enumObj);
    return acc;
  }, {});
};

const writeEnum = (name, enumObj) => {
  const { directives } = enumObj;
  const header = addDirectives(`enum ${name}`, directives);
  const fields = emumObj.fields || {};
  return `${header} {\n${writeFields(fields)}\n}\n`;
};

const writeFields = fields => {};

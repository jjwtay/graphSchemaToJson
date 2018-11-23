import { addDirectives } from "./directive";
import { BaseType } from "./base";

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

class Enum extends BaseType {
  constructor(enumMap) {
    this.enumMap = enumMap;
  }

  write = enumMap => {
    const enumKeys = Object.keys(enumMap);
    return enumKeys.reduce((acc, name) => {
      const enumObj = enumMap[name];
      acc[name] = this.writeEnum(name, enumObj);
      return acc;
    }, {});
  };

  writeEnum = (name, enumObj) => {
    const { directives } = enumObj;
    const header = this.addDirectives(`enum ${name}`, directives);
    const fields = emumObj.fields || {};
    return `${header} {\n${this.writeFields(fields)}\n}\n`;
  };

  writeFields = fields => {};
}

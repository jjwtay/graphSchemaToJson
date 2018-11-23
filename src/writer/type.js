import { BaseType } from "./base";
import { addDirectives } from "./directive";
import { addImplements } from "./implements";

export const writeTypes = (typeMap, write = writeType) => {
  const typeKeys = Object.keys(typeMap);
  return typeKeys.reduce((acc, name) => {
    const typeObj = typeMap[name];
    acc[name] = write(name, typeObj);
    return acc;
  }, {});
};

const writeType = (
  name,
  typeObj,
  { entityName = "type", enable = {} } = {}
) => {
  const { implements, directives } = typeObj;
  const header = `${entityName} ${name}`;
  header = enable.directives ? addDirectives(header, directives) : header;
  header = enable.implements ? addImplements(header, implements) : header;
  const fields = typeObj.fields || {};
  return `${header} {\n${writeFields(fields)}\n}\n`;
};

const writeFields = fields => {
  const fieldKeys = Object.keys(fields);
  const fieldMap = fieldKeys.reduce((acc, name) => {
    const fieldObj = fieldMap[name];
    acc[name] = writeField(name, fieldObj);
    return acc;
  }, {});
  return flattenMap(fieldMap, true);
};

const writeField = (fieldName, fieldObj) => {
  const { type, isNullable, isList, directives } = fieldObj;
  let header = `${fieldName}: ${type}`;
  header = isNullable ? header : `${header}!`;
  header = isList ? `[${header}]` : header;
  return addDirectives(header, directives);
};

export class Type extends BaseType {
  write = (typeMap, write = this.writeType) => {
    const typeKeys = Object.keys(typeMap);
    return typeKeys.reduce((acc, name) => {
      const typeObj = typeMap[name];
      acc[name] = write(name, typeObj);
      return acc;
    }, {});
  };
  
  writeType = (
    name,
    typeObj,
    { entityName = "type", enable = {} } = {}
  ) => {
    const { implements, directives } = typeObj;
    const header = `${entityName} ${name}`;
    header = enable.directives ? this.addDirectives(header, directives) : header;
    header = enable.implements ? this.addImplements(header, implements) : header;
    const fields = typeObj.fields || {};
    return `${header} {\n${this.writeFields(fields)}\n}\n`;
  };
  
  addImplements = (txt, implements) =>
  [txt, this.writeImplements(implements)].join(" ");

  writeImplements = implements => implements.join(", ");

  writeFields = fields => {
    const fieldKeys = Object.keys(fields);
    const fieldMap = fieldKeys.reduce((acc, name) => {
      const fieldObj = fieldMap[name];
      acc[name] = this.writeField(name, fieldObj);
      return acc;
    }, {});
    return flattenMap(fieldMap, true);
  };
  
  writeField = (fieldName, fieldObj) => {
    const { type, isNullable, isList, directives } = fieldObj;
    let header = `${fieldName}: ${type}`;
    header = isNullable ? header : `${header}!`;
    header = isList ? `[${header}]` : header;
    return this.addDirectives(header, directives);
  };
}

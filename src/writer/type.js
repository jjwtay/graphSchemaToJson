import { addDirectives } from "./directive";
import { addImplements } from "./implements";

export const writeTypes = typeMap => {
  const typeKeys = Object.keys(typeMap);
  return typeKeys.reduce((acc, name) => {
    const typeObj = typeMap[name];
    acc[name] = writeType(name, typeObj);
    return acc;
  }, {});
};

const writeType = (name, typeObj) => {
  const { implements, directives } = typeObj;
  const header = addDirectives(
    addImplements(`type ${name}`, implements),
    directives
  );
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

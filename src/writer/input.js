import { writeType } from "./type";

export const writeInputs = typeMap => writeTypes(typeMap, writeInput);

export const writeInput = (name, typeObj, opts = {}) =>
  writeType(name, typeObj, {
    entityName: "input",
    ...opts
  });

import { Type } from "./type";
import { writeType } from "./type";

export const writeInputs = typeMap => writeTypes(typeMap, writeInput);

export const writeInput = (name, typeObj, opts = {}) =>
  writeType(name, typeObj, {
    entityName: "input",
    ...opts
  });

export class Input extends Type {
  write = typeMap => this.writeTypes(typeMap, writeInput);

  writeInput = (name, typeObj, opts = {}) =>
    this.writeType(name, typeObj, {
      entityName: "input",
      ...opts
    });
}

import { Type } from "./type";
import { writeType, writeTypes } from "./type";

export const writeInterfaces = typeMap => writeTypes(typeMap, writeInterface);

export const writeInterface = (name, typeObj, opts = {}) =>
  writeType(name, typeObj, {
    entityName: "interface",
    enable: {
      directives: false,
      implements: false
    },
    ...opts
  });

export class Interface extends Type {
  write = typeMap => this.writeTypes(typeMap, writeInput);

  writeInput = (name, typeObj, opts = {}) =>
    this.writeType(name, typeObj, {
      entityName: "input",
      ...opts
    });
}

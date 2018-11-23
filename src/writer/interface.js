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

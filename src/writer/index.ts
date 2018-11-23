import { writeTypes, Type } from "./type";
import { writeEnums, Enum } from "./enum";
import { schemaByType } from "../accessor";
import { writeInterfaces, Interface } from "./interface";
import { writeInputs, Input } from "./input";
import { writeClasses, ClassType } from "./input";
import { flattenMap } from "./util";

export { Type, Enum, Interface, Input, ClassType, writeClasses, writeClass };

export const writeToTypeDef = (jsonSchema, flatten = false) => {
  const schemaTypeMap = schemaByType(jsonSchema);
  const types = schemaTypeMap.Object;
  const enums = schemaTypeMap.Enum;
  const inputs = schemaTypeMap.Input;
  const interfaces = schemaTypeMap.Interface;

  const writeMap = {
    types: writeTypes(types),
    enums: writeEnums(enums),
    interfaces: writeInterfaces(interfaces),
    inputs: writeInputs(inputs)
  };

  // for each value
  return flatten ? flattenMap(writeMap, true) : writeMap;
};

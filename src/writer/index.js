import { writeTypes, Type } from "./type";
import { writeEnums, Enum } from "./enum";
import { schemaByType } from "../accessor";
import { writeInterfaces, Interface } from "./interface";
import { writeInputs, Input } from "./input";
import { flattenMap } from "./util";

export { Type, Enum, Interface, Input };

export const writeToTypeDef = (jsonSchema, flatten = false) => {
  const schemaTypeMap = schemaByType(jsonSchema);

  const writeMap = {
    types: writeTypes(schemaTypeMap.Object),
    enums: writeEnums(schemaTypeMap.Enum),
    interfaces: writeInterfaces,
    inputs: writeInputs
  };

  // for each value
  return flatten ? flattenMap(writeMap, true) : writeMap;
};

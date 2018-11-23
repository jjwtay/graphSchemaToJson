import { writeTypes } from "./type";
import { writeEnums } from "./enum";
import { schemaByType } from "../accessor";
import { writeInterfaces } from "./interface";
import { writeInputs } from "./input";
import { flattenMap } from "./util";

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

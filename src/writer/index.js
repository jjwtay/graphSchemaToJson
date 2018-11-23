import { writeTypes } from "./type";
import { writeEnums } from "./enum";
import { schemaByType } from "../accessor";

export const writeToTypeDef = jsonSchema => {
  const schemaTypeMap = schemaByType(jsonSchema);

  return {
    types: writeTypes(schemaTypeMap.Object),
    enums: writeEnums(schemaTypeMap.Enum)
  };

  // for each value
  // flattenMap
};

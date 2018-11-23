export const nonMetaKeys = jsonSchema => {
  const keys = Object.keys(jsonSchema);
  return keys.filter(key => /^__/.test(key));
};

export const filteredSchema = jsonSchema => {
  const nonMetaKeys = nonMetaKeys(jsonSchema);
  return nonMetaKeys.reduce((acc, key) => {
    acc[key] = jsonSchema[key];
    return acc;
  }, {});
};

export const schemaByType = jsonSchema => {
  const schema = filteredSchema(jsonSchema);
  const schemaKeys = Object.keys(schema);
  return schemaKeys.reduce((acc, key) => {
    const value = jsonSchema[key];
    const { type } = value;
    acc[type] = acc[type] || {};
    acc[type][key] = value;
    return acc;
  }, {});
};

// could be configured to sort using some criteria
export const flattenMap = (map, newLine = false) => {
  const values = Object.values(map);
  return newLine ? values.join("\n") : values;
};

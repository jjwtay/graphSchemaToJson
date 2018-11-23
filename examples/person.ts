import { schemaToJS } from "../src/schema";
import { makeExecutableSchema } from "graphql-tools";

const typeDefs = `
type Person {
  name: String!
  age: Int! @range(min: 0, max: 130)
  gender: Gender!
}

enum Gender {
  male
  female
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers: {} });
const jsSchema = schemaToJS(schema);

console.log(jsSchema);
console.log({ schema: jsSchema.__Schema });
console.log({ Person: jsSchema.Person });
console.log({ Gender: jsSchema.Gender });

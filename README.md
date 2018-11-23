# graphSchemaToJson

Convert executable graphql schema to JSON.

_Usage_

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

See the `/examples` folder.

Run `person.ts`:

`$ ts-node examples/person.ts`

_See Also_

- [GraphQL Gen TypeORM](https://github.com/jjwtay/graphGenTypeorm) - auto graphql generation of typeorm Entity-Schema, Resolvers, graphql mutation/queries.

## Sample

### GraphQL schema definition

```graphql
type Person {
  name: String!
  age: Int! @range(min: 0, max: 130)
  gender: Gender!
}

enum Gender {
  male
  female
}
```

### JSON Output

```js
{
  Person: {
    fields: {
      name: {
        type: 'String',
        directives: {},
        isNullable: false,
        isList: false
      },
      age: {
        type: 'Int',
        directives: {
          range: {
            min: 0,
            max: 130
          }
        },
        isNullable: false,
        isList: false
      },
      gender: {
        type: 'Gender',
        directives: {},
        isNullable: false,
        isList: false
      }
    },
    directives: {},
    type: 'Object',
    implements: []
  },
  Gender: {
    fields: ['male', 'female'],
    directives: {},
    type: 'Enum'
  }
}
```

# TODO

- Add directivesKeys: string[] to fields since directives order matters.
- Clean up codebase.
- Figure out better way to use astNodes than all the guards and guessing.

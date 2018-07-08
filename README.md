# graphSchemaToJson
Convert executable graphql schema to JSON.

*Usage*

    import { schemaToJS } from 'graphschematojson'
    import { makeExecutableSchema } from 'graphql-tools'

    const typeDefs = `...some graphql here`

    const schema = makeExecutableSchema({typeDefs, resolvers: {}})

    const jsSchema = schemaToJS(schema)

*See Also*
+ [GraphQL Gen TypeORM](https://github.com/jjwtay/graphGenTypeorm) - auto graphql generation of typeorm Entity-Schema, Resolvers, graphql mutation/queries.

# TODO
+ Add directivesKeys: string[] to fields since directives order matters.
+ Clean up codebase.
+ Figure out better way to use astNodes than all the guards and guessing.


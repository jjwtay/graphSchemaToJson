# graphSchemaToJson
Convert graphQL Schema to readable Javascript Objects

## Install

    npm i -D graphschematojson

## Example usage CLI

    npx graphschematojson file=./examples/author.graphql outFile=./output.js

## CLI options

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| file   | No       |         | .graphql or .gql file to use|
| dir    | No       |         | Directory to find graphql files. Specified only if file is not used|
| outFile| Yes      |         | Output file may end in .js or .json depending on preference.|

## Example usage Code

    import fs from 'fs'
    import { toSchema } from 'graphschematojson/dist'

    const schema = fs.readFileSync('./test.graphql', 'utf8')

    fs.writeFileSync('./output.json', JSON.stringify(toSchema(schema), null, 4))

## Example output from running npx graphqlschematojson dir=./examples outFile=./output.js

    export default {
        types: {
            Author: {
                fields: {
                    name: {
                        isNullable: false,
                        isList: false,
                        directives: {},
                        type: 'String'
                    },
                    Books: {
                        isNullable: true,
                        isList: true,
                        directives: {
                            Bar: {
                                baz: 'bleh'
                            }
                        },
                        type: 'Book'
                    }
                },
                directives: {
                    Foo: {}
                },
                interfaces: []
            },
            Book: {
                fields: {
                    title: {
                        isNullable: false,
                        isList: false,
                        directives: {},
                        type: 'String'
                    },
                    Authors: {
                        isNullable: false,
                        isList: false,
                        directives: {},
                        type: 'Author'
                    }
                },
                directives: {
                    Bar: {}
                },
                interfaces: []
            }
        },
        unions: {},
        interfaces: {}
    }

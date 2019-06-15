# graphSchemaToJson
Convert graphQL Schema to readable Javascript/JSON/Typescript Objects

## Install

    npm i -D graphschematojson

## Example usage CLI

    npx graphschematojson file=./examples/author.graphql outFile=./output.js

## CLI options

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| file   | No       |         | .graphql or .gql file to use|
| dir    | No       |         | Directory to find graphql files. Specified only if file is not used|
| outFile| Yes      |         | Output file may end in .js  .json  or .ts depending on preference.|

## Example usage Code

    import fs from 'fs'
    import { toSchema } from 'graphschematojson/dist'

    const schema = fs.readFileSync('./test.graphql', 'utf8')

    fs.writeFileSync('./output.json', JSON.stringify(toSchema(schema), null, 4))

## Examples  (outputs located in examples folder)

    npx graphqlschematojson dir=./examples outFile=./output.js

    npx graphqlschematojson dir=./examples outFile=./output.json

    npx graphqlschematojson dir=./examples outFile=./output.ts


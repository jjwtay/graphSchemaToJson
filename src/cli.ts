#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import * as R from 'ramda'
import { toSchema } from '.'

interface Config {
    outFile?: string
    file?: string
    dir?: string
}

interface CliArgs extends Config {
    config?: string
}

const getArgs = R.reduce<string, CliArgs>((acc, arg: string) => {
    const split = arg.split('=')

    if (split.length === 2) {
        return R.assoc(split[0], split[1], acc)
    }
    return acc
}, {})

const mergeConfig = (args: CliArgs) => {
    if (args.config) {
        return R.mergeLeft(import(args.config), args)
    }
    return args
}

R.pipe(
    getArgs,
    mergeConfig,
    (config: CliArgs) => {
        if (!config.dir && !config.file) {
            throw new Error('Must provide an input file or directory for .graphql files')
        }

        if (!config.outFile) {
            throw new Error('Must provide output file with extension .js or .json')
        }

        let schema = ''

        if (config.file) {
            schema = readFileSync(config.file, 'utf8')
        } else {
            const files = readdirSync(config.dir as string)

            schema = files
                .filter(file => file.includes('.graphql') || file.includes('.gql'))
                .map(file => readFileSync(`${config.dir}/${file}`, 'utf8'))
                .join('\n')
        }

        if (config.outFile.includes('.json')) {
            writeFileSync(config.outFile, JSON.stringify(toSchema(schema), null, 4))
        } else if (config.outFile.includes('.ts')) {
            const header = `import { Schema } from 'graphschematojson/dist'`
            const body = `export const schema: Schema = ${JSON.stringify(
                toSchema(schema),
                null,
                4
            )}`
            const footer = `export default schema`

            writeFileSync(config.outFile, `${header}\n\n${body}\n\n${footer}`)
        } else {
            writeFileSync(
                config.outFile,
                `export default ${JSON.stringify(toSchema(schema), null, 4)}`
            )
        }
    }
)(process.argv)

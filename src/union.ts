export interface UnionSchema {
    types: string[]
    name: string
}

export type UnionWithType = {
    type: 'union'
} & UnionSchema

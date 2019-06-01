# graphSchemaToJson
Convert graphQL Schema to readable Javascript Objects

## Example usage

*Given the following graphql schema file (Note Not loaded to npm yet)*

    directive @PrimaryGeneratedColumn on FIELD_DEFINITION

    directive @EntityEnum on OBJECT

    type Author implements Node @Entity {
        id: Int! @PrimaryGeneratedColumn
        name: String! @Column(type: "varchar", length: 20)
        books: AuthorBooksConnection @Relationship(type: "many-to-many", inverseSide: "authors") @JoinColumn
    }

    type AuthorBooksConnection {
        first: Int
        last: Int
        before: String
        after: String
        pageInfo: PageInfo!
        edges: [AuthorBooksEdge]
    }

    type AuthorBooksEdge {
        cursor: String!
        node: Book
    }

    type PageInfo {
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
        startCursor: String!
        endCursor: String!
    }

    type Book implements Node @Entity {
        id: Int! @PrimaryGeneratedColumn
        title: String! @Column(type: "varchar")
        description: String @Column(type: "varchar")
        authors: BookAuthorsConnection @Relationship(type: "many-to-many", inverseSide: "books")
        publisher: Publisher @Relationship(type: "many-to-one", inverseSide: "books")
    }

    type BookAuthorsConnection {
        first: Int
        last: Int
        before: String
        after: String
        pageInfo: PageInfo!
        edges: [BookAuthorsEdge]    
    }

    type BookAuthorsEdge {
        cursor: String!
        node: Author  
    }

    type Publisher implements Node @Entity {
        id: Int! @PrimaryGeneratedColumn
        name: String! @Column(type: "varchar")
        books: [Book] @Relationship(type: "one-to-many", inverseSide: "publisher")
    }

    type PublisherBooksConnection {
        first: Int
        last: Int
        before: String
        after: String
        pageInfo: PageInfo!
        edges: [PublisherBooksEdge]    
    }

    type PublisherBooksEdge {
        cursor: String!
        node: Book  
    }

    interface Node {
        id: ID!
    }

*When you run this javascript file*

    import fs from 'fs'
    import { toSchema } from 'graphschematojson/dist'

    const schema = fs.readFileSync('./test.graphql', 'utf8')

    fs.writeFileSync('./output.json', JSON.stringify(toSchema(schema), null, 4))

*The output will be*

    {
        "types": {
            "Author": {
                "fields": {
                    "id": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {
                            "PrimaryGeneratedColumn": {}
                        },
                        "type": "Int"
                    },
                    "name": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {
                            "Column": {
                                "type": "varchar",
                                "length": 20
                            }
                        },
                        "type": "String"
                    },
                    "books": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {
                            "Relationship": {
                                "type": "many-to-many",
                                "inverseSide": "authors"
                            },
                            "JoinColumn": {}
                        },
                        "type": "AuthorBooksConnection"
                    }
                },
                "directives": {
                    "Entity": {}
                },
                "interfaces": [
                    "Node"
                ]
            },
            "AuthorBooksConnection": {
                "fields": {
                    "first": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {},
                        "type": "Int"
                    },
                    "last": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {},
                        "type": "Int"
                    },
                    "before": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {},
                        "type": "String"
                    },
                    "after": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {},
                        "type": "String"
                    },
                    "pageInfo": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {},
                        "type": "PageInfo"
                    },
                    "edges": {
                        "isNullable": true,
                        "isList": true,
                        "directives": {},
                        "type": "AuthorBooksEdge"
                    }
                },
                "directives": {},
                "interfaces": []
            },
            "AuthorBooksEdge": {
                "fields": {
                    "cursor": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {},
                        "type": "String"
                    },
                    "node": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {},
                        "type": "Book"
                    }
                },
                "directives": {},
                "interfaces": []
            },
            "PageInfo": {
                "fields": {
                    "hasNextPage": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {},
                        "type": "Boolean"
                    },
                    "hasPreviousPage": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {},
                        "type": "Boolean"
                    },
                    "startCursor": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {},
                        "type": "String"
                    },
                    "endCursor": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {},
                        "type": "String"
                    }
                },
                "directives": {},
                "interfaces": []
            },
            "Book": {
                "fields": {
                    "id": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {
                            "PrimaryGeneratedColumn": {}
                        },
                        "type": "Int"
                    },
                    "title": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {
                            "Column": {
                                "type": "varchar"
                            }
                        },
                        "type": "String"
                    },
                    "description": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {
                            "Column": {
                                "type": "varchar"
                            }
                        },
                        "type": "String"
                    },
                    "authors": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {
                            "Relationship": {
                                "type": "many-to-many",
                                "inverseSide": "books"
                            }
                        },
                        "type": "BookAuthorsConnection"
                    },
                    "publisher": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {
                            "Relationship": {
                                "type": "many-to-one",
                                "inverseSide": "books"
                            }
                        },
                        "type": "Publisher"
                    }
                },
                "directives": {
                    "Entity": {}
                },
                "interfaces": [
                    "Node"
                ]
            },
            "BookAuthorsConnection": {
                "fields": {
                    "first": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {},
                        "type": "Int"
                    },
                    "last": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {},
                        "type": "Int"
                    },
                    "before": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {},
                        "type": "String"
                    },
                    "after": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {},
                        "type": "String"
                    },
                    "pageInfo": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {},
                        "type": "PageInfo"
                    },
                    "edges": {
                        "isNullable": true,
                        "isList": true,
                        "directives": {},
                        "type": "BookAuthorsEdge"
                    }
                },
                "directives": {},
                "interfaces": []
            },
            "BookAuthorsEdge": {
                "fields": {
                    "cursor": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {},
                        "type": "String"
                    },
                    "node": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {},
                        "type": "Author"
                    }
                },
                "directives": {},
                "interfaces": []
            },
            "Publisher": {
                "fields": {
                    "id": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {
                            "PrimaryGeneratedColumn": {}
                        },
                        "type": "Int"
                    },
                    "name": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {
                            "Column": {
                                "type": "varchar"
                            }
                        },
                        "type": "String"
                    },
                    "books": {
                        "isNullable": true,
                        "isList": true,
                        "directives": {
                            "Relationship": {
                                "type": "one-to-many",
                                "inverseSide": "publisher"
                            }
                        },
                        "type": "Book"
                    }
                },
                "directives": {
                    "Entity": {}
                },
                "interfaces": [
                    "Node"
                ]
            },
            "PublisherBooksConnection": {
                "fields": {
                    "first": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {},
                        "type": "Int"
                    },
                    "last": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {},
                        "type": "Int"
                    },
                    "before": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {},
                        "type": "String"
                    },
                    "after": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {},
                        "type": "String"
                    },
                    "pageInfo": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {},
                        "type": "PageInfo"
                    },
                    "edges": {
                        "isNullable": true,
                        "isList": true,
                        "directives": {},
                        "type": "PublisherBooksEdge"
                    }
                },
                "directives": {},
                "interfaces": []
            },
            "PublisherBooksEdge": {
                "fields": {
                    "cursor": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {},
                        "type": "String"
                    },
                    "node": {
                        "isNullable": true,
                        "isList": false,
                        "directives": {},
                        "type": "Book"
                    }
                },
                "directives": {},
                "interfaces": []
            }
        },
        "unions": {},
        "interfaces": {
            "Node": {
                "fields": {
                    "id": {
                        "isNullable": false,
                        "isList": false,
                        "directives": {},
                        "type": "ID"
                    }
                },
                "directives": {}
            }
        }
    }

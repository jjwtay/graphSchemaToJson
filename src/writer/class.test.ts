import { ClassType, writeClass } from "./class";

const classMap = {
  fields: {
    name: {
      type: "String",
      directives: {},
      isNullable: false,
      isList: false
    },
    age: {
      type: "Int",
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
      type: "Gender",
      directives: {},
      isNullable: false,
      isList: false
    }
  },
  directives: {
    Entity: {}
  },
  type: "Object",
  implements: [],
  extends: "BaseEntity"
};

describe("ClassType", () => {
  const classType = new ClassType();

  describe("write", () => {
    const written = classType.write(classMap);

    test("written", () => {
      expect(written).toBeDefined();
    });
  });
});

describe("writeClass", () => {
  writeClass(classMap);
});

import { Directive } from "./directive";

export class BaseType {
  schema: any;
  constructor(schema = {}) {
    this.schema = schema;
  }
}

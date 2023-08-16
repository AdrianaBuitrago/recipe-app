import BaseModel from './BaseModel'


export class Link extends BaseModel {

  id!: number
  recipe_id!: number
  value!: string

  static get tableName() {
    return `${this.schema}.link`
  }

  static jsonSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['value'],
    properties: {
      id: { type: 'integer' },
      recipe_id: { type: ['integer', 'null'] },
      // type: { type: 'string' }, // 'youtube', 'web', ...
      value: { type: 'string' },
    },
  }

}

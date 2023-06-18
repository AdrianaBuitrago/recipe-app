import BaseModel from './BaseModel'

export class RecipeIngredient extends BaseModel {

  id!: number
  recipe_id!: number
  ingredient_id!: number

  static get tableName() {
    return `${this.schema}.recipe_ingredient`
  }

  static jsonSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['recipe_id', 'ingredient_id'],
    properties: {
      id: { type: 'integer' },
      recipe_id: { type: 'integer' },
      ingredient_id: { type: 'integer' },
    },
  }

}
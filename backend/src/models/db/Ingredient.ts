import BaseModel from './BaseModel'
import { getModelCompletePathToColumn as _ } from '../../utils'
import { Recipe } from './'


export class Ingredient extends BaseModel {

  id!: number
  name!: string
  is_checked!: boolean

  // relations attributes
  recipes?: Recipe[]

  static get tableName() {
    return `${this.schema}.ingredient`
  }

  static jsonSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['name'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      is_checked: { type: 'boolean' },
    },
  }

  static get relationMappings(): any {

    // To prevent recursive imports
    const { Recipe } = require('./')
    const { RecipeIngredient } = require('./')

    return {
      recipes: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Ingredient,
        join: {
          from: _(Ingredient),
          through: {
            from: _(RecipeIngredient, 'ingredient_id'),
            to: _(RecipeIngredient, 'recipe_id'),
          },
          to: _(Recipe)
        }
      },
    }
  }

  $beforeUpsert() {
    if (this.name) {
      this.name = this.name.toLowerCase()
    }
  }

  $beforeInsert() {
    this.$beforeUpsert()
  }

  $beforeUpdate() {
    this.$beforeUpsert()
  }

}

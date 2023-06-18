import BaseModel from './BaseModel'
import { getModelCompletePathToColumn as _ } from '../../utils'
import { Ingredient, Link } from './'


export class Recipe extends BaseModel {

  id!: number
  name!: string
  description!: string

  // relations attributes
  ingredients?: Ingredient[]
  links?: Link[]

  static get tableName() {
    return `${this.schema}.recipe`
  }

  static jsonSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['name'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      description: { type: 'string' },
    },
  }

  static get relationMappings(): any {

    // To prevent recursive imports
    const { Ingredient } = require('./')
    const { RecipeIngredient } = require('./')
    const { Link } = require('./')

    return {
      ingredients: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Ingredient,
        join: {
          from: _(Recipe),
          through: {
            from: _(RecipeIngredient, 'recipe_id'),
            to: _(RecipeIngredient, 'ingredient_id'),
          },
          to: _(Ingredient)
        }
      },
      links: {
        relation: BaseModel.HasManyRelation,
        modelClass: Link,
        join: {
          from: _(Recipe),
          to: _(Link, 'recipe_id')
        }
      },
    }
  }

}
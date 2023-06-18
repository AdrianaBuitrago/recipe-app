import Knex from 'knex'
import { databaseConfig } from '../../config'
import { Recipe } from './Recipe'
import { Ingredient } from './Ingredient'
import { RecipeIngredient } from './RecipeIngredient'
import { Link } from './Link'

// Initialize knex
const KnexConnection = Knex(databaseConfig)

Recipe.knex(KnexConnection)
Ingredient.knex(KnexConnection)
RecipeIngredient.knex(KnexConnection)
Link.knex(KnexConnection)

export {
  Recipe,
  Ingredient,
  RecipeIngredient,
  Link,
}
import express from 'express'
import { errorHandler } from '../utils'
import { Recipe, Ingredient } from '../models/db'
import { NotFoundError } from '../errors'

const router = express()

router.get('/recipes', errorHandler(async (req, res) => {
  const recipes = await Recipe
    .query()
    .withGraphFetched({ingredients: true, links: true})

  res.json(recipes)
}))

router.get('/recipes/:id(\\d+)', errorHandler(async(req, res) => {
  const { id } = req.params

  const recipe = await Recipe
    .query()
    .withGraphFetched({ingredients: true, links: true})
    .findById(id)

  if (!recipe) {
    throw new NotFoundError('Recipe not found')
  }

  res.json(recipe)
}))

router.post('/recipes', errorHandler(async (req, res) => {
  const { body } = req

  if (body.ingredients?.length) {
    // Search for existing Ingredients. If exist, pass the id to Objection to tell that should be related
    body.ingredients = await Promise.all(body.ingredients.map(async (ingredientName: string) =>
      await Ingredient
        .query()
        .where({name: ingredientName.toLowerCase()})
        .first()
      ||
      {name: ingredientName.toLowerCase()}
    ))
  }

  const trx = await Recipe.startTransaction()

  const options = {
    relate: ['ingredients'],
    unrelate: ['ingredients']
  }
  let recipe
  try {
    recipe = await Recipe
      .query(trx)
      .allowGraph({ingredients: true, links: true})
      .insertGraphAndFetch(body, options)
    await trx.commit()
  } catch (err) {
    await trx.rollback()
    throw err
  }

  res.json(recipe)
}))

router.put('/recipes/:id(\\d+)', errorHandler(async (req, res) => {
  const { id } = req.params
  const { body } = req

  const found = await Recipe
    .query()
    .findById(id)

  if (!found) {
    throw new NotFoundError('Recipe not found')
  }

  if (body.ingredients?.length) {
    // Search for existing Ingredients. If exist, pass the id to Objection to tell that should be related
    body.ingredients = await Promise.all(body.ingredients.map(async (ingredientName: string) =>
      await Ingredient
        .query()
        .where({name: ingredientName.toLowerCase()})
        .first()
        ||
        {name: ingredientName.toLowerCase()}
    ))
  }

  const trx = await Recipe.startTransaction()

  const options = {
    relate: ['ingredients'],
    unrelate: ['ingredients'],
  }

  let recipe
  try {
    recipe = await Recipe
      .query(trx)
      .allowGraph({
        ingredients: true,
        links: true
      })
      .upsertGraphAndFetch({
        ...body,
        id: parseInt(id),
      }, options)
    await trx.commit()
  } catch (err) {
    await trx.rollback()
    throw err
  }

  res.json(recipe)
}))

router.delete('/recipes/:id(\\d+)', errorHandler(async (req, res) => {
  const { id } = req.params

  const deleted = await Recipe
    .query()
    .deleteById(id)

  // If not found, the value of deleted is zero
  if (!deleted) {
    throw new NotFoundError('Recipe not found')
  }

  res.json({message: 'Deleted succesfully'})
}))

export default router
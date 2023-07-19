import express from 'express'
import { errorHandler } from '../utils'
import { Ingredient } from '../models/db'
import NotFoundError from '../errors/BadRequestError'


const router = express()

router.get('/ingredients', errorHandler(async (req, res) => {
  const ingredients = await Ingredient
    .query()

  res.json(ingredients)
}))

router.patch('/ingredients/:id(\\d+)', errorHandler(async (req, res) => {
  const { id } = req.params
  const { body } = req

  const oldIngredient = await Ingredient
    .query()
    .findById(parseInt(id))

  if (!oldIngredient) {
    throw new NotFoundError('Ingredient not found')
  }

  const ingredient = await oldIngredient
    .$query()
    .patch(body)
    .findById(parseInt(id))
    .returning('*')

  res.json(ingredient)
}))

router.delete('/ingredients/:id(\\d+)', errorHandler(async (req, res) => {
  const { id } = req.params

  const deleted = await Ingredient
    .query()
    .deleteById(id)

  // If not found, the value of deleted is zero
  if (!deleted) {
    throw new NotFoundError('Ingredient not found')
  }

  res.json({message: 'Deleted succesfully'})
}))

export default router
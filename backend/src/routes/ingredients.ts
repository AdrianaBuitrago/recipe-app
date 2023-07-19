import express from 'express'
import { errorHandler } from '../utils'
import { Ingredient } from '../models/db'


const router = express()

router.get('/ingredients', errorHandler(async (req, res) => {
  const ingredients = await Ingredient
    .query()

  res.json(ingredients)
}))

export default router
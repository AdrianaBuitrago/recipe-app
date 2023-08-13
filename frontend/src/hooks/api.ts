import { useState, useEffect } from 'react'
import { INGREDIENTS, RECIPES } from 'src/api'

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    try {
      const response = await fetch(RECIPES)
      const json = await response.json()
      setRecipes(json)
    } catch (error) {
      console.error('Error al obtener las recetas:', error)
    }
  }

  return {
    recipes
  }
}

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    fetchIngredients()
  }, [])

  const fetchIngredients = async () => {
    try {
      const response = await fetch(INGREDIENTS)
      const json = await response.json()
      setIngredients(json)
    } catch (error) {
      console.error('Error al obtener los ingredientes', error)
    }
  }

  return {
    ingredients,
    fetchIngredients
  }
}


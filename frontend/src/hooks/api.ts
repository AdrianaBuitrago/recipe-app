import { useState, useEffect } from 'react'
import { RECIPES } from 'src/api'

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

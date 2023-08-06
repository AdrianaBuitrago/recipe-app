import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Metric } from '@tremor/react'

import { Link } from 'react-router-dom'
import { RECIPES } from 'src/api'

export function ExpandedRecipe({ selectedId }) {

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

  const recipe = recipes.find(recipe => {
    return recipe.id === Number(selectedId)
  })

  if (!recipe) {
    return null
  }

  const { name, description, id } = recipe

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        style={{ pointerEvents: 'auto' }}
        className="overlay"
      >
        <Link to="/recipes" />
      </motion.div>
      <div className="card-content-container open">
        <motion.div className="card-content" layoutId={`card-container-${id}`}>
          <motion.div
            className="card-image-container"
            layoutId={`card-image-container-${id}`}
          >
            <img
              className="card-image"
              src='https://imag.bonviveur.com/sushi-casero_800.webp'
              alt=""
            />
          </motion.div>
          <motion.div
            className="title-container"
            layoutId={`title-container-${id}`}
          >
            {/* <span className="category">{description}</span> */}
            <Metric>{name}</Metric>
          </motion.div>
          <motion.div className="content-container" animate>
            <p>{description}</p>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

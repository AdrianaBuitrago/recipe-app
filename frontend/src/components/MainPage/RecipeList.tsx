import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Metric } from '@tremor/react'
import { RECIPES } from 'src/api'

function RecipePreview({ id, name, description }) {

  return (
    <li className={`card ${name}`}>
      <div className="card-content-container">
        <motion.div className="card-content" layoutId={`card-container-${id}`}>
          <motion.div
            className="card-image-container"
            layoutId={`card-image-container-${id}`}
          >
            <img
              className="card-image"
              // src={`images/${id}.jpg`}
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
        </motion.div>
      </div>
      <Link to={`/recipes/${id}`} className={`card-open-link`} />
    </li>
  )
}

export function RecipeList({ selectedId }) {

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
  return (
    <ul className="card-list">
      {recipes.map(recipe => (
        <RecipePreview
          key={recipe.id}
          name={recipe.name}
          {...recipe}
          isSelected={recipe.id === selectedId} />
      ))}
    </ul>
  )
}

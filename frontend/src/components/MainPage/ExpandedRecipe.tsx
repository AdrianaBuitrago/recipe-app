import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Metric, Title } from '@tremor/react'
import ReactPlayer from 'react-player'
import { LeftArrow, RightArrow } from './arrows'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import { IngredientList } from 'components/IngredientList'
import 'react-horizontal-scrolling-menu/dist/styles.css'
import './styles.scss'

import { Link } from 'react-router-dom'
import { useOnClickOutside } from 'src/hooks'

export function ExpandedRecipe({ recipes, fetchRecipes, selectedId }) {
  const history = useHistory()
  const ref = useRef()
  useOnClickOutside(ref, () => { history.push('/recipes') })

  const recipe = recipes.find(recipe => {
    return recipe.id === Number(selectedId)
  })

  if (!recipe) {
    return null
  }
  console.log(recipe)
  const { name, description, id, links, ingredients } = recipe

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        // style={{ pointerEvents: 'auto' }}
        className="overlay"
      >
        <Link to="/recipes" />
      </motion.div>
      <div className="expanded-recipe card-content-container open">
        <motion.div
          ref={ref}
          className="card-content"
          layoutId={`card-container-${id}`}
        >
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
          <motion.div className="content-container">
            <motion.div
              className="title-container"
              layoutId={`title-container-${id}`}
            >
              <Metric>{name}</Metric>
            </motion.div>
            <div className="ingredients-container">
              <Title>Ingredientes:</Title>
              <IngredientList
                ingredients={ingredients}
                showSearch = {false}
                onChange={() => {fetchRecipes()}}
              />
            </div>
            <motion.div animate>
              <p>{description}</p>
            </motion.div>
            <div className='video-player-container'>
              <ScrollMenu
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
              >
                {links.map((link) => (
                  <ReactPlayer
                    id={link.value}
                    url={link.value}
                    className='react-player'
                    controls
                    width='170px'
                    height='100%'
                  />
                ))}
              </ScrollMenu>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

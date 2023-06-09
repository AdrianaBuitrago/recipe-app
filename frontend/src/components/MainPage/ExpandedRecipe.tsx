import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { items } from './data'

export function ExpandedRecipe({ id }) {
  const { category, title } = items.find(item => item.id === id)

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
            <span className="category">{category}</span>
            <h2>{title}</h2>
          </motion.div>
          <motion.div className="content-container" animate>
            <p>Prueba de texto. ItemExampleFramer. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ad quaerat voluptates ullam aspernatur sapiente ducimus eos, rerum neque culpa amet distinctio reprehenderit totam soluta, ipsa numquam, dolor recusandae libero.</p>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

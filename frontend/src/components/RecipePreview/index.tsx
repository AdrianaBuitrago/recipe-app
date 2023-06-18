import React, { useState } from 'react'
import RecipeDetail from 'components/RecipeDetail'
import { motion, AnimatePresence } from 'framer-motion'
import './RecipePreview.scss'

const RecipePreview = ({
  id = '1',
  title = 'Sushi',
  category = 'Japonés',

}) => {

  const [isSelected, setIsSelected] = useState(false)

  return (
    <>
      <li className={'card'} onClick={() => setIsSelected(!isSelected)}>
        <div className="card-content-container" >

          <motion.div className="card-content" layoutId={`card-container-${id}`}>
            <motion.div
              className="card-image-container"
              layoutId={`card-image-container-${id}`}
            >
              <img className="card-image" src={'https://imag.bonviveur.com/sushi-casero_800.webp'} alt="" />
            </motion.div>
            <motion.div
              className="title-container"
              layoutId={`title-container-${id}`}
            >
              <span className="category">{category}</span>
              <h2>{title}</h2>
            </motion.div>
          </motion.div>
        </div>
        {/* <Link to={id} className={`card-open-link`} /> */}
      </li>
      <AnimatePresence>
        {isSelected === true ?
          <RecipeDetail /> : null}

      </AnimatePresence>
    </>
  )
}


export default RecipePreview
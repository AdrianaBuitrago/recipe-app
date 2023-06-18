import React from 'react'
import { motion } from 'framer-motion'


const RecipeDetail = ({
  id = '1',
  title = 'Sushi',
  category = 'Japonés'
}) => {
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
        {/* <Link to="/" /> */}
      </motion.div>
      <div className="card-content-container open">
        <motion.div className="card-content" layoutId={`${id}`}>
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
          <motion.div className="content-container" animate>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore commodi in sunt nemo. Rem reiciendis ratione ipsa eveniet nostrum sint distinctio inventore, omnis, nobis ad quis alias aspernatur obcaecati in.</p>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default RecipeDetail
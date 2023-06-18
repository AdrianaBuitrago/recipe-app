import React, { useState } from 'react'
import RecipePreviewList from 'components/RecipePreviewList'
import { motion } from 'framer-motion'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'

const Prueba = () => {
  const [selected, setSelected] = useState(null)
  const items = [{
    id: '1',
    title: 'Mediterraneo',
    subtitle: 'Catalang'
  },
  {
    id: '2',
    title: 'Portugués',
    subtitle: 'Bla'
  }]
  return (
    <AnimateSharedLayout type='crossfade'>

      {items.map(item => (
        <motion.div layoutId={item.id} onClick={() => setSelected(item)}>
          <motion.h5>{item.subtitle}</motion.h5>
          <motion.h2>{item.title}</motion.h2>
        </motion.div>
      ))}

      <AnimatePresence>
        {selected && (
          <motion.div layoutId={selected.id}>
            <motion.h5>{selected.subtitle}</motion.h5>
            <motion.h2>{selected.title}</motion.h2>
            <motion.button onClick={() => setSelected(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}

const RecipeApp = () => {
  return (
    <RecipePreviewList />
    // <Prueba />
  )
}

export default RecipeApp
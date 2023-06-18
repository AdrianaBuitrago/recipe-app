import React from 'react'
import RecipePreview from 'components/RecipePreview'
import './RecipePreviewList.scss'

const RecipePreviewList = () => {
  return (
    <>
      <section className='recipes-container'>
        <h1>Recetas</h1>
        <RecipePreview id="1"/>
        <RecipePreview id="2"/>
        <RecipePreview id="3"/>
      </section>
    </>
  )
}

export default RecipePreviewList
import React from 'react'
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion'
import { Header } from './Header'
import { ExpandedRecipe } from './ExpandedRecipe'
import { RecipeList } from './RecipeList'
import { Switch, Route } from 'react-router-dom'
import './styles.scss'
import { Footer } from './Footer'

function RecipeListWithAnimation({ match }) {
  let { id } = match.params
  const imageHasLoaded = true

  return (
    <>
      <RecipeList selectedId={id} />
      <AnimatePresence>
        {id && imageHasLoaded && <ExpandedRecipe id={id} key="item" />}
      </AnimatePresence>
    </>
  )
}
function IngredientList() {
  return <div style={{color: 'red'}}>ingredientList</div>
}

export default function MainPage() {
  return (
    <div className="main-page-container">
      <div className="container">
        <AnimateSharedLayout type="crossfade">
          <Header />
          <Switch>
            <>
              <Route path={'/ingredient-list'} exact component={IngredientList} />
              <Route path={'/'} exact component={RecipeListWithAnimation} />
            </>
          </Switch>
        </AnimateSharedLayout>
      </div>
      <Footer />
    </div>
  )
}

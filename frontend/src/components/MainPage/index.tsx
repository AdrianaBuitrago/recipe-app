import React from 'react'
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion'
import { Header } from './Header'
import { ExpandedRecipe } from './ExpandedRecipe'
import { RecipeList } from './RecipeList'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Footer } from './Footer'
import IngredientList from '../IngredientList'
import './styles.scss'

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

export default function MainPage() {
  return (
    <div className="main-page-container">
      <div className="container">
        <AnimateSharedLayout>
          <Header />
          <Switch>
            <>
              <Route path={'/ingredient-list'} exact component={IngredientList} />
              <Route path={['/recipes', '/recipes/:id']} exact component={RecipeListWithAnimation} />
              <Redirect from={'*'} to={'/ingredient-list'} />
            </>
          </Switch>
        </AnimateSharedLayout>
      </div>
      <Footer />
    </div>
  )
}

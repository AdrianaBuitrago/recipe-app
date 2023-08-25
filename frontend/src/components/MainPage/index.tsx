import React, {useState} from 'react'
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion'
import { Header } from './Header'
import { CreateNewRecipe } from './CreateNewRecipe'
import { ExpandedRecipe } from './ExpandedRecipe'
import { RecipeList } from './RecipeList'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AddRecipeButton } from 'components/AddRecipeButton'
import { Footer } from './Footer'
import IngredientList from '../IngredientList'
import './styles.scss'
import { useRecipes } from 'src/hooks/api'

function RecipeListWithAnimation({ match }) {
  let { id } = match.params
  const imageHasLoaded = true
  const { recipes, fetchRecipes } = useRecipes()

  const [toggle, setToggle] = useState(false)

  return (
    <>
      <RecipeList selectedId={id} />
      <AnimatePresence>
        {id && imageHasLoaded && <ExpandedRecipe fetchRecipes={fetchRecipes} recipes={recipes} selectedId={id} />}
      </AnimatePresence>
      <AddRecipeButton
        onClickAddRecipeButton={() => setToggle(true)}
      />
      {toggle && <CreateNewRecipe onClickCancel={() => setToggle(false)}/>}
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
            <Route path={'/ingredient-list'} exact component={IngredientList} />
            <Route path={['/recipes', '/recipes/:id']} exact component={RecipeListWithAnimation} />
            <Redirect from={'*'} to={'/recipes'} />
          </Switch>
        </AnimateSharedLayout>
      </div>
      <Footer />
    </div>
  )
}

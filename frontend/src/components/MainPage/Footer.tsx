import * as React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLemon } from '@fortawesome/free-regular-svg-icons'
import { faListCheck, faLemon as faLemonsolid } from '@fortawesome/free-solid-svg-icons'
import './footer.scss'


export const Footer = () => {
  const history = useHistory()
  const isIngredientListPage = useRouteMatch('/ingredient-list')
  const activeColor = 'var(--brand-color)'
  const disabledColor = 'var(--back-color)'

  const onclickMainPageButton = () => {
    history.push('/recipes')
  }

  const onclickIngredientListButton = () => {
    history.push('/ingredient-list')
  }

  return (
    <footer>
      <div className='icons-nav-bar'>
        <FontAwesomeIcon
          icon={!isIngredientListPage ? faLemonsolid : faLemon}
          size='xl'
          style={{color: !isIngredientListPage ? activeColor : disabledColor}}
          onClick={onclickMainPageButton}
        />
        <FontAwesomeIcon
          icon={faListCheck}
          size='xl'
          style={{color: isIngredientListPage ? activeColor : disabledColor}}
          onClick={onclickIngredientListButton}
        />
      </div>
    </footer>
  )
}

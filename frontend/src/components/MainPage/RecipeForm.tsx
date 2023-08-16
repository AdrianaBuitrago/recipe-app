import React, { useEffect, useState } from 'react'
import { useIngredients } from 'src/hooks/api'
import ReactPlayer from 'react-player'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css'
import { LeftArrow, RightArrow } from './arrows'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'

import './recipeform.scss'



export function LinksForm({ name, onChange }) {

  const [newLink, setNewLink] = useState('')
  const [links, setLinks] = useState([])

  useEffect(() => {
    const event = {
      target:{
        name: name,
        value: links
      }
    }
    onChange(event)
  }, [links])

  const handleInputChange = (e) => {
    setNewLink(e.target.value)
  }

  const handleAgregarClick = () => {
    if (newLink === '') return
    if (links.includes(newLink)) {
      setNewLink('')
      return
    }
    setLinks([
      // mantenemos todos los links añadidos a la receta previamente
      ...links,
      // y le sumamos el nuevo que se ha escrito en el input de links
      newLink
    ])
    setNewLink('')
  }

  let linksEmpty
  if (links.length === 0) {
    linksEmpty = true
  } else {
    linksEmpty = false
  }

  const showScrollMenu = !linksEmpty

  return (
    <div>
      <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Link</label>
      {showScrollMenu ?
        <div className='video-player-container'>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}>
            {links.map((link) => (
              <ReactPlayer
                id={link}
                url={link}
                className='react-player'
                controls
                width='170px'
                height='100%'
              />
            ))}
          </ScrollMenu>
        </div>
        : null}
      <section className="relative mb-5 mt-2">
        <input type="url" id="website"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-4 dark:placeholder-gray-400"
          placeholder="https://..."
          value={newLink}
          onChange={handleInputChange}
        />
        <button
          className="text-gray-900 absolute right-2.5 bottom-2.5 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-4 py-2"
          onClick={handleAgregarClick}
        >
          <FontAwesomeIcon
            style={{ color: 'var(--black-color)' }}
            icon={faPlus}
            size='sm'
          />
        </button>
      </section>
    </div>
  )
}


export function IngredientsForm({ name, onChange }) {

  const { ingredients, fetchIngredients } = useIngredients()
  const [newIngredient, setNewIngredient] = useState('')
  const [recipeIngredients, setRecipeIngredients] = useState([])

  useEffect(() => {
    const event = {
      target:{
        name: name,
        value: recipeIngredients
      }
    }
    onChange(event)
  }, [recipeIngredients])

  // Función para manejar el cambio en el input
  const handleInputChange = (e) => {
    setNewIngredient(e.target.value)
  }

  const handleAgregarClick = () => {
    // si lo que viene del input es string vacio, lo ignoramos (por eso el return)
    if (newIngredient === '') return
    // si ya lo tenemos en el nuevo array, lo ignoramos (return)
    if (recipeIngredients.includes(newIngredient)) {
      setNewIngredient('')
      return
    }
    setRecipeIngredients([
      // mantenemos todos los ingredientes añadidos a la receta previamente
      ...recipeIngredients,
      // y le sumamos el nuevo que se ha escrito en el input de ingrediente
      newIngredient
    ])
    setNewIngredient('')
  }

  const onClickDeleteButton = (ingredientToRemove) => {

    setRecipeIngredients(recipeIngredients.filter((recipeIngredient) => recipeIngredient !== ingredientToRemove))
  }


  return (
    <div>
      <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Ingredientes</label>
      <div className="relative mb-5 mt-2">
        <input
          type="text"
          placeholder="Añade un ingrediente"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          value={newIngredient}
          onChange={handleInputChange}
          list="categories"
          autoComplete="off"
        />
        <datalist id="categories">
          {ingredients.filter((ingredient) => {
            if (recipeIngredients.includes(ingredient.name)) return false
            return true
          }).map((ingredient) => (
            <option key={ingredient.id} value={ingredient.name} />
          ))}
        </datalist>
        <button
          className="text-gray-900 absolute right-2.5 bottom-2.5 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-4 py-2"
          onClick={handleAgregarClick}
        >
          <FontAwesomeIcon
            style={{ color: 'var(--black-color)' }}
            icon={faPlus}
            size='sm'
          />
        </button>
      </div>
      <div>
        <ul className="ingredient-list-form  max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          {recipeIngredients.map((recipeIngredient) => (
            <li>
              {recipeIngredient}
              <FontAwesomeIcon
                className='icon-x'
                icon={faXmark}
                size='sm'
                style={{ color: 'var(--black-color)' }}
                onClick={() => onClickDeleteButton(recipeIngredient)}
                cursor='pointer'
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
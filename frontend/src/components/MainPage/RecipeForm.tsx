import React, { useState } from 'react'
import { useIngredients } from 'src/hooks/api'

export function LinksForm() {

  const [newLink, setNewLink] = useState('')
  const [links, setLinks] = useState([])

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

  return (
    <div>
      <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Link</label>
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
          +
        </button>
      </section>
      <div>
        {JSON.stringify(links)}
      </div>
    </div>
  )
}


export function IngredientsForm() {

  const { ingredients, fetchIngredients } = useIngredients()
  const [newIngredient, setNewIngredient] = useState('')
  const [recipeIngredients, setRecipeIngredients] = useState([])

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
          +
        </button>
      </div>
      <div>
        {JSON.stringify(recipeIngredients)}
        {/* <p>Lista de ingredientes:</p>
        <ul>
          {newIngredient.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.name}</li>
          ))}
        </ul> */}
      </div>
    </div>
  )
}
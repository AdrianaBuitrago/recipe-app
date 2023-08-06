import React from 'react'
import { useEffect, useState } from 'react'
import { INGREDIENTS } from 'src/api'
import { TextInput } from '@tremor/react'
import Checkbox from 'components/Checkbox'
import './style.scss'

function IngredientList() {

  const [ingredients, setIngredients] = useState([])
  const [searchIngredients, setSearchIngredients] = useState('')

  useEffect(() => {
    fetchIngredients()
  }, [])

  const fetchIngredients = async () => {
    try {
      const response = await fetch(INGREDIENTS)
      const json = await response.json()
      setIngredients(json)
    } catch (error) {
      console.error('Error al obtener los ingredientes:', error)
    }
  }

  const handleCheckboxChange = async (ingredientId, isChecked) => {
    try {
      await fetch(`${INGREDIENTS}/${ingredientId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'is_checked': isChecked
        }),
      })
      fetchIngredients()
    } catch (error) {
      console.error('Error al actualizar el ingrediente:', error)
    }
  }

  const handleSearchInputChange = (e) => {
    setSearchIngredients(e.target.value)
  }

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchIngredients.toLowerCase())
  )

  return (
    <>
      <div className='ingredient-list'>
        <section>
          <h1>Despensa</h1>
          <ul>
            {filteredIngredients.filter(ingredient => { return ingredient.is_checked })
              .map((ingredient) => (
                <Checkbox
                  key={ingredient.id}
                  label={ingredient.name}
                  checked
                  onChange={(e) => handleCheckboxChange(ingredient.id, e.target.checked)}
                />
              ))}
          </ul>
        </section>
        <section>
          <h1>Comprar</h1>
          <ul>
            {filteredIngredients.filter(ingredient => { return !ingredient.is_checked })
              .map((ingredient) => (
                <Checkbox
                  key={ingredient.id}
                  label={ingredient.name}
                  checked={false}
                  onChange={(e) => handleCheckboxChange(ingredient.id, e.target.checked)}
                />
              ))}
          </ul>
        </section>
      </div>
      <div className='search-container'>
        <TextInput
          className='search-input'
          value={searchIngredients}
          placeholder="Buscar..."
          onChange={handleSearchInputChange}
        />
      </div>
    </>
  )
}

export default IngredientList
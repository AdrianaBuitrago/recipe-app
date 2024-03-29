import React from 'react'
import { useState } from 'react'
import { useIngredients } from 'src/hooks/api'
import { INGREDIENTS } from 'src/api'
import { TextInput } from '@tremor/react'
import Checkbox from 'components/Checkbox'
import './style.scss'


export function IngredientList({
  ingredients,
  onChange,
  showSearch = true,
}) {
  const [searchIngredients, setSearchIngredients] = useState('')

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
      onChange()
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
      <div className='container-ingredient-list'>
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
                    showDeleteButton
                    onClickDeleteButton={(e) => handleCheckboxChange(ingredient.id, null)}
                  />
                ))}
            </ul>
          </section>
          <section>
            <h1>Comprar</h1>
            <ul>
              {filteredIngredients.filter(ingredient => { return ingredient.is_checked === false })
                .map((ingredient) => (
                  <Checkbox
                    key={ingredient.id}
                    label={ingredient.name}
                    checked={false}
                    onChange={(e) => handleCheckboxChange(ingredient.id, e.target.checked)}
                    showDeleteButton
                    onClickDeleteButton={(e) => handleCheckboxChange(ingredient.id, null)}
                  />
                ))}
            </ul>
          </section>
        </div>
        <div className='search-container'>
          {
            showSearch ?
              <TextInput
                className='search-input'
                value={searchIngredients}
                placeholder="Buscar..."
                onChange={handleSearchInputChange}
              />
              : null
          }
        </div>
        <section className='ingredients-crossed-out'>
          <h1>Resto de ingredientes</h1>
          <ul>
            {filteredIngredients.filter(ingredient => { return ingredient.is_checked === null })
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
    </>
  )
}

const AllIngredientList = () => {
  const { ingredients, fetchIngredients } = useIngredients()

  return (
    <IngredientList
      ingredients={ingredients}
      onChange={() => fetchIngredients()}
    />
  )
}

export default AllIngredientList
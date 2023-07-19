import React from 'react'
import { useEffect, useState } from 'react'
import { INGREDIENTS } from 'src/api'
import { TextInput } from '@tremor/react'
import Checkbox from 'components/Checkbox'
import './style.scss'

function IngredientList() {

  const [ingredients, setIngredients] = useState([])
  const [checkedIngredients, setCheckedIngredients] = useState([])
  const [searchIngredients, setSearchIngredients] = useState('')

  useEffect(() => {
    fetch(INGREDIENTS)
      .then((response) => response.json())
      .then((json) => {
        setIngredients(json)
      })
  }, [])

  const handleCheckboxChange = (ingredientName, isChecked) => {
    if (isChecked) {
      setCheckedIngredients([...checkedIngredients, ingredientName])
    } else {
      setCheckedIngredients(checkedIngredients.filter(name => name !== ingredientName))
    }
  }

  const handleSearchInputChange = (e) => {
    setSearchIngredients(e.target.value)
  }

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().startsWith(searchIngredients.toLowerCase())
  )

  return (
    <>
      <div className='ingredient-list'>
        <section>
          <h1>Despensa</h1>
          <ul>
            {filteredIngredients.filter(ingredient => {
              if (checkedIngredients.includes(ingredient.name)) {
                return true
              } else {
                return false
              }
            })
              .map((ingredient) => (
                <Checkbox
                  key={ingredient.id}
                  label={ingredient.name}
                  checked
                  onChange={(e) => handleCheckboxChange(ingredient.name, e.target.checked)}
                />
              ))}
          </ul>
        </section>
        <section>
          <h1>Comprar</h1>
          <ul>
            {filteredIngredients.filter(ingredient => {
              if (checkedIngredients.includes(ingredient.name)) {
                return false
              } else {
                return true
              }
            })
              .map((ingredient) => (
                <Checkbox
                  key={ingredient.id}
                  label={ingredient.name}
                  checked={false}
                  onChange={(e) => handleCheckboxChange(ingredient.name, e.target.checked)}
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
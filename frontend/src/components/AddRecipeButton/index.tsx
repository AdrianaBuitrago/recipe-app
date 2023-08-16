import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import './styles.scss'

export function AddRecipeButton({onClickAddRecipeButton}) {
  return (
    <>
      <div
        className='add-recipe'
        onClick={onClickAddRecipeButton}
      >
        <button type="button" className=" text-white bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-full text-xl p-4 text-center inline-flex items-center mr-2">
          <FontAwesomeIcon
            style={{ color: 'var(--black-color)' }}
            icon={faPlus}
            size='sm'
          />
        </button>
      </div>

    </>
  )
}

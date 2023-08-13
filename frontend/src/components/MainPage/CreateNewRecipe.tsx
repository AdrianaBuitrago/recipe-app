import React from 'react'
import {LinksForm} from './RecipeForm'
import {IngredientsForm} from './RecipeForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlRice, faXmark } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

export function CreateNewRecipe({ onClickCancel }) {

  return (<>
    <div className='create-new-recipe'>
      <div className="py-12 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
        <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div className="create-new-recipe relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <div className="w-full flex justify-start text-gray-600 mb-3">
              <FontAwesomeIcon
                icon={faBowlRice}
                size='xl'
              />
            </div>
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Crea tu receta</h1>
            {/* Nombre */}
            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Nombre</label>
            <section className="relative mb-5 mt-2">
              <input type="text" id="first_name" className="bg-gray-50 border  text-gray-900 text-sm rounded-lg block w-full p-2.5 border border-gray-300 dark:placeholder-gray-400 dark:text-white" placeholder="Nombre de la receta" autoComplete='false' required />
            </section>
            {/* Descripción */}
            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Descripción</label>
            <section className="relative mb-5 mt-2">
              <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400" placeholder="Describe los pasos a seguir..."></textarea>
            </section>

            < LinksForm />

            <IngredientsForm />

            {/* Buttons */}
            <div className="flex items-center justify-start w-full">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Crear
              </button>
              <button
                onClick={onClickCancel}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Cancelar
                </span>
              </button>
            </div>
            <button
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" aria-label="close modal"
              onClick={onClickCancel}
            >
              <FontAwesomeIcon icon={faXmark} style={{ color: '#bababa' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
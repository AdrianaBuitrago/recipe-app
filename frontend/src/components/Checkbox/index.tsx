import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'

import './styles.scss'

function Checkbox({
  label,
  checked,
  onChange,
  showDeleteButton = false,
  onClickDeleteButton = (...args) => {},
}) {
  return (
    <div className="checkbox">
      <input
        className='checkbox'
        type="checkbox"
        checked={checked}
        onChange={onChange}
        color='var(--brand-color)'
      />
      <label>
        {label}
      </label>
      {showDeleteButton ?
        <FontAwesomeIcon
          icon={faXmark}
          size='sm'
          style={{color: 'var(--black-color)'}}
          onClick={onClickDeleteButton}
        />
        :
        null
      }
    </div>
  )
}
export default Checkbox
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'

import './style.scss'

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
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label>
        {label}
      </label>
      {showDeleteButton ?
        <FontAwesomeIcon
          icon={faXmark}
          size='xl'
          style={{color: 'var(--back-color)'}}
          onClick={onClickDeleteButton}
        />
        :
        null
      }
    </div>
  )
}
export default Checkbox
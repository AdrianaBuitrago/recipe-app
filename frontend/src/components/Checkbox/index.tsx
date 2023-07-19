import React from 'react'
import './style.scss'

function Checkbox({ label, checked, onChange }) {
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
    </div>
  )
}
export default Checkbox
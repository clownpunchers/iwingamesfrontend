import React from 'react'
import { useFormContext } from 'react-hook-form'

const Textarea = ({ label, name, rows, placeholder }) => {
  const { register } = useFormContext()

  return (
    <div className="mb-3">
      <label className="form-label">
        {label}
      </label>
      <textarea
        className="form-control"
        rows={rows}
        placeholder={placeholder}
        {...register(name, {
          required: {
            value: true,
            message: 'required',
          },
        })}
      />
    </div>
  )
}

export default Textarea;
import React from 'react';
import { useFormContext } from 'react-hook-form';

const Select = ({ name, label, options }) => {
  const { register } = useFormContext();

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <select
        className="form-control"
        {...register(name, { required: { value: true } })}
      >
        {
          name === "game" ?
            <option value="">Select a game</option>
            :
            <option value="">Select status</option>
        }
        {options.map((option, index) => (
          <option key={index} value={option.value || option.id}>
            {option.label || option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
import React from "react";
import { useFormContext } from "react-hook-form";

const _input = ({ name, label, type, placeholder, accept }) => {
  const { register } = useFormContext();

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        accept={accept}
        {...register(name, {
          required: {
            value: true,
            message: "required",
          },
        })}
      />
    </div>
  );
};

export default _input;

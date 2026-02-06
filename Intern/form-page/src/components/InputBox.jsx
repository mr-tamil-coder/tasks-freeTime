import React from 'react';
import './FormPage.css';

const InputBox = ({ label, name, type = 'text', placeholder, register, errors, validation }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {validation?.required && <span className="required">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`form-input ${errors[name] ? 'error' : ''}`}
        {...register(name, validation)}
      />
      {errors[name] && (
        <span className="error-message">{errors[name].message}</span>
      )}
    </div>
  );
};

export default InputBox;

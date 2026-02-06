import React from 'react';
import './FormPage.css';

const Textarea = ({ label, name, placeholder, rows = 4, register, errors, validation }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {validation?.required && <span className="required">*</span>}
      </label>
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        className={`form-textarea ${errors[name] ? 'error' : ''}`}
        {...register(name, validation)}
      />
      {errors[name] && (
        <span className="error-message">{errors[name].message}</span>
      )}
    </div>
  );
};

export default Textarea;

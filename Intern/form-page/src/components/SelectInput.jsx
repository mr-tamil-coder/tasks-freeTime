import React from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import './FormPage.css';

const SelectInput = ({ label, name, options, control, errors, validation, isMulti = false, placeholder }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {validation?.required && <span className="required">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            isMulti={isMulti}
            placeholder={placeholder || `Select ${label}...`}
            className={`react-select-container ${errors[name] ? 'error' : ''}`}
            classNamePrefix="react-select"
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: errors[name] ? '#ef4444' : state.isFocused ? '#f6c63b' : '#d1d5db',
                boxShadow: state.isFocused ? '0 0 0 3px rgba(246, 202, 59, 0.1)' : 'none',
                '&:hover': {
                  borderColor: errors[name] ? '#ef4444' : '#f6c63b',
                },
              }),
            }}
          />
        )}
      />
      {errors[name] && (
        <span className="error-message">{errors[name].message}</span>
      )}
    </div>
  );
};

export default SelectInput;

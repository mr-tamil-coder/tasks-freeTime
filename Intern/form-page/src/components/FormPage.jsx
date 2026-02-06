import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputBox from './InputBox';
import Textarea from './Textarea';
import SelectInput from './SelectInput';
import './FormPage.css';

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  phone: yup
    .number()
    .required('Phone number is required')
    .typeError('Phone number must be a number')
    .min(10, 'Phone number must be at least 10 digits'),
  age: yup
    .number()
    .required('Age is required')
    .typeError('Age must be a number')
    .min(18, 'You must be at least 18 years old')
    .max(100, 'Age must be less than 100'),
  country: yup
    .object()
    .required('Please select a country')
    .nullable(),
  about: yup
    .string()
    .required('Please tell us about yourself')
    .min(20, 'Please write at least 20 characters'),
});

const FormPage = () => {
  const [submittedData, setSubmittedData] = useState(null);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const countryOptions = [
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'canada', label: 'Canada' },
    { value: 'australia', label: 'Australia' },
    { value: 'india', label: 'India' },
    { value: 'germany', label: 'Germany' },
  ];


  const onSubmit = (data) => {
    console.log('Form Data:', data);
    setSubmittedData(data);
  };

  const handleReset = () => {
    reset();
    setSubmittedData(null);
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-header">
          <h1>User Registration Form</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-row">
            <InputBox
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              register={register}
              errors={errors}
            />

            <InputBox
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              register={register}
              errors={errors}
            />
          </div>

          <InputBox
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            register={register}
            errors={errors}
          />

          <div className="form-row">
            <InputBox
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              register={register}
              errors={errors}
            />

            <InputBox
              label="Age"
              name="age"
              type="number"
              placeholder="Enter your age"
              register={register}
              errors={errors}
            />
          </div>

          <SelectInput
            label="Country"
            name="country"
            options={countryOptions}
            control={control}
            errors={errors}
            placeholder="Select your country"
          />

          <Textarea
            label="About Yourself"
            name="about"
            placeholder="Tell us about yourself..."
            rows={5}
            register={register}
            errors={errors}
          />

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Submit Form
            </button>
            <button type="button" onClick={handleReset} className="btn btn-secondary">
              Reset Form
            </button>
          </div>
        </form>

        {submittedData && (
          <div className="submitted-data">
            <h2>Submitted Form Data</h2>
            <div className="data-grid">
              <div className="data-item">
                <span className="data-label">First Name:</span>
                <span className="data-value">{submittedData.firstName}</span>
              </div>
              <div className="data-item">
                <span className="data-label">Last Name:</span>
                <span className="data-value">{submittedData.lastName}</span>
              </div>
              <div className="data-item">
                <span className="data-label">Email:</span>
                <span className="data-value">{submittedData.email}</span>
              </div>
              <div className="data-item">
                <span className="data-label">Phone:</span>
                <span className="data-value">{submittedData.phone}</span>
              </div>
              <div className="data-item">
                <span className="data-label">Age:</span>
                <span className="data-value">{submittedData.age}</span>
              </div>
              <div className="data-item">
                <span className="data-label">Country:</span>
                <span className="data-value">{submittedData.country?.label}</span>
              </div>
              <div className="data-item">
                <span className="data-label">Skills:</span>
                <span className="data-value">
                  {submittedData.skills?.map(skill => skill.label).join(', ')}
                </span>
              </div>
              <div className="data-item">
                <span className="data-label">Experience:</span>
                <span className="data-value">{submittedData.experience?.label}</span>
              </div>
              <div className="data-item full-width">
                <span className="data-label">About:</span>
                <span className="data-value">{submittedData.about}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormPage;

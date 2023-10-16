import { useState, useCallback } from 'react';

const useForm = () => {
  const [enteredValues, setEnteredValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    if (isSubmitting) {
      return;
    }

    const name = event.target.name;
    const value = event.target.value;

    setEnteredValues({
      ...enteredValues,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    });

    setIsFormValid(event.target.closest('#form').checkValidity());
  };

  const submitForm = () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setEnteredValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setEnteredValues, setErrors, setIsFormValid],
  );

  return {
    enteredValues,
    errors,
    handleChange,
    isFormValid,
    isSubmitting,
    submitForm,
    resetForm,
  };
};

export default useForm;

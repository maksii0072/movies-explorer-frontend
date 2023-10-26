import { useState, useCallback } from 'react';

function useValidation () {
  const [inputValue, setInputValue] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    setInputValue({ ...inputValue, [evt.target.name]: evt.target.value});
    setErrors({ ...errors, [evt.target.name]: evt.target.validationMessage});
    setIsValid(evt.target.closest("form").checkValidity());
  };

  const resetValidation = useCallback((newValues={}, newErrors={}, newIsValid = false) => {
    setInputValue(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setInputValue, setErrors, setIsValid]);

  return {
    inputValue,
    errors,
    isValid,
    handleChange,
    resetValidation
  }
}

export default useValidation;
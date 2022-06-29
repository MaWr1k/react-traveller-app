import {useState} from 'react';

const useInput = (validateFunc) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateFunc(enteredValue);
  const hasErrors = !valueIsValid && isTouched;
  const valueInputClasses = hasErrors ? 'invalid': 'is-valid';

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  }
  const inputBlurHandler = () => {
    setIsTouched(true);
  }

  const reset = () => {
    setIsTouched(false);
    setEnteredValue('');
  }

  return {value: enteredValue, isValid: valueIsValid, hasErrors, valueInputClasses, valueChangeHandler, inputBlurHandler, reset};

};

export default useInput;
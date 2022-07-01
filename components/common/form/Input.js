import React from 'react';
import classes from './Input.module.css';

const Input = ({name, value, placeholder, onChange, onBlur, inputClasses, errorText, hasErrors}) => {
  return (
    <label htmlFor="" className={`${classes[inputClasses]} ${classes.label}`}>
      <input type="text" name={name} className={classes.input} value={value} placeholder={placeholder} onChange={onChange} onBlur={onBlur}/>
      {hasErrors && <div className={classes['error-text']}>{errorText}</div>}
    </label>
  );
};

export default Input;
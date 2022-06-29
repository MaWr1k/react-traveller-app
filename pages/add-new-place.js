import React, {Fragment} from 'react';
import Input from "../components/common/form/Input";
import useInput from "../hooks/use-input";

const AddNewPlace = () => {

  const {
    value: titleValue,
    isValid: titleIsValid,
    hasErrors: titleHasErrors,
    valueInputClasses: titleInputClasses,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: titleReset
  } = useInput(value=>value.length>3);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log('send form');
  }
  return (
    <Fragment>
      <h1>Add new place</h1>
      <form action="" onSubmit={formSubmitHandler}>
        <Input name='title' placeholder='Place title' value={titleValue} onChange={titleChangeHandler} onBlur={titleBlurHandler} inputClasses={titleInputClasses} errorText='error text' hasErrors={titleHasErrors} />
        <button>Add new place</button>
      </form>

    </Fragment>
  );
};

export default AddNewPlace;
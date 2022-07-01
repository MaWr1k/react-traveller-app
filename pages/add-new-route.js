import React, {Fragment} from 'react';
import Input from "../components/common/form/Input";
import useInput from "../hooks/use-input";

const AddNewRoute = () => {

  const title = useInput(value => value.length > 3);


  const formHandler = (e) => {
    e.preventDefault();
    console.log(e);

    title.reset();
  }

  let formIsCorrect = false;
  if(title.isValid){
    formIsCorrect = true;
  }
  return (
    <Fragment>
      <h1>Add new route</h1>

      <form onSubmit={formHandler}>
        <Input
          name='route-title'
          placeholder='Title of the route'
          value={title.value}
          inputClasses={title.valueInputClasses}
          errorText='Fill the title'
          hasErrors={title.hasErrors}
          onChange={title.valueChangeHandler}
          onBlur={title.inputBlurHandler} />
        <button type='submit' disabled={!formIsCorrect}> Add new route </button>
      </form>
    </Fragment>
  );
};

export default AddNewRoute;
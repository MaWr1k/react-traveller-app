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
  } = useInput(value => value.length > 3);
  const {
    value: addressValue,
    isValid: addressIsValid,
    hasErrors: addressHasErrors,
    valueInputClasses: addressInputClasses,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: addressReset
  } = useInput(value => value.length > 5);
  const {
    value: imageValue,
    isValid: imageIsValid,
    hasErrors: imageHasErrors,
    valueInputClasses: imageInputClasses,
    valueChangeHandler: imageChangeHandler,
    inputBlurHandler: imageBlurHandler,
    reset: imageReset
  } = useInput(value => value.length > 5);
  const {
    value: descValue,
    isValid: descIsValid,
    hasErrors: descHasErrors,
    valueInputClasses: descInputClasses,
    valueChangeHandler: descChangeHandler,
    inputBlurHandler: descBlurHandler,
    reset: descReset
  } = useInput(value => value.length > 20);

  let formIsValid = false;
  if(titleIsValid && addressIsValid && imageIsValid && descIsValid){
    formIsValid = true;
  }

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const data = {
      title: titleValue,
      address: addressValue,
      image: imageValue,
      desc: descValue,
    };
    const response = await fetch('/api/add-new-place',{
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type':'application/json',
      }
    });

    const responseData = await response.json();

    console.log(responseData);

    if(formIsValid){
      titleReset();
      addressReset();
      imageReset();
      descReset();
    }
  }
  return (
    <Fragment>
      <h1>Add new place</h1>
      <form action="" onSubmit={formSubmitHandler}>
        <Input name='title'
               placeholder='Place title'
               value={titleValue}
               onChange={titleChangeHandler}
               onBlur={titleBlurHandler}
               inputClasses={titleInputClasses}
               errorText='Title have to be more than 3 characters'
               hasErrors={titleHasErrors}/>
        <Input name='address'
               placeholder='Place address'
               value={addressValue}
               onChange={addressChangeHandler}
               onBlur={addressBlurHandler}
               inputClasses={addressInputClasses}
               errorText='Address have to be more than 5 characters'
               hasErrors={addressHasErrors}/>
        <Input name='image'
               placeholder='Place image'
               value={imageValue}
               onChange={imageChangeHandler}
               onBlur={imageBlurHandler}
               inputClasses={imageInputClasses}
               errorText='Image have to be more than 5 characters'
               hasErrors={imageHasErrors}/>
        <Input name='desc'
               placeholder='Place description'
               value={descValue}
               onChange={descChangeHandler}
               onBlur={descBlurHandler}
               inputClasses={descInputClasses}
               errorText='Description have to be more than 20 characters'
               hasErrors={descHasErrors}/>
        <button disabled={!formIsValid}>Add new place</button>
      </form>

    </Fragment>
  );
};

export default AddNewPlace;
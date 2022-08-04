import React, {Fragment, useState} from 'react';

import Input from "../components/common/form/Input";
import useInput from "../hooks/use-input";
import Meta from "../components/common/SEO/Meta";

const AddNewPlace = () => {
  const title = useInput(value => value.length > 3);
  const address = useInput(value => value.length > 5);
  const image = useInput(value => value.length > 5);
  const desc = useInput(value => value.length > 20);

  const [isSending, setIsSending] = useState(false);
  const [isSendSuccess, setIsSendSuccess] = useState(false);


  let formIsValid = false;
  if(title.isValid && address.isValid && image.isValid && desc.isValid){
    formIsValid = true;
  }


  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const data = {
      title: title.value,
      address: address.value,
      image: image.value,
      desc: desc.value,
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
      title.reset();
      address.reset();
      image.reset();
      desc.reset();
      setIsSending(false);
      setIsSendSuccess(true);
    }
  }
  let formContent = '';


  if(!isSending){
    formContent = <form action="" onSubmit={formSubmitHandler}>
      <Input name='title'
             placeholder='Place title'
             value={title.value}
             onChange={title.valueChangeHandler}
             onBlur={title.inputBlurHandler}
             inputClasses={title.valueInputClasses}
             errorText='Title have to be more than 3 characters'
             hasErrors={title.hasErrors}/>
      <Input name='address'
             placeholder='Place address'
             value={address.value}
             onChange={address.valueChangeHandler}
             onBlur={address.inputBlurHandler}
             inputClasses={address.valueInputClasses}
             errorText='Address have to be more than 5 characters'
             hasErrors={address.hasErrors}/>
      <Input name='image'
             placeholder='Place image'
             value={image.value}
             onChange={image.valueChangeHandler}
             onBlur={image.inputBlurHandler}
             inputClasses={image.valueInputClasses}
             errorText='Image have to be more than 5 characters'
             hasErrors={image.hasErrors}/>
      <Input name='desc'
             placeholder='Place description'
             value={desc.value}
             onChange={desc.valueChangeHandler}
             onBlur={desc.inputBlurHandler}
             inputClasses={desc.valueInputClasses}
             errorText='Description have to be more than 20 characters'
             hasErrors={desc.hasErrors}/>
      <button disabled={!formIsValid}>Add new place</button>
    </form>
  }
  if(isSending){
    formContent = <p>Sending... </p>
  }
  if(isSendSuccess && !isSending){
    formContent = <p>Place added successfully!</p>
  }
  return (
    <Fragment>
      <Meta title='Add new place | App for travellers'/>
      <h1>Add new place</h1>
      {formContent}
    </Fragment>
  );
};

export default AddNewPlace;
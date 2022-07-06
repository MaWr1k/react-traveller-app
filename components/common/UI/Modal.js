import React from 'react';

import classes from './Modal.module.css';

const Modal = ({onClose}) => {
  return (
    <div className={classes['modal-container']} onClick={onClose}>
      <div className={classes['modal-body']} onClick={(e)=>{e.stopPropagation()}}>
        Modal Text
      </div>
    </div>
  );
};

export default Modal;
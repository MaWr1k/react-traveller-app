import React from 'react';

import classes from './Modal.module.css';

const Modal = () => {
  return (
    <div className={classes['modal-container']}>
      <div className={classes['modal-body']}>
        Modal Text
      </div>
    </div>
  );
};

export default Modal;
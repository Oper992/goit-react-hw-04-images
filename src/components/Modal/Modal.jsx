import { useEffect } from 'react';
import style from './Modal.module.css';
import PropTypes from 'prop-types';

export function Modal({ closeModal, closeEsc, largeImageURL }) {
  useEffect(() => {
    window.addEventListener('keydown', closeEsc);
    return () => window.removeEventListener('keydown', closeEsc);
  }, [closeEsc]);

  return (
    <div className={style.Overlay} onClick={closeModal}>
      <div className={style.Modal}>
        <img src={largeImageURL} alt="" width="1000px"></img>
      </div>
    </div>
  );
}

Modal.propTypes = {
  closeEsc: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

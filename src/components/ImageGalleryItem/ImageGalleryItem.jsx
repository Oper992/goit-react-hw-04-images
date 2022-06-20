import { useState } from 'react';
import style from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ webformatURL, largeImageURL }) {
  const [isModal, setIsModal] = useState(false);

  const closeModal = e => {
    if (e.target.nodeName === 'DIV') {
      setIsModal(false);
    }
  };

  const closeEsc = e => {
    if (e.key === 'Escape') {
      setIsModal(false);
    }
  };

  return (
    <>
      <li className={style.ImageGalleryItem} onClick={() => setIsModal(true)}>
        <img
          className={style['ImageGalleryItem-image']}
          src={webformatURL}
          alt=""
        />
      </li>
      {isModal && (
        <Modal
          largeImageURL={largeImageURL}
          closeModal={closeModal}
          closeEsc={closeEsc}
        />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

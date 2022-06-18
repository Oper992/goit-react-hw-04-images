import { Component } from 'react';
import style from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  state = {
    isModal: false,
  };

  openModal = e => {
    const modalRef = e.target;

    this.setState({ isModal: true });
    window.addEventListener('keydown', modalRef);
  };

  closeModal = e => {
    if (e.target.nodeName === 'DIV') {
      this.setState({ isModal: false });
    }
  };

  closeEsc = e => {
    if (e.key === 'Escape') {
      this.setState({ isModal: false });
    }
  };

  render() {
    const { webformatURL, largeImageURL } = this.props;

    return (
      <>
        <li className={style.ImageGalleryItem} onClick={this.openModal}>
          <img
            className={style['ImageGalleryItem-image']}
            src={webformatURL}
            alt=""
          />
        </li>
        {this.state.isModal && (
          <Modal
            largeImageURL={largeImageURL}
            closeModal={this.closeModal}
            closeEsc={this.closeEsc}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

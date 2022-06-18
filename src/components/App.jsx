import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { searchImages, loadMoreImages } from '../service/api';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Puff } from 'react-loader-spinner';

const loaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '30px',
};

export class App extends Component {
  state = {
    search: '',
    images: [],
    totalImages: 0,
    page: 1,
    isLoader: false,
    isModal: false,
  };

  onSubmit = e => {
    e.preventDefault();

    this.setState({ search: e.target.elements[1].value, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
        isLoader: true,
      };
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (prevState.page !== this.state.page) {
      const newImagesArray = await loadMoreImages(search, page);
      const newArrayWithDesiredProperties = newImagesArray.hits.map(
        ({ id, webformatURL, largeImageURL }) => {
          return {
            id: id,
            webformatURL: webformatURL,
            largeImageURL: largeImageURL,
          };
        }
      );

      this.setState(({ images }) => {
        return {
          images: [...images, ...newArrayWithDesiredProperties],
          isLoader: false,
        };
      });
    }

    if (prevState.images !== this.state.images) {
      window.scrollBy({
        top: document.body.clientHeight,
        behavior: 'smooth',
      });
    }

    if (prevState.search !== search) {
      this.setState({ isLoader: true });

      const imagesArray = await searchImages(search);
      const arrayWithDesiredProperties = imagesArray.hits.map(
        ({ id, webformatURL, largeImageURL }) => {
          return {
            id: id,
            webformatURL: webformatURL,
            largeImageURL: largeImageURL,
          };
        }
      );

      this.setState({
        images: arrayWithDesiredProperties,
        isLoader: false,
        totalImages: imagesArray.total,
      });
    }
  }

  render() {
    const { images, isLoader, totalImages } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length !== 0 && <ImageGallery images={images} />}
        {isLoader && (
          <div style={{ ...loaderStyle }}>
            <Puff color="#00BFFF" height={80} width={80} />
          </div>
        )}
        {images.length !== 0 && images.length !== totalImages && (
          <Button onClick={this.handleLoadMore} />
        )}
      </>
    );
  }
}

import { useState, useEffect } from 'react';
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

export function App() {
  const { search, setSearch } = useState('');
  const { images, setImages } = useState([]);
  const { totalImages, setTotalImages } = useState(0);
  const { page, setPage } = useState(1);
  const { isLoader, setIsLoader } = useState(false);

  const onSubmit = e => {
    e.preventDefault();

    setSearch(e.target.elements[1].value);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => {
      return prevPage + 1;
    });

    setIsLoader(true);

    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const addToImagesNextPage = async () => {
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

      setImages(prevImages => {
        return [...prevImages, ...newArrayWithDesiredProperties];
      });
    };

    addToImagesNextPage();

    setIsLoader(false);
  }, [page, search, setImages, setIsLoader]);

  useEffect(() => {
    setIsLoader(true);

    const addToStateImagesForSearch = async () => {
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
      setTotalImages(imagesArray.total);
      setImages(arrayWithDesiredProperties);
    };

    addToStateImagesForSearch();

    setIsLoader(false);
  }, [search, setImages, setIsLoader, setTotalImages]);

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {images.length !== 0 && <ImageGallery images={images} />}
      {isLoader && (
        <div style={{ ...loaderStyle }}>
          <Puff color="#00BFFF" height={80} width={80} />
        </div>
      )}
      {images.length !== 0 && images.length !== totalImages && (
        <Button onClick={handleLoadMore} />
      )}
    </>
  );
}

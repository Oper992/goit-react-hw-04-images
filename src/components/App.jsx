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
};

export function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState('idle');

  const onSubmit = e => {
    e.preventDefault();

    setSearch(e.target.elements[1].value);
    setPage(1);
    setStatus('pending');
  };

  const handleLoadMore = () => {
    setPage(prevPage => {
      return prevPage + 1;
    });
    setStatus('pending');
  };

  useEffect(() => {
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

      setTotalImages(imagesArray.totalHits);
      setImages(arrayWithDesiredProperties);
      setStatus('resolved');
    };

    if (search !== '') {
      addToStateImagesForSearch();

      console.log('сработал юз ефект поиск');
    }
  }, [search]);

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

      setImages(prevImages => [
        ...prevImages,
        ...newArrayWithDesiredProperties,
      ]);
      setStatus('resolved');
    };

    if (page > 1) {
      addToImagesNextPage();

      window.scrollBy({
        top: document.body.clientHeight,
        behavior: 'smooth',
      });

      console.log('сработал юз ефект загрузить еще');
    }
  }, [page, search]);

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {status === 'pending' && (
        <div style={{ ...loaderStyle }}>
          <Puff color="#00BFFF" height={80} width={80} />
        </div>
      )}
      {images.length > 0 && <ImageGallery images={images} />}
      {status === 'idle' && (
        <p style={{ textAlign: 'center', marginTop: '100px' }}>
          Тут може бути ваша реклама)
        </p>
      )}
      {status === 'pending' && images.length > 0 && (
        <div style={{ ...loaderStyle }}>
          <Puff color="#00BFFF" height={80} width={80} />
        </div>
      )}
      {status === 'resolved' && images.length !== totalImages && (
        <Button onClick={handleLoadMore} />
      )}
    </>
  );
}

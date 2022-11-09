import ErrorComponent from 'components/ErrorComponent';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';
import { Component, useState, useEffect } from 'react';
import { api } from 'services/api';
import { ERROR, WARNING } from 'utils/notification';
import scrollAnimationAfterRender from 'utils/scrollAfterRender';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const onSubmitSearch = newQuery => {
    if (newQuery === '') {
      setImages([]);
      setError(ERROR.EMPTY_SEARCH);
      return;
    }

    setImages([]);
    setQuery(newQuery);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onImageClick = imageData => {
    setModalImage(imageData);
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setLoading(true);

    api(query, page)
      .then(newImages => {
        if (newImages.length === 0) {
          throw new Error(ERROR.NOT_FOUND);
        }

        setError(null);
        setImages(prevImages => [...prevImages, ...newImages]);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  useEffect(() => {
    scrollAnimationAfterRender();
  });

  //==============================

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmitSearch} loading={loading} />

      {!query ? (
        <ErrorComponent title={WARNING.NOTHING_YET} text={error} />
      ) : (
        <ImageGallery
          images={images}
          onLoadMore={onLoadMore}
          error={error}
          loading={loading}
          onImageClick={onImageClick}
        />
      )}

      {isModalOpen && <Modal image={modalImage} onClose={onModalClose} />}
    </div>
  );
};

export default App;

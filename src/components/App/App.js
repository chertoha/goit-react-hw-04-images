import ErrorComponent from 'components/ErrorComponent';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';
import { Component } from 'react';
import { api } from 'services/api';
import { ERROR, WARNING } from 'utils/notification';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    error: null,
    loading: false,
    modalOpen: false,
    modalImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query: nextQuery, page: nextPage } = this.state;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ loading: true });

      try {
        const newImages = await api(nextQuery, nextPage);

        if (newImages.length === 0) {
          throw new Error(ERROR.NOT_FOUND);
        }

        this.setState(({ images }) => ({
          images: [...images, ...newImages],
          error: null,
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ loading: false });
      }
    }

    this.scrollAnimationAfterRender();
  }

  onSubmitSearch = newQuery => {
    if (newQuery === '') {
      this.setState({ error: ERROR.EMPTY_SEARCH, images: [] });
      return;
    }
    this.setState({ images: [], query: newQuery, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onImageClick = imageData => {
    this.setState({ modalImage: imageData, modalOpen: true });
  };

  onModalClose = () => {
    this.setState({ modalOpen: false });
  };

  scrollAnimationAfterRender = () => {
    const gallery = document.querySelector('.ImageGallery');

    if (gallery) {
      const { height: cardHeight } =
        gallery.firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  };

  render() {
    const { query, images, error, loading, modalImage, modalOpen } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmitSearch} loading={loading} />

        {!query ? (
          <ErrorComponent title={WARNING.NOTHING_YET} text={error} />
        ) : (
          <ImageGallery
            images={images}
            onLoadMore={this.onLoadMore}
            error={error}
            loading={loading}
            onImageClick={this.onImageClick}
          />
        )}

        {modalOpen && <Modal image={modalImage} onClose={this.onModalClose} />}
      </div>
    );
  }
}

export default App;

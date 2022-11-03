import Button from 'components/Button';
import Loader from 'components/Loader';
import { api } from 'services/api';

const { default: ImageGalleryItem } = require('components/ImageGalleryItem');
const { Component } = require('react');

class ImageGallery extends Component {
  STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    REJECTED: 'rejected',
    RESOLVED: 'resolved',
  };

  state = {
    status: this.STATUS.IDLE,
    page: 1,
    images: [],
    error: null,
    loading: false,
  };

  async fetch(query, page) {
    const result = await api(query, page);
    return result.hits;
  }

  async componentDidUpdate(prevProps, prevState) {
    // if (prevProps.query !== this.props.query) {
    //   // this.setState({ page: 1, images: [] });

    //   const newImages = await this.fetch(this.props.query, 1);
    //   this.setState({ page: 1, images: newImages });
    // }

    // if (
    //   prevProps.query === this.props.query &&
    //   prevState.page !== this.state.page
    // ) {
    //   const newImages = await this.fetch(this.props.query, this.state.page);
    //   this.setState({
    //     images: [...prevState.images, ...newImages],
    //   });
    // }
    //-----------------------

    if (
      prevProps.query === this.props.query &&
      prevState.page === this.state.page
    ) {
      return;
    }

    let currentPage = 1;
    let currentImages = [];

    if (prevProps.query !== this.props.query) {
      this.setState({ page: 1 });
    }

    if (
      prevProps.query === this.props.query &&
      prevState.page !== this.state.page
    ) {
      currentPage = this.state.page;
      currentImages = prevState.images;
    }

    try {
      this.setState({ loading: true });
      const newImages = await this.fetch(this.props.query, currentPage);

      if (newImages.length === 0) {
        throw new Error(
          'Found zero images by this request! Please, try less silly request :)'
        );
      }

      this.setState({
        images: [...currentImages, ...newImages],
        error: null,
      });
    } catch (error) {
      this.setState({ error: error });
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }

    // const prevQuery = prevProps.query;
    // const prevPage = prevState.page;

    // const nextQuery = this.props.query;
    // const nextPage = this.state.page;

    // if (prevQuery === nextQuery && prevPage === nextPage) {
    //   return;
    // }

    // if (prevQuery !== nextQuery) {
    //   this.setState({ page: 1, images: [] });
    // }

    // try {
    //   this.setState({ loading: true });
    //   const result = await api(nextQuery, nextPage);
    //   const newImages = result.hits;

    //   if (newImages.length === 0) {
    //     throw new Error(
    //       'Found zero images by this request! Please, try less silly request :)'
    //     );
    //   }

    //   this.setState(prevState => ({
    //     images: [...prevState.images, ...newImages],
    //     error: null,
    //   }));
    // } catch (error) {
    //   this.setState({ error: error });
    //   // console.log('catch', error);
    // } finally {
    //   this.setState({ loading: false });
    // }
  }

  onLoadMoreClick = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    // const { items } = this.props;
    const { STATUS } = this;
    const { error, loading, images } = this.state;
    return (
      <>
        {error && (
          <div style={{ textAlign: 'center' }}>
            <h2>Sorry! Something went wrong.</h2> <p>{error.message} </p>
          </div>
        )}

        {loading && <Loader />}

        {images.length > 0 && (
          <>
            <ul className="gallery ImageGallery">
              {images.map(({ id, webformatURL: imageUrl, tags }) => (
                <li key={id} className="gallery-item ImageGalleryItem">
                  <ImageGalleryItem src={imageUrl} alt={tags} />
                </li>
              ))}
            </ul>
            <Button onClick={this.onLoadMoreClick} />
          </>
        )}
      </>
    );
  }
}

export default ImageGallery;

///Prop types~!!!!!!!!!!!

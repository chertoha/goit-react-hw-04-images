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
    if (
      prevProps.query === this.props.query &&
      prevState.page === this.state.page
    ) {
      console.log('both equal');
      return;
    }

    let currentPage = 1;
    let currentImages = [];

    if (prevProps.query !== this.props.query) {
      this.setState({ page: 1 });
      console.log('new query, page set to 1 ?:', this.state.page);
    }

    if (
      prevProps.query === this.props.query &&
      prevState.page !== this.state.page
    ) {
      currentPage = this.state.page;
      currentImages = prevState.images;
      console.log(
        `equal query: ${prevProps.query} and ${this.props.query}, new page. prevPage= ${prevState.page}, new page= ${currentPage}`
      );
    }

    console.log(`current images = `, currentImages);

    try {
      this.setState({ status: this.STATUS.PENDING });

      if (this.props.query === '') {
        throw new Error('Empty search query :(');
      }

      const newImages = await this.fetch(this.props.query, currentPage);

      if (newImages.length === 0) {
        throw new Error(
          'Found zero images by this request! Please, try less silly request :)'
        );
      }

      this.setState({
        images: [...currentImages, ...newImages],
        error: null,
        status: this.STATUS.RESOLVED,
      });
    } catch (error) {
      this.setState({ error: error, status: this.STATUS.REJECTED });
      console.log(error);
    } finally {
      // this.setState({ loading: false });
    }
  }

  onLoadMoreClick = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { STATUS } = this;
    const { error, loading, images, status } = this.state;

    console.log(`RENDER-> query ${this.props.query}, page ${this.state.page}`);

    if (status === STATUS.IDLE) {
      return <p>There are no images here yet. Search something</p>;
    }

    if (status === STATUS.PENDING) {
      return <Loader />;
    }

    if (status === STATUS.REJECTED) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h2>Sorry! Something went wrong.</h2> <p>{error.message} </p>
        </div>
      );
    }

    if (status === STATUS.RESOLVED) {
      return (
        <>
          <ul className="gallery ImageGallery">
            {images.map(({ id, webformatURL: imageUrl, tags }) => (
              <li key={imageUrl} className="gallery-item ImageGalleryItem">
                <ImageGalleryItem src={imageUrl} alt={tags} />
              </li>
            ))}
          </ul>
          <Button onClick={this.onLoadMoreClick} isLoading={loading} />
        </>
      );
    }

    // return (
    //   <>
    //     {error && (
    //       <div style={{ textAlign: 'center' }}>
    //         <h2>Sorry! Something went wrong.</h2> <p>{error.message} </p>
    //       </div>
    //     )}

    //     {loading && <Loader />}

    //     {images.length > 0 && (
    //       <>
    //         <ul className="gallery ImageGallery">
    //           {images.map(({ id, webformatURL: imageUrl, tags }) => (
    //             <li key={imageUrl} className="gallery-item ImageGalleryItem">
    //               <ImageGalleryItem src={imageUrl} alt={tags} />
    //             </li>
    //           ))}
    //         </ul>
    //         <Button onClick={this.onLoadMoreClick} isLoading={loading} />
    //       </>
    //     )}
    //   </>
    // );
  }
}

export default ImageGallery;

///Prop types~!!!!!!!!!!!

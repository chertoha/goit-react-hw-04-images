import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Searchbar from 'components/Searchbar';
import { Component } from 'react';
import { api } from 'services/api';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    error: null,
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query, page } = this.state;

    if (prevQuery === query && prevPage === page) {
      return;
    }

    try {
      this.setState({ loading: true });
      const result = await api(query, page);
      const newImages = result.hits;

      if (newImages.length === 0) {
        throw new Error(
          'Found zero images by this request! Please, try less silly request :)'
        );
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        error: null,
      }));
    } catch (error) {
      this.setState({ error: error });
      // console.log('catch', error);
    } finally {
      this.setState({ loading: false });
    }
  }

  onSubmit = ({ query }) => {
    this.setState({ query: query.trim(), page: 1, images: [] });
  };

  onLoadMoreClick = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { images, error, loading } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        {error && (
          <div style={{ textAlign: 'center' }}>
            <h2>Sorry! Something went wrong.</h2> <p>{error.message} </p>
          </div>
        )}
        {loading && <Loader />}
        {images.length > 0 && (
          <>
            <ImageGallery items={images} />
            <Button onClick={this.onLoadMoreClick} />
          </>
        )}

        {/* <Modal /> */}
      </div>
    );
  }
}

export default App;

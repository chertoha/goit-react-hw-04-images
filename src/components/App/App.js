import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Searchbar from 'components/Searchbar';
import { Component } from 'react';
import { api } from 'services/api';

class App extends Component {
  state = {
    query: '',
  };

  onSubmit = query => {
    this.setState({ query: query });
  };

  render() {
    const { images, error, loading, status } = this.state;

    // return (
    //   <div className="App">
    //     <Searchbar onSubmit={this.onSubmit} isSubmitting={loading} />
    //     {error && (
    //       <div style={{ textAlign: 'center' }}>
    //         <h2>Sorry! Something went wrong.</h2> <p>{error.message} </p>
    //       </div>
    //     )}
    //     {loading && <Loader />}
    //     {images.length > 0 && (
    //       <>
    //         <ImageGallery items={images} />
    //         <Button onClick={this.onLoadMoreClick} />
    //       </>
    //     )}

    //     {/* <Modal /> */}
    //   </div>
    // );

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />

        <ImageGallery query={this.state.query} />

        {/* <Modal /> */}
      </div>
    );
  }
}

export default App;

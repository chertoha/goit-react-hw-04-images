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

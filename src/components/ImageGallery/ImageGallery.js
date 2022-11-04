import Button from 'components/Button';
import Loader from 'components/Loader';
import { api } from 'services/api';

const { default: ImageGalleryItem } = require('components/ImageGalleryItem');
const { Component } = require('react');

class ImageGallery extends Component {
  // STATUS = {
  //   IDLE: 'idle',
  //   PENDING: 'pending',
  //   REJECTED: 'rejected',
  //   RESOLVED: 'resolved',
  // };

  // state = {
  //   status: this.STATUS.IDLE,
  //   page: 1,
  //   images: [],
  //   error: null,
  //   loading: false,
  // };

  async fetchImages(query, page) {
    const result = await api(query, page);
    return result.hits;
  }

  // async componentDidUpdate(prevProps, prevState) {
  //   // console.log('didUpdate');

  //   // console.log('prevProps', prevProps);
  //   // console.log('this.props', this.props);

  //   // console.log('prevState', prevState);
  //   // console.log('this.state', this.state);

  //   if (
  //     prevProps.query !== this.props.query &&
  //     prevState.page !== this.state.page
  //   ) {
  //      this.setState({ status: this.STATUS.PENDING });

  //     if (prevProps.query !== this.props.query) {
  //       this.fetchImages(this.props.query, 1).then(newImages => {
  //             this.setState({
  //               images: newImages,
  //               page: 1,
  //               error: null,
  //               status: this.STATUS.RESOLVED,
  //             });
  //       })
  //     }

  //   }

  //   // if (prevProps.query !== this.props.query) {
  //   //   // this.setState({ page: 1 });
  //   //   // console.log('new query, page set to 1 ?:', this.state.page);
  //   //   try {
  //   //     // this.setState({ status: this.STATUS.PENDING });
  //   //     // if (this.props.query === '') {
  //   //     //   throw new Error('Empty search query :(');
  //   //     // }
  //   //     const newImages = await this.fetchImages(this.props.query, 1);

  //   //     // if (newImages.length === 0) {
  //   //     //   throw new Error(
  //   //     //     'Found zero images by this request! Please, try less silly request :)'
  //   //     //   );
  //   //     // }
  //   //     // console.log('fetch images new query', newImages);
  //   //     this.setState({
  //   //       images: newImages,
  //   //       page: 1,
  //   //       error: null,
  //   //       status: this.STATUS.RESOLVED,
  //   //     });
  //   //   } catch (error) {
  //   //     this.setState({ error: error, status: this.STATUS.REJECTED });
  //   //     console.log(error);
  //   //   }
  //   // }

  //   if (
  //     prevProps.query === this.props.query &&
  //     prevState.page !== this.state.page
  //   ) {
  //     // currentPage = this.state.page;
  //     // currentImages = prevState.images;
  //     // console.log(
  //     //   `equal query: ${prevProps.query} and ${this.props.query}, new page. prevPage= ${prevState.page}, new page= ${currentPage}`
  //     // );
  //     try {
  //       // this.setState({ status: this.STATUS.PENDING });
  //       // if (this.props.query === '') {
  //       //   throw new Error('Empty search query :(');
  //       // }
  //       const newImages = await this.fetchImages(
  //         this.props.query,
  //         this.state.page
  //       );

  //       // if (newImages.length === 0) {
  //       //   throw new Error(
  //       //     'Found zero images by this request! Please, try less silly request :)'
  //       //   );
  //       // }
  //       // console.log('fetch images same query', newImages);
  //       this.setState(({ images }) => {
  //         console.log(images);
  //         console.log(newImages);
  //         return {
  //           images: [...images, ...newImages],
  //           error: null,
  //           status: this.STATUS.RESOLVED,
  //         };
  //       });
  //     } catch (error) {
  //       this.setState({ error: error, status: this.STATUS.REJECTED });
  //       console.log(error);
  //     }
  //   }

  //   // let currentPage = 1;
  //   // let currentImages = [];

  //   // if (prevProps.query !== this.props.query) {
  //   //   this.setState({ page: 1 });
  //   //   console.log('new query, page set to 1 ?:', this.state.page);
  //   // }

  //   // if (
  //   //   prevProps.query === this.props.query &&
  //   //   prevState.page !== this.state.page
  //   // ) {
  //   //   currentPage = this.state.page;
  //   //   currentImages = prevState.images;
  //   //   console.log(
  //   //     `equal query: ${prevProps.query} and ${this.props.query}, new page. prevPage= ${prevState.page}, new page= ${currentPage}`
  //   //   );
  //   // }

  //   // console.log(`current images = `, currentImages);

  //   // try {
  //   //   this.setState({ status: this.STATUS.PENDING });

  //   //   if (this.props.query === '') {
  //   //     throw new Error('Empty search query :(');
  //   //   }

  //   //   const newImages = await this.fetch(this.props.query, currentPage);

  //   //   if (newImages.length === 0) {
  //   //     throw new Error(
  //   //       'Found zero images by this request! Please, try less silly request :)'
  //   //     );
  //   //   }

  //   //   this.setState({
  //   //     images: [...currentImages, ...newImages],
  //   //     error: null,
  //   //     status: this.STATUS.RESOLVED,
  //   //   });
  //   // } catch (error) {
  //   //   this.setState({ error: error, status: this.STATUS.REJECTED });
  //   //   console.log(error);
  //   // } finally {
  //   //   // this.setState({ loading: false });
  //   // }
  // }

  onLoadMoreClick = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    // const { STATUS } = this;
    // const { error, loading, images, status } = this.state;
    // console.log('render');
    // console.log(`RENDER-> query ${this.props.query}, page ${this.state.page}`);
    // console.log(`RENDER-> images`, images);
    // if (status === STATUS.IDLE) {
    //   return <p>There are no images here yet. Search something</p>;
    // }
    // if (status === STATUS.PENDING) {
    //   return <Loader />;
    // }
    // if (status === STATUS.REJECTED) {
    //   return (
    //     <div style={{ textAlign: 'center' }}>
    //       <h2>Sorry! Something went wrong.</h2> <p>{error.message} </p>
    //     </div>
    //   );
    // }
    // if (status === STATUS.RESOLVED) {
    //   return (
    //     <>
    //       <ul className="gallery ImageGallery">
    //         {images.map(({ id, webformatURL: imageUrl, tags }) => (
    //           <li key={imageUrl} className="gallery-item ImageGalleryItem">
    //             <ImageGalleryItem src={imageUrl} alt={tags} />
    //           </li>
    //         ))}
    //       </ul>
    //       <Button onClick={this.onLoadMoreClick} isLoading={loading} />
    //     </>
    //   );
    // }
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

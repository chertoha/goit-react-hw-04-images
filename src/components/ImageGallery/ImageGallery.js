const { default: ImageGalleryItem } = require('components/ImageGalleryItem');
const { Component } = require('react');

class ImageGallery extends Component {
  state = {};

  render() {
    const { items } = this.props;

    return (
      <ul className="gallery ImageGallery">
        {items.map(({ id, webformatURL: imageUrl, tags }) => (
          <li key={id} className="gallery-item ImageGalleryItem">
            <ImageGalleryItem src={imageUrl} alt={tags} />
          </li>
        ))}
      </ul>
    );
  }
}

export default ImageGallery;

///Prop types~!!!!!!!!!!!

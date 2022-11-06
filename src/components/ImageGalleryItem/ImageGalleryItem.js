import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt, onClick = null }) => {
  return (
    <img
      className="ImageGalleryItem-image"
      src={src}
      alt={alt}
      onClick={onClick}
    />
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;

import PropTypes from 'prop-types';
import Button from 'components/Button';
import ErrorComponent from 'components/ErrorComponent';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import { ERROR } from 'utils/notification';

const ImageGallery = ({
  images,
  onLoadMore,
  error,
  loading = false,
  onImageClick = null,
}) => {
  return (
    <>
      {error && <ErrorComponent title={ERROR.WRONG} text={error} />}

      {images.length > 0 && (
        <>
          <ul className="gallery ImageGallery">
            {images.map(({ webformatURL: imageUrl, largeImageURL, tags }) => (
              <li key={imageUrl} className="gallery-item ImageGalleryItem">
                <ImageGalleryItem
                  src={imageUrl}
                  alt={tags}
                  onClick={() =>
                    onImageClick &&
                    onImageClick({ src: largeImageURL, alt: tags })
                  }
                />
              </li>
            ))}
          </ul>

          <Button onClick={onLoadMore} isLoading={loading} />
        </>
      )}
      {loading && <Loader />}
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLoadMore: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
  onImageClick: PropTypes.func,
};

export default ImageGallery;

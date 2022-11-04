import Button from 'components/Button';
import ErrorComponent from 'components/ErrorComponent';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import { ERROR } from 'utils/notification';

const ImageGallery = ({ images, onLoadMore, error, loading }) => {
  return (
    <>
      {loading && <Loader />}

      {error && <ErrorComponent title={ERROR.WRONG} text={error} />}

      {images.length > 0 && (
        <>
          <ul className="gallery ImageGallery">
            {images.map(({ id, webformatURL: imageUrl, tags }) => (
              <li key={imageUrl} className="gallery-item ImageGalleryItem">
                <ImageGalleryItem src={imageUrl} alt={tags} />
              </li>
            ))}
          </ul>
          <Button onClick={onLoadMore} isLoading={loading} />
        </>
      )}
    </>
  );
};

export default ImageGallery;

///Prop types~!!!!!!!!!!!

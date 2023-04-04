import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types';

const ImageGallery = ({ images, handleImageClick }) => {
    return(
        <ul className="image-gallery" onClick={handleImageClick}>
            {images.map(image => (
                <ImageGalleryItem
                    key={image.id}
                    id={image.id}
                    src={image.webformatURL}
                    alt={image.tags}
                />
            ))}
        </ul>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.array,
    pages: PropTypes.number,
    handleImageClick: PropTypes.func
}

export default ImageGallery;
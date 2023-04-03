import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt, id }) => {
    return(
        <li className="image-galleryItem">
            <img className="image-galleryItem-image" src={src} alt={alt} id={id} />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    id: PropTypes.number
}

export default ImageGalleryItem
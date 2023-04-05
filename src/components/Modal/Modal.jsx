import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ handleOverlayClick, handleEsc, src, alt }) => {
    useEffect(() => {
        document.addEventListener('keydown', handleEsc);
        const overlay = document.querySelector('.overlay');

        overlay.addEventListener('click', handleOverlayClick)
    }, [handleOverlayClick, handleEsc])

    return(
        <div className="overlay">
            <div className="modal">
                 <img src={src} alt={alt} />
            </div>
        </div>
    )
}

Modal.propTypes = {
    handleEsc: PropTypes.func,
    handleOverlayClick: PropTypes.func,
    src: PropTypes.string,
    alt: PropTypes.string
}

export default Modal
import { Component } from "react";
import PropTypes from 'prop-types';

class Modal extends Component {
    componentDidMount() {
        document.addEventListener('keydown', this.props.handleEsc);
        const overlay = document.querySelector('.overlay');

        overlay.addEventListener('click', this.props.handleOverlayClick)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.props.handleEsc);
        const overlay = document.querySelector('.overlay');

        overlay.removeEventListener('click', this.props.handleOverlayClick);
    }

    render(){
        return(
            <div className="overlay">
                <div className="modal">
                    <img src={this.props.src} alt={this.props.alt} />
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    handleEsc: PropTypes.func,
    handleOverlayClick: PropTypes.func
}

export default Modal
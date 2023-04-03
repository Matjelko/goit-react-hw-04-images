import { Component } from "react";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Modal from "components/Modal/Modal";
import Button from "components/Button/Button";
import PropTypes from 'prop-types';

const KEY = '33302890-ea105e46da5a591cb4b446b85'
class App extends Component {
  state = {
    images: [],
    searchText: '',
    pages: 0,
    isLoading: false,
    isModalShown: false,
    modalImageSource: '',
    modalAlt: '',
    
  }

  fetchImages = async url => {
    const images = await fetch(url);
    const imagesJson = await images.json();
    return imagesJson.hits;
  }

  handleSubmit = async event => {
    event.preventDefault();
    Loading.standard({ svgColor: '#3f51b5' });

    const page = 1;
    const input = event.target[1]['value'];
    const URL = `https://pixabay.com/api/?q=${input}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`

    const images = await this.fetchImages(URL);

    this.setState({
      images: images,
      searchText: input,
      pages: page
    })
  }

  handleLoadMore = async () => {
    Loading.standard({ svgColor: '#3f51b5' });
    const prevImages = this.state.images;
    const page = this.state.pages + 1;
    const input = this.state.searchText;

    const URL = `https://pixabay.com/api/?q=${input}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    const newImages = await this.fetchImages(URL);

    this.setState({
      images: [...prevImages, ...newImages],
      pages: page
    })
  }

  componentDidUpdate(){
    Loading.remove();
  }

  handleImageClick = event => {
    const id = event.target.id;

    const imageObject = this.state.images.find(
      element => element.id === Number(id)
    );

    this.setState({
      isModalShown: true,
      modalImageSource: imageObject.largeImageURL
    })
  }

  handleEsc = event => {
    if (event.key === 'Escape') {
      this.setState({
        isModalShown: false
      })
    }
  }

  handleOverlayClick = event => {
    if (event.target.classList.contains('overlay')){
      this.setState({
        isModalShown: false
      })
    }
  }

  render(){
    const { images, isModalShown, modalImageSource, modalAlt } = this.state;
    const isGalleryItemsShown = images['length'] === 0 ? false : true;

    return(
      <>
        {isModalShown ? (
          <Modal
            src={modalImageSource}
            alt={modalAlt}
            handleOverlayClick={this.handleOverlayClick}
            handleEsc={this.handleEsc} 
          />
        ) : (
          <></>
        )}

        <Searchbar handleSubmit={this.handleSubmit}/>

        <ImageGallery 
          images={images}
          handleImageClick={this.handleImageClick}
        />

        {isGalleryItemsShown ? (
          <div
            style={{
              width: '100%',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              marginBottom: 40
            }}
          >
          <Button handleLoadMore={this.handleLoadMore}/>
          </div>
        ) : (
          <></>
        )}
        
      </>
    )
  }
}

App.propTypes = {
  images: PropTypes.array,
  searchText: PropTypes.string,
  pages: PropTypes.number,
  isLoading: PropTypes.bool,
  isModalShown: PropTypes.bool,
  modalImageSource: PropTypes.string,
  modalAlt: PropTypes.string,
  fetchImages: PropTypes.func,
  handleImageClick: PropTypes.func
}

export default App;

// import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Modal from "components/Modal/Modal";
import Button from "components/Button/Button";
import { useState } from 'react';
// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

const KEY = '33302890-ea105e46da5a591cb4b446b85'

const App = ({ modalAlt }) => {
  const [ images, setImages ] = useState([])
  const [ searchText, setSearchText ] = useState('')
  const [ pages, setPages ] = useState(0)
  const [ isModalShown, setIsModalShown] = useState(false)
  const [ modalImageSource, setModalImageSource ] = useState('')

  // useEffect(() => {
  //   Loading.remove();
  // }, [])

  const fetchImages = async url => {
    const images = await fetch(url);
    const imagesJson = await images.json();
    return imagesJson.hits;
  }

  const handleSubmit = async event => {
    event.preventDefault();
    // Loading.standard({ svgColor: '#3f51b5' })

    const page = 1;
    const input = event.target[1]['value'];
    const URL = `https://pixabay.com/api/?q=${input}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    
    const images = await fetchImages(URL);

    setImages(images)
    setSearchText(input)
    setPages(page)
  }

  const handleLoadMore = async () => {
    // Loading.standard({ svgColor: '#3f51b5' });
    const prevImages = images;
    const page = pages + 1;
    const input = searchText;

    const URL = `https://pixabay.com/api/?q=${input}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    const newImages = await fetchImages(URL);

    setImages([...prevImages, ...newImages]);
    setImages(page);
  }

  const handleImageClick = event => {
    const id = event.target.id;

    const imageObject = images.find(
      element => element.id === Number(id)
    );

    setIsModalShown(true)
    setModalImageSource(imageObject.largeImageURL)
  }

  const handleEsc = event => {
    if(event.key === 'Escape') {
      setIsModalShown(false)
    }
  }

  const handleOverlayClick = event => {
    if (event.target.classList.contains('overlay')){
      setIsModalShown(false)
    }
  }

  const isGalleryItemsShown = images['length'] === 0 ? false : true;

  return(
    <>
      {isModalShown ? (
        <Modal
          src={modalImageSource}
          alt={modalAlt}
          handleOverlayClick={handleOverlayClick}
          handleEsc={handleEsc} 
        />
      ) : (
        <></>
      )}

      <Searchbar handleSubmit={handleSubmit}/>

      <ImageGallery 
        images={images}
        handleImageClick={handleImageClick}
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
        <Button handleLoadMore={handleLoadMore}/>
        </div>
      ) : (
        <></>
      )}
      </>
  )
}

// App.propTypes = {
//   images: PropTypes.array,
//   searchText: PropTypes.string,
//   pages: PropTypes.number,
//   isLoading: PropTypes.bool,
//   isModalShown: PropTypes.bool,
//   modalImageSource: PropTypes.string,
//   modalAlt: PropTypes.string,
//   fetchImages: PropTypes.func,
//   handleImageClick: PropTypes.func
// }

export default App;
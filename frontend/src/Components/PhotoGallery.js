

import React from 'react';
import './PhotoGallery.css';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function PhotoGallery() {
  return (
    <div className='photogallery-container'>
      <h1 className='photogallery-title'>Photo Gallery</h1>
      <div className="photogallery-images">
        <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765" alt="Books" />
        <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794" alt="Books on Table" />
        <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f" alt="Library" />
        <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f" alt="Books" />
        <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794" alt="Books on Table" />
       
      </div>
      <button>
        VIEW MORE <ArrowForwardIosIcon style={{ fontSize: 20 }} />
      </button>
    </div>
  );
}

export default PhotoGallery;

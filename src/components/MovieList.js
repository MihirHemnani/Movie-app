import React from 'react'
import './AddFavourite.css'
const MovieList = (props) => {
  const FavouriteMovie = props.Addfavourite;
  return (
    <>
      {
        props.movies.map((movie, index) => (
          <div key={index} className='image-container d-flex justify-content-start m-3' style={{ cursor: 'default' }} >
            <img src={movie.Poster} alt="movie" style={{ width: '12rem', height: '18rem' }} />
            <div onClick={() => props.handleFavourite(movie)} className='overlay d-flex align-items-center justify-content-center favourite-btn' style={{ cursor: 'pointer' }}>
              <FavouriteMovie />
            </div>
          </div>
        )
        )
      }
    </>
  )
}

export default MovieList
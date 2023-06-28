import React from 'react'

const MovieListHeading = (props) => {
  return (
    <div className='col' style={{ textAlign: 'center' }}>
      <h1>{props.heading}</h1>
    </div>
  )
}

export default MovieListHeading;


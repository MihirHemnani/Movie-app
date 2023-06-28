import React from 'react'

const SearchBox = (props) => {
  return (
    <div className='col col-sm-4' style={{ width: '25rem' }}>
      <input className='form-control' value={props.value} onChange={(event) => { props.setSearchValue(event.target.value) }} placeholder='Type your movie title'></input>
    </div>
  )
}

export default SearchBox;
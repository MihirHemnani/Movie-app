import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourite';
import RemoveFavourite from './components/RemoveFavourite';


const App = () => {
    // array of objects
    const [movies, setmovie] = useState([]);
    const [searchValue, setSearchValue] = useState("cartoon");
    const [favourite, setFavourite] = useState([]);


    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-movie-app-favourite', JSON.stringify(items));
    }

    const movieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=94921e4c`;

        const response = await fetch(url);
        const responsejson = await response.json();
        // console.log(responsejson);
        if (responsejson.Search) {
            setmovie(responsejson.Search)
        }
    };

    const addFavouriteMovie = (movie) => {
        const found = favourite.find(favouritemovie => {
            return favouritemovie.imdbID === movie.imdbID;
        });
        if (!found) {
            const newMovieSet = [...favourite, movie];
            setFavourite(newMovieSet);
            saveToLocalStorage(newMovieSet);
        }
    }

    const removeFavouriteMovie = (movie) => {
        const newMovieSet = favourite.filter((favouritemovie) => (
            favouritemovie.imdbID !== movie.imdbID
        ));
        setFavourite(newMovieSet);
        saveToLocalStorage(newMovieSet);
    }

    useEffect(() => {
        movieRequest(searchValue);
    }, [searchValue])

    useEffect(() => {
        const favouriteMovie = JSON.parse(localStorage.getItem('react-movie-app-favourite'));
        if (favouriteMovie) {
            setFavourite(favouriteMovie);
        }
    }, [])

    return (
        <>
            <div className='container-fluid movie-app min-vh-100'>
                <div className='row d-flex align-item mt-4 mb-4' style={{ justifyContent: 'center' }}>
                    <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}></SearchBox>
                </div>
                <div className='row d-flex align-item mt-4 mb-4'>
                    <MovieListHeading heading="Movie"></MovieListHeading>
                </div>
                <div className='row'>
                    <MovieList movies={movies}
                        handleFavourite={addFavouriteMovie}
                        Addfavourite={AddFavourite}>

                    </MovieList>
                </div>
                <br />
                <br />
                <div className='row d-flex align-item mt-4 mb-4'>
                    <MovieListHeading heading="Favourite"></MovieListHeading>
                </div>
                <div className='row'>
                    {favourite.length === 0 &&

                        <h3 style={{ color: 'grey', margin: 'auto' }}>No movies</h3>
                    }
                    <MovieList movies={favourite}
                        handleFavourite={removeFavouriteMovie}
                        Addfavourite={RemoveFavourite} >
                    </MovieList>
                </div>
            </div>
            <footer id="footer" className="footer bg-dark">
                <div className="copyright">
                    &copy; Copyright <strong><span>{new Date().getFullYear()}</span></strong>. All Rights Reserved
                </div>
                <div className="credits">
                    Designed by Mihir
                </div>
            </footer>
        </>
    );
};

export default App;
import React, { useReducer, useEffect } from "react";
import axios from "axios";

import MovieList from "./MovieList";
import Search from "./Search";
import spinner from "../assets/spinner.gif"
import { initialState, reducer } from "../store/reducer";
import '../assets/styles/global.css'

const API_KEY = '984e50b46ae97b749b8526d887e4cd65'
const MOVIE_API_URL =  `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies, errorMessage, loading } = state;

  useEffect(() => {
    axios.get(MOVIE_API_URL).then(response => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: response.data.results
      })
    })
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(
      jsonResponse => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.data.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.data.Error
          });
        }
      }
    );
  };

  const getMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading..." />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      <div className="movieRow">
      {
        movies.map((movie, index) => (
          movie.title ? (
            <MovieList key={`${index}-${movie.title}`} movie={movie} />
          ) : null
        ))
      }
      </div>
    );

  return (
    <div>
        <header className="text-center">
          <div className="text-xl font-bold text-gray-900">IMDb Movie List</div>
        </header>

        <Search search={search} />

        <div className="movieListWrapper">{ getMovies }</div>
    </div>
  )
}

export default Home;
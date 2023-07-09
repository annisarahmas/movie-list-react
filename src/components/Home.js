import React, { useReducer, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import MovieList from "./MovieList";
import Search from "./Search";
import Category from "./Category";
import spinner from "../assets/spinner.gif"
import logo from "../assets/images/logo-transparent.svg"
import backgroundImg from "../assets/images/header-background.jpeg"
import { initialState, reducer } from "../store/reducer";
import '../assets/styles/global.css'

const API_KEY = '984e50b46ae97b749b8526d887e4cd65'
const MOVIE_API_URL =  `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`

const Home = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies, errorMessage, loading } = state;

  if (page < 1) {
    setPage(1)
  }

  useEffect(() => {
    axios.get(MOVIE_API_URL).then(response => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: response.data.results
      })
    })
  }, []);

  const category = (categoryValue) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    let apiUrl = ''
    if (categoryValue === 'popular') {
      apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
    } else if (categoryValue === 'upcoming') {
      apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    } else if (categoryValue === 'top-rated') {
      apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    } else if (categoryValue === 'now-playing') {
      apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
    }

    axios(apiUrl).then(
      response => {
        if (response.status === 200) {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: response.data.results
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: response.data.status_message || 'Movie tidak ditemukan.'
          });
        }
      }
    ).catch((error) => {
      if (error) {
        dispatch({
          type: "SEARCH_MOVIES_FAILURE",
          error: 'Movie tidak ditemukan.'
        });
      }
    });
  };

  const search = searchValue => {
    setFilter(searchValue)
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    axios(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`).then(
      response => {
        if (response.status === 200) {
          if (response.data.results.length) {
            dispatch({
              type: "SEARCH_MOVIES_SUCCESS",
              payload: response.data.results
            });
          } else {
            dispatch({
              type: "SEARCH_MOVIES_FAILURE",
              error: 'Movie tidak ditemukan.'
            });
          }
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: response.data.status_message
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
        <header>
          <div className="header-wrapper" style={{ backgroundImage: `linear-gradient(to right, rgba(3,37,65, 0.8) 0%, rgba(3,37,65, 0) 100%), url(${backgroundImg})` }}>
            <div className="header-content">
              <img
                width="300"
                alt="The Movie Database (TMDB)"
                className="logoImage"
                src={logo}
              />

              <div className="flex flex-center justify-center">
                <Category className="input-category" category={category} />
                <Search search={search} />
              </div>
            </div>
          </div>
        </header>

        {filter ? <p style={{marginTop: '3rem'}}>Hasil pencarian untuk "<strong>{filter}</strong>"</p> : null}

        <div className="movieListWrapper" style={{marginTop: filter ? '1rem' : '4rem'}}>{ getMovies }</div>
    </div>
  )
}

export default Home;
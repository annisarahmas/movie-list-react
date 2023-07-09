import React from "react";
import { Link } from 'react-router-dom'
import posterDefault from "../assets/images/default-movie.png"

const MovieList = ({ movie }) => {
  const imgPath = "https://image.tmdb.org/t/p/w300"
  const movieImage = movie.poster_path ? `${imgPath}/${movie.poster_path}` : posterDefault
  return (
    <Link to={`/detail/${movie.id}`} className="movieBoxItem">
      <div className="movieItem">
        <img
          alt={`Movie title: ${movie.title}`}
          src={movieImage}
        />
      </div>
      <h3>{movie.title}</h3>
      {/* <p>{movie.Year}</p> */}
    </Link>
  )
}

export default MovieList;
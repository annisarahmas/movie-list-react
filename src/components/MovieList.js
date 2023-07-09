import React from "react";
import { Link } from 'react-router-dom'
import dayjs from "dayjs";

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
      <div className="movieInfo p-2">
        <h3>{movie.title}</h3>
        <p className="font-normal text-[14px]">{dayjs(movie.release_date).format('MMMM D, YYYY')}</p>
      </div>
    </Link>
  )
}

export default MovieList;
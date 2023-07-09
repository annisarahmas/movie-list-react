import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import dayjs from "dayjs";

import posterDefault from "../assets/images/default-movie.png"

const MovieDetail = () => {

  const API_KEY = '984e50b46ae97b749b8526d887e4cd65'
  const { id } = useParams()

  const [movieDetail, setMovieDetail] = useState([]);
  const [castList, setCastList] = useState([]);
  const [video, setVideo] = useState([]);

  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    const detail = await data.json();
    setMovieDetail(detail);
  };

  const fetchCast = async () => {
    const castdata = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language`
    );
    const castdetail = await castdata.json();
    setCastList(castdetail.cast);
  }

  const fetchVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const videodata = await data.json();
    setVideo(videodata.results);
  }

  useEffect(() => {
    fetchMovie();
    fetchCast();
    fetchVideo();
  }, []);

  const convertTime = (time) => {
    const hours = Math.trunc(time/60);
    const minutes = time % 60;
    const duration = hours +"h "+ minutes+"m"

    return duration
  }

  const imgPath = "https://image.tmdb.org/t/p/original/"
  const movieImage = movieDetail.backdrop_path ? `${imgPath}/${movieDetail.backdrop_path}` : posterDefault
  return (
    <div key={id}>
      {/* Poster */}
      {/* <div className='relative h-auto flex justify-center'>
        <div className='h-full w-full shadowbackdrop absolute'></div>
        <h1 className='text-white absolute bottom-0 p-10 text-2xl md:text-6xl font-bold text-center'>{movieDetail.original_title}</h1>
        <img
          alt={`Poster: ${movieDetail.title}`}
          src={movieImage}
        />
      </div> */}

      <div className="header-detail" style={{ backgroundImage: `url(${movieImage})` }}>
        <div className="poster-content-background">
          <div className="poster-content">
            <div className="detail-information">
              <h1 className='text-4xl font-bold'>{movieDetail.original_title}</h1>
              <div className="information-wrapper flex py-2">
                <span className="info-item date">{dayjs(movieDetail.release_date).format('DD/MM/YYYY')}</span>
                <span className="info-item genres flex">
                  {movieDetail.genres?.map((genre) => (
                    <div className="info-item-item">{genre.name}</div>
                  ))}
                </span>
                <span className="duration">{convertTime(movieDetail.runtime)}</span>
              </div>
              <p className='tagline'>{movieDetail.tagline}</p>

              {/* Overview */}
              <h1 className="text-xl font-semibold py-2">Overview</h1>
              <p className='font-Roboto text-[16px] mb-3'>{movieDetail.overview}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cast */}
      <div className='flex flex-col'>
        <h1 className="text-2xl font-semibold py-2">Top Billed Cast</h1>

        <div className="card-cast md:px-3 flex flex-row my-5 max-w-full flex-start overflow-x-auto relative
        scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90">
          {castList.map((cast) => (
            <>
              {cast.profile_path !== null ? <>
                <div key={cast.id} className='card-cast-item flex min-w-[9rem] md:min-w-[10rem] max-w-[9rem] md:max-w-[10rem] h-full items-center text-center flex-col mx-1'>
                  <img
                    alt={`Cast Img: ${cast.name}`}
                    src={"https://image.tmdb.org/t/p/w500" + cast.profile_path}
                  />
                  <div className="p-2">
                    <p className='font-bold'>{cast.name}</p>
                    <p className='font-normal'>({cast.character})</p>
                  </div>
                </div>
              </> : null}
            </>
          ))}
        </div>
      </div>

      {/* trailer */}
      <div className="text-center pb-3">
        <h1 className="text-2xl font-semibold py-2">Trailer</h1>
      </div>
      <div className='flex justify-center items-center mb-10 gap-5 flex-wrap'>
        {video.map((trailer) => (
          <>
            {trailer.type === "Trailer" ?
              <div className="video-wrapper">
                <iframe width="420" height="315" src={'https://www.youtube.com/embed/' + trailer.key}></iframe>
              </div>
              : null}
          </>
        ))}
      </div>
    </div>
  )
}

export default MovieDetail;
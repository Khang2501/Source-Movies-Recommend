import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./ListMovie.module.scss";
import Detail from "../movie/Detail";
export type Props = {
  title: string;
  fetchAPI: string;
};

export interface IState {
  movie: {
    key: number;
    title: string;
    backdropPath: string;
    overView: string;
    releaseDate: string;
    vote: string;
  };
  movies: {
    key: number;
    title: string;
    backdropPath: string;
    overView: string;
    releaseDate: string;
    vote: string;
  }[];

  resDataMovie: {
    id: number;
    original_title: string;
    backdrop_path: string;
    overview: string;
    original_name: string;
    release_date: string;
    vote_average: string;
  };
}

const movieDefault = {
  key: 0,
  title: "",
  backdropPath: "",
  overView: "",
  releaseDate: "",
  vote: "",
};

export default function ListMovie({ title, fetchAPI }: Props) {
  const [moviesList, setMoviesList] = useState<IState["movies"]>([]);
  const [movieKey, setMovieKey] = useState<number>();
  const [movieDetail, setMovieDetail] = useState<IState["movie"]>(movieDefault);
  const [toggleDetail, setToggleDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get(fetchAPI)
      .then((res) => {
        const loadedMovies: IState["movies"] = [];
        res.data.results.forEach((responseAPI: IState["resDataMovie"]) => {
          loadedMovies.push({
            key: responseAPI.id,
            title: responseAPI.original_title
              ? responseAPI.original_title
              : responseAPI.original_name,
            backdropPath:
              responseAPI.backdrop_path == null
                ? `https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png`
                : `https://image.tmdb.org/t/p/w500/${responseAPI.backdrop_path}`,
            overView: responseAPI.overview,
            releaseDate: responseAPI.release_date,
            vote: responseAPI.vote_average,
          });
        });

        setMoviesList(loadedMovies);
        setIsLoading(true);
      })
      .catch((err) => {});
  }, []);

  const reset = () => {
    setMovieKey(0);
    setToggleDetail(false);
    setMovieDetail(movieDefault);
  };
  return (
    <div className={classes["List-movies_container"]}>
      <h2>{title}</h2>
      {isLoading && (
        <ul className={classes.ul}>
          {moviesList.map((movie) => (
            <li key={movie.key} className={classes.items}>
              <img
                className={classes.img}
                src={movie.backdropPath}
                alt={movie.title}
                onClick={() => {
                  if (movieKey !== movie.key) {
                    reset();
                    setMovieKey(movie.key);
                    setMovieDetail(movie);

                    setToggleDetail(true);
                  } else {
                    reset();
                  }
                }}
              ></img>
            </li>
          ))}
        </ul>
      )}

      {toggleDetail && <Detail moviesList={movieDetail} />}
    </div>
  );
}

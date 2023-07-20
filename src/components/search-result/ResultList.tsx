import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./ResultList.module.scss";
import classes from "../orginal/Original.module.scss";
import Detail from "../movie/Detail";
type Props = {
  inputResult: string;
};
interface State {
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

export default function ResultList({ inputResult }: Props) {
  const [resultMovies, setresultMovies] = useState<State["movies"]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [movieKey, setMovieKey] = useState<number>();
  const [movieDetail, setMovieDetail] = useState(movieDefault);
  const [toggleDetail, setToggleDetail] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=30736126a260889e4fa8c79d809f759a&language=en-US&query=${inputResult}&page=1`
      )
      .then((result) => result.data)
      .then((data) => {
        const loadedMovies: State["movies"] = [];
        data.results.map((responseAPI: State["resDataMovie"]) => {
          return loadedMovies.push({
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

        setresultMovies(loadedMovies);
        setIsLoading(true);
      })
      .catch(() => {});
  }, [inputResult]);

  const reset = () => {
    setMovieKey(0);
    setToggleDetail(false);
    setMovieDetail(movieDefault);
  };

  return (
    <div className={style.resultList}>
      <h2 className={style.title}>Search Result</h2>
      {isLoading && (
        <ul className={classes.ul}>
          {resultMovies.map((movie) => (
            <li key={movie.key}>
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
      {!isLoading && <p className={style.error}>{error}</p>}
      {toggleDetail && <Detail moviesList={movieDetail} />}
    </div>
  );
}

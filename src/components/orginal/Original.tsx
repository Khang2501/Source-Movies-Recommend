import React, { useState, useEffect } from "react";
import classes from "./Original.module.scss";
import axios from "axios";
import { Props } from "../listMovies/ListMovie";

interface IState {
  movies: {
    key: number;
    title: string;
    posterPath: string;
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
    first_air_date: string;
    poster_path: string;
  };
}
export default function Original({ fetchAPI }: Props) {
  const [moviesOriginals, setMoviesOriginals] = useState<IState["movies"]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(fetchAPI)
      .then((result) => result.data)
      .then((data) => {
        const loadedMovies: IState["movies"] = [];

        data.results.map((responseAPI: IState["resDataMovie"]) => {
          return loadedMovies.push({
            key: responseAPI.id,
            title: responseAPI.original_name,
            posterPath: `https://image.tmdb.org/t/p/w500/${responseAPI.poster_path}`,
            overView: responseAPI.overview,
            releaseDate: responseAPI.first_air_date,
            vote: responseAPI.vote_average,
          });
        });
        const loadedMovies10 = loadedMovies.slice(0, 10);
        setMoviesOriginals(loadedMovies10);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {isLoading && (
        <ul className={classes.ul}>
          {moviesOriginals.map((movie) => (
            <li key={movie.key}>
              <img
                className={classes.img}
                src={movie.posterPath}
                alt={movie.title}
              ></img>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

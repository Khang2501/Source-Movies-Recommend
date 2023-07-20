import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Detail.module.scss";

type Props = {
  moviesList: {
    key: number;
    title: string;
    backdropPath: string;
    overView: string;
    releaseDate: string;
    vote: string;
  };
};
type State = {
  typeRes: {
    type: string;
    site: string;
    key: number;
  };
};
export default function Detail({ moviesList }: Props) {
  const [movieDetail, setMovieDetail] = useState<number>();
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3//movie/${moviesList.key}/videos?api_key=30736126a260889e4fa8c79d809f759a`
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.results.length === 0) setVideoError(true);

        const loadedMovies: number[] = [];
        data.results.map((responseAPI: State["typeRes"]) => {
          if (
            responseAPI.type === "Trailer" &&
            responseAPI.site === "YouTube"
          ) {
            return loadedMovies.push(responseAPI.key);
          }
        });

        if (loadedMovies.length === 0)
          data.results.map((responseAPI: State["typeRes"]) => {
            if (
              responseAPI.type === "Teaser" &&
              responseAPI.site === "YouTube"
            ) {
              loadedMovies.push(responseAPI.key);
            }
          });
        if (loadedMovies.length === 0)
          data.results.map((responseAPI: State["typeRes"]) => {
            if (
              responseAPI.type === "Behind the Scenes" &&
              responseAPI.site === "YouTube"
            ) {
              loadedMovies.push(responseAPI.key);
            }
          });
        if (loadedMovies.length === 0) {
          setVideoError(true);
        }
        setMovieDetail(loadedMovies[0]);
      })
      .catch((err) => console.log(err));
  }, [moviesList.key]);

  return (
    <div className={classes["movies_detail_container"]}>
      <div className={classes.left}>
        <h2>{moviesList.title}</h2>
        <div></div>
        <h4>Release Date: {moviesList.releaseDate}</h4>
        <h4>Vote: {moviesList.vote}/10</h4>
        <p>{moviesList.overView}</p>
      </div>

      {videoError ? (
        <img
          className={classes["video_error"]}
          src={moviesList.backdropPath}
          alt={moviesList.title}
        ></img>
      ) : (
        <iframe
          className={classes.right}
          height="300"
          width="630"
          src={`https://www.youtube.com/embed/${movieDetail}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      )}
    </div>
  );
}

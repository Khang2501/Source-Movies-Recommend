import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Banner.module.scss";
type Props = { banner: string };

interface IState {
  movies: {
    key: number | boolean;
    title: string;
    backdropPath: string;
    overView: string;
  }[];

  resDataMovie: {
    id: number;
    original_title: string;
    backdrop_path: string;
    overview: string;
  };
}
export default function Banner({ banner }: Props) {
  const [movies, setMovies] = useState<IState["movies"]>([
    {
      key: true,
      title: "Loading...",
      backdropPath: `${process.env.PUBLIC_URL}/assets/images/background.jpg`,
      overView: "Loading...",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(banner)
      .then((res) => {
        const loadedMovies: IState["movies"] = [];
        res.data.results.map((responseAPI: IState["resDataMovie"]) => {
          loadedMovies.push({
            key: responseAPI.id,
            title: responseAPI.original_title,
            backdropPath: `https://image.tmdb.org/t/p/w500/${responseAPI.backdrop_path}`,
            overView: responseAPI.overview,
          });
        });

        setMovies(loadedMovies);
        setIsLoading(true);
      })
      .catch((err) => {
        const errorBanner = [
          {
            key: true,
            title: "Something went wrong",
            backdropPath: `${process.env.PUBLIC_URL}/assets/images/background.jpg`,
            overView: "Something went wrong",
          },
        ];
        setMovies(errorBanner);
        setIsLoading(true);
      });
  }, []);

  let random: number;
  if (movies.length !== 1) {
    random = Math.floor(Math.random() * movies.length - 1);
  } else {
    random = 0;
  }
  return (
    <div className={classes.container}>
      <img
        className={classes.img}
        src={
          movies[random].backdropPath !== undefined
            ? movies[random].backdropPath
            : `${process.env.PUBLIC_URL}/assets/images/background.jpg`
        }
        alt="img"
      ></img>
      <div className={classes["banner_content"]}>
        <h1>
          {movies[random].title === undefined
            ? "No movie name"
            : movies[random].title}
        </h1>
        <button>Play</button>
        <button>My list</button>
        <p>{movies[random].overView}</p>
      </div>
    </div>
  );
}

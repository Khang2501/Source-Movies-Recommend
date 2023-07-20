import React from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Browse from "./pages/Browse";
import "./App.css";
import Search from "./pages/Search";

interface IState {
  requestsAPI: {
    fetchTrending: string;
    fetchNetflixOriginals: string;
    fetchTopRated: string;
    fetchActionMovies: string;
    fetchComedyMovies: string;
    fetchHorrorMovies: string;
    fetchRomanceMovies: string;
    fetchDocumentaries: string;
    fetchSearch: string;
  };
}

function App() {
  axios.defaults.baseURL = "https://api.themoviedb.org/3";
  const API_KEY: string = "30736126a260889e4fa8c79d809f759a";

  const requests: IState["requestsAPI"] = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Browse requestsAPI={requests} />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

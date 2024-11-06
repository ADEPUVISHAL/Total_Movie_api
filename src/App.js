// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/footer';
import Sidebar from './components/Sidebar';
import './animated.css';
import './App.css';
import MovieList from './components/MovieList';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;  // Access the API key from .env

  useEffect(() => {
    fetchMovies();
  }, [searchQuery, selectedGenre]);

  const fetchMovies = () => {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

    if (searchQuery) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
    }

    if (selectedGenre) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`;
    }

    axios.get(url)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <div className="main-content">
        <Sidebar onGenreSelect={handleGenreSelect} />
        <MovieList movies={movies} />
      </div>
      <Footer />
    </div>
  );
};

export default App;

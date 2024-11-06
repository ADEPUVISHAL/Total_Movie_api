// src/components/MovieList.js
import React from 'react';

const MovieList = ({ movies }) => {
    return (
        <section className="movie-list">
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                    </div>
                ))
            ) : (
                <p>No movies found!</p>
            )}
        </section>
    );
};

export default MovieList;

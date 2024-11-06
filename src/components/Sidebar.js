// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sidebar = ({ onGenreSelect }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

        // Fetching predefined movie genres from TMDB API
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
            .then((response) => {
                setCategories(response.data.genres);  // Store genre list from API
            })
            .catch((error) => {
                console.error('Error fetching genres:', error);
            });
    }, []);

    const handleCategoryClick = (genreId) => {
        onGenreSelect(genreId); // Pass selected genre ID back to App component
    };

    return (
        <aside className="sidebar">
            <h3 >Categories</h3>
            <ul>
                {categories.map((category) => (
                    <li key={category.id} onClick={() => handleCategoryClick(category.id)}>
                        {category.name}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;

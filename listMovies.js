import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Assuming CSS styles like .grid and .card are defined here

function ListMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        console.error('Error loading movies:', err);
      }
    }
    getData();
  }, []);

  return (
    <div className="grid-container">
      {movies.map((movie) => (
        <Link key={movie.id} to={`/movie/${movie.id}`} className="card">
          <h3>{movie.title}</h3>
          <p>{movie.tagline}</p>
          <p>⭐ {movie.vote_average?.toFixed(1)} / 10</p>
        </Link>
      ))}
    </div>
  );
}

export default ListMovies;

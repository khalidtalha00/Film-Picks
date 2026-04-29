import React from "react";
import "../css/MovieCard.css";
import toast, { Toaster } from "react-hot-toast";
import { useMovieContext } from "../contexts/movieContext";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavouriteClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
      toast.error(`Removed from favourite!`);
    } else {
      addToFavorites(movie);
      toast.success(`Added to favourite!`);
    }
  }
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-overlay">
            <button
              className={`favorite-btn ${favorite ? "active" : ""}`}
              onClick={onFavouriteClick}
            >
              ♥
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

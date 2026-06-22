import React, { useState } from "react";
import "../css/MovieCard.css";
import toast, { Toaster } from "react-hot-toast";
import { useMovieContext } from "../contexts/movieContext";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites, customLists, toggleMovieInList, isMovieInCustomList } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const [showDropdown, setShowDropdown] = useState(false);

  function onFavouriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(movie.id);
      toast.error(`Removed from favourite!`);
    } else {
      addToFavorites(movie);
      toast.success(`Added to favourite!`);
    }
  }

  function onListBtnClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setShowDropdown((prev) => !prev);
  }

  function handleListToggle(e, listId) {
    e.preventDefault();
    e.stopPropagation();
    toggleMovieInList(listId, movie);
    const inList = isMovieInCustomList(listId, movie.id);
    if (inList) {
       toast.error(`Removed from list`);
    } else {
       toast.success(`Added to list`);
    }
  }

  function stopPropagation(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card" onMouseLeave={() => setShowDropdown(false)}>
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-overlay">
            <div className="action-buttons">
              <button
                className={`favorite-btn ${favorite ? "active" : ""}`}
                onClick={onFavouriteClick}
                title="Favorite"
              >
                ♥
              </button>
              <button
                className="list-btn"
                onClick={onListBtnClick}
                title="Add to List"
              >
                +
              </button>
            </div>
            
            {showDropdown && (
              <div className="list-dropdown" onClick={stopPropagation}>
                <h4>Add to list</h4>
                {customLists.length === 0 ? (
                  <p className="no-lists-text">No custom lists yet.</p>
                ) : (
                  <div className="list-options">
                    {customLists.map((list) => (
                      <label key={list.id} className="list-option">
                        <input
                          type="checkbox"
                          checked={isMovieInCustomList(list.id, movie.id)}
                          onChange={(e) => handleListToggle(e, list.id)}
                        />
                        <span>{list.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="movie-info">
          <p id="movie-title">{movie.title}</p>
          <p id="movie-release">{movie.release_date?.split("-")[0]}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

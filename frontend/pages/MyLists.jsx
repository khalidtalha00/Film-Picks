import { useState } from "react";
import "../src/css/MyLists.css";
import { useMovieContext } from "../src/contexts/movieContext";
import MovieCard from "../src/components/MovieCard";
import { Toaster, toast } from "react-hot-toast";

function MyLists() {
  const { customLists, createCustomList, deleteCustomList } = useMovieContext();
  const [newListName, setNewListName] = useState("");
  const [activeListId, setActiveListId] = useState(
    customLists.length > 0 ? customLists[0].id : null
  );

  const handleCreateList = (e) => {
    e.preventDefault();
    if (!newListName.trim()) {
      toast.error("List name cannot be empty");
      return;
    }
    createCustomList(newListName.trim());
    setNewListName("");
    toast.success("List created!");
    
    // Set the newly created list as active if it's the first one
    if (customLists.length === 0) {
      // The context update is async, so we might not have the ID immediately.
      // But we can just rely on the next render, or select it next.
    }
  };

  const handleDeleteList = (listId) => {
    deleteCustomList(listId);
    if (activeListId === listId) {
      setActiveListId(null);
    }
    toast.success("List deleted");
  };

  const activeList = customLists.find((l) => l.id === activeListId);

  return (
    <div className="mylists-container">
      <Toaster />
      <div className="mylists-sidebar">
        <h2>My Lists</h2>
        <form onSubmit={handleCreateList} className="create-list-form">
          <input
            type="text"
            placeholder="New List Name..."
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <button type="submit" className="create-list-btn">+</button>
        </form>

        <ul className="lists-nav">
          {customLists.map((list) => (
            <li 
              key={list.id} 
              className={`list-nav-item ${activeListId === list.id ? 'active' : ''}`}
            >
              <span onClick={() => setActiveListId(list.id)} className="list-name">
                {list.name} ({list.movies.length})
              </span>
              <button 
                className="delete-list-btn" 
                onClick={() => handleDeleteList(list.id)}
                title="Delete List"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
        {customLists.length === 0 && (
          <p className="no-lists-msg">You haven't created any custom lists yet.</p>
        )}
      </div>

      <div className="mylists-content">
        {activeList ? (
          <>
            <h2>{activeList.name}</h2>
            {activeList.movies.length > 0 ? (
              <div className="movies-grid">
                {activeList.movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </div>
            ) : (
              <div className="empty-list">
                <p>This list is empty. Add some movies from the Home page!</p>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state-content">
            {customLists.length > 0 
              ? <h2>Select a list to view its movies</h2>
              : <h2>Create a list to get started</h2>
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default MyLists;

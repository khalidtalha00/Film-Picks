import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])
    const [customLists, setCustomLists] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        if (storedFavs) setFavorites(JSON.parse(storedFavs))

        const storedLists = localStorage.getItem("customLists")
        if (storedLists) setCustomLists(JSON.parse(storedLists))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    useEffect(() => {
        localStorage.setItem('customLists', JSON.stringify(customLists))
    }, [customLists])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const createCustomList = (listName) => {
        const newList = {
            id: Date.now().toString(),
            name: listName,
            movies: []
        }
        setCustomLists(prev => [...prev, newList])
    }

    const deleteCustomList = (listId) => {
        setCustomLists(prev => prev.filter(list => list.id !== listId))
    }

    const toggleMovieInList = (listId, movie) => {
        setCustomLists(prev => prev.map(list => {
            if (list.id === listId) {
                const isMovieInList = list.movies.some(m => m.id === movie.id)
                if (isMovieInList) {
                    return { ...list, movies: list.movies.filter(m => m.id !== movie.id) }
                } else {
                    return { ...list, movies: [...list.movies, movie] }
                }
            }
            return list
        }))
    }

    const isMovieInCustomList = (listId, movieId) => {
        const list = customLists.find(l => l.id === listId)
        if (!list) return false
        return list.movies.some(m => m.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        customLists,
        createCustomList,
        deleteCustomList,
        toggleMovieInList,
        isMovieInCustomList
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}
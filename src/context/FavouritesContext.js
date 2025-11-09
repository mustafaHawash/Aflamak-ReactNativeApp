import React, { createContext, useState, useContext } from "react";

// Create the context object
const FavouritesContext = createContext();

// Context provider component
export const FavouritesProvider = ({ children }) => {
    // Local state to store favourite movies
    const [favourites, setFavourites] = useState([]);

    // Add a movie to favourites
    const addToFavourites = (movie) => {
        setFavourites((prev) => {
            // Avoid duplicates
            if (prev.some((m) => m.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    // Remove a movie from favourites
    const removeFromFavourites = (id) => {
        setFavourites((prev) => prev.filter((m) => m.id !== id));
    };

    // Check if a movie is already in favourites
    const isFavourite = (id) => favourites.some((m) => m.id === id);

    return (
        <FavouritesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                isFavourite,
            }}
        >
            {children}
        </FavouritesContext.Provider>
    );
};

// Custom hook to use the favourites context
export const useFavourites = () => useContext(FavouritesContext);

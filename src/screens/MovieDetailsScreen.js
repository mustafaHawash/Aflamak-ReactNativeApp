import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { getMovieDetails, getPoster } from "../api/movieApi";
import FavouriteButton from "../components/FavouriteButton";
import { useFavourites } from "../context/FavouritesContext";

export default function MovieDetailsScreen({ route }) {
    // Get the movie id passed from HomeScreen
    const { id } = route.params;

    // Local state to store movie data
    const [movie, setMovie] = useState(null);
    // Loading indicator state
    const [loading, setLoading] = useState(false);

    // Access favourites context
    const { addToFavourites, removeFromFavourites, isFavourite } =
        useFavourites();

    // Fetch movie details when screen opens
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (err) {
                console.error("Error fetching movie details:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    // Show spinner while loading
    if (loading || !movie) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    // Check if this movie is already in favourites
    const fav = isFavourite(movie.id);

    // Function to toggle favourites
    const toggleFav = () => {
        if (fav) {
            removeFromFavourites(movie.id);
        } else {
            addToFavourites(movie);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Movie poster image */}
            {movie.poster_path && (
                <Image
                    source={{ uri: getPoster(movie.poster_path) }}
                    style={styles.poster}
                />
            )}

            {/* Movie title */}
            <Text style={styles.title}>{movie.title}</Text>

            {/* Movie tagline */}
            {movie.tagline ? (
                <Text style={styles.tagline}>{movie.tagline}</Text>
            ) : null}

            {/* Movie description */}
            <Text style={styles.overview}>{movie.overview}</Text>

            {/* Rating info */}
            <Text style={styles.info}>Rating: {movie.vote_average} / 10</Text>

            {/* Button to add or remove from favourites */}
            <FavouriteButton isFav={fav} onToggle={toggleFav} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loading: { flex: 1, justifyContent: "center", alignItems: "center" },
    container: { padding: 12 },
    poster: { width: "100%", height: 450, borderRadius: 8, marginBottom: 12 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 6 },
    tagline: { fontStyle: "italic", color: "#666", marginBottom: 10 },
    overview: { marginTop: 10, fontSize: 14, lineHeight: 20 },
    info: { marginTop: 12, fontWeight: "700" },
});

import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { getPopularMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard";

export default function HomeScreen({ navigation }) {
    // Movies list state
    const [movies, setMovies] = useState([]);
    // Loading indicator state
    const [loading, setLoading] = useState(false);
    // Pagination state
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Function to fetch movies
    const fetchMovies = async (p = 1) => {
        try {
            setLoading(true); // Start loading
            const data = await getPopularMovies(p); // Get movies from API
            if (p === 1) {
                // If it's the first page, replace the list
                setMovies(data.results);
            } else {
                // If it's not the first page, append new results
                setMovies((prev) => [...prev, ...data.results]);
            }
            setTotalPages(data.total_pages || 1); // Save total number of pages
        } catch (err) {
            console.error("Error fetching movies:", err);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Fetch first page when screen loads
    useEffect(() => {
        fetchMovies(1);
    }, []);

    // Load more when user scrolls down
    const loadMore = () => {
        if (loading) return; // Avoid duplicate requests
        if (page >= totalPages) return; // No more pages
        const next = page + 1;
        setPage(next);
        fetchMovies(next);
    };

    return (
        <View style={styles.container}>
            {/* Button to navigate to Favourites Screen */}
            <TouchableOpacity
                style={styles.favBtn}
                onPress={() => navigation.navigate("Favourites")}
            >
                <Text style={styles.favText}>Go to Favourites</Text>
            </TouchableOpacity>

            {/* Show loading spinner when movies are not yet loaded */}
            {loading && movies.length === 0 ? (
                <ActivityIndicator size='large' style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <MovieCard
                            movie={item}
                            onPress={() =>
                                navigation.navigate("Details", { id: item.id })
                            }
                        />
                    )}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        loading ? (
                            <ActivityIndicator style={{ margin: 8 }} />
                        ) : null
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 12, backgroundColor: "purple" },
    favBtn: {
        backgroundColor: "#15175fff",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 12,
    },
    favText: { color: "#ffffffff", fontWeight: "700" },
});

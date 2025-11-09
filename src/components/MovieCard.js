import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { getPoster } from "../api/movieApi";

export default function MovieCard({ movie, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            {/* Display movie image or placeholder if not available */}
            {movie.poster_path ? (
                <Image
                    source={{ uri: getPoster(movie.poster_path) }}
                    style={styles.image}
                />
            ) : (
                <View style={[styles.image, styles.noImage]}>
                    <Text>No Image</Text>
                </View>
            )}

            {/* Movie info (title + short overview) */}
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>
                    {movie.title}
                </Text>
                <Text style={styles.overview} numberOfLines={2}>
                    {movie.overview}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "column",
        marginVertical: 8,
        padding: 8,
        backgroundColor: "#15175fff",
        borderRadius: 8,
        elevation: 2,
    },
    image: { width: 320, height: 130, borderRadius: 3 },
    noImage: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eee",
    },
    info: { flex: 1, justifyContent: "center" },
    title: { fontSize: 16, fontWeight: "bold",color: "#ffffffff" },
    overview: { fontSize: 12, color: "#ffffffff", marginTop: 6 },
});

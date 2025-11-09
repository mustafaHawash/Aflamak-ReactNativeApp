import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFavourites } from "../context/FavouritesContext";
import MovieCard from "../components/MovieCard";

export default function FavouritesScreen({ navigation }) {
    const { favourites } = useFavourites();

    // If no favourites, show a message
    if (favourites.length === 0) {
        return (
            <View style={styles.empty}>
                <Text>No favourite movies yet.</Text>
            </View>
        );
    }

    // Otherwise, display the list
    return (
        <FlatList
            style={{ padding: 12 }}
            data={favourites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <MovieCard
                    movie={item}
                    onPress={() =>
                        navigation.navigate("Details", { id: item.id })
                    }
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    empty: { flex: 1, alignItems: "center", justifyContent: "center" },
});

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function FavouriteButton({ isFav, onToggle }) {
    return (
        <TouchableOpacity
            style={[styles.btn, isFav ? styles.active : null]}
            onPress={onToggle}
        >
            <Text style={styles.text}>
                {isFav ? "Remove from favourites" : "Add to favourites"}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#ddd",
        alignItems: "center",
        marginTop: 12,
    },
    active: { backgroundColor: "#ffdddd" },
    text: { fontWeight: "600" },
});

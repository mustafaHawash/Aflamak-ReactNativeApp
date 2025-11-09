import React from "react";
import AppNavigator from "./src/navigation/Navigator";
import { FavouritesProvider } from "./src/context/FavContext";

export default function App() {
    return (
        <FavouritesProvider>
            <AppNavigator />
        </FavouritesProvider>
    );
}

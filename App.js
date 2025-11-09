import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { FavouritesProvider } from "./src/context/FavouritesContext";

export default function App() {
  return (
    <FavouritesProvider>
      <AppNavigator />
    </FavouritesProvider>
  );
}

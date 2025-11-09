import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import your screens
import HomeScreen from "../screens/Home";
import MovieDetailsScreen from "../screens/MovieDetails";
import FavouritesScreen from "../screens/FavScn";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{ title: "Movies" }}
                />
                <Stack.Screen
                    name='Details'
                    component={MovieDetailsScreen}
                    options={{ title: "Details" }}
                />
                <Stack.Screen
                    name='Favourites'
                    component={FavouritesScreen}
                    options={{ title: "Favourites" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

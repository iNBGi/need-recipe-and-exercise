import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { ProfileContext } from "../../Context/profileinfocontext";
import { RecipeInformationContext } from "../../Context/recipeinformationcontext";
import { RecipeContext } from "../../Context/recipeContext";

export const Informationscreen = ({ navigation }) => {
  // Global state
  const [profile] = useContext(ProfileContext);
  const [recipeInformation] = useContext(RecipeInformationContext);
  const [recipes] = useContext(RecipeContext);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);

  useEffect(() => {
    // Suggest recipes based on the user's goal and recipe information
    const suggestRecipes = () => {
      if (profile && recipeInformation && recipeInformation.length > 0) {
        const goal = profile.goal;

        // Filter recipes based on the user's goal and nutritional information
        const filteredRecipes = recipeInformation.filter((recipe) => {
          const calories = parseInt(recipe.calories);

          if (goal === "GW" && calories > 500) {
            return true;
          } else if (goal === "LW" && calories < 300) {
            return true;
          } else if (goal === "MW" && calories >= 300 && calories <= 500) {
            return true;
          }

          return false;
        });

        // Get the suggested recipe ids
        const suggestedRecipeIds = filteredRecipes.map((recipe) => recipe.id);

        // Get the full suggested recipes from the RecipeContext
        const suggestedRecipes = recipes.filter((recipe) => suggestedRecipeIds.includes(recipe.id));

        setSuggestedRecipes(suggestedRecipes);
      }
    };

    // Call the suggestion function
    suggestRecipes();
  }, [profile, recipeInformation, recipes]);

  return (
    <View>
      <Text>Recipe App</Text>

      {/* Display User Profile Information */}
      {profile ? (
        <View>
          <Text>User Profile</Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Height:</Text> {profile.height} cm
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Weight:</Text> {profile.weight} kg
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Bmi:</Text> {profile.bmi}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Goal:</Text> {profile.goal}
          </Text>
          {/* ... Additional profile information */}
        </View>
      ) : (
        <Text>No profile information available</Text>
      )}

      {/* Display Suggested Recipe Information */}
      {suggestedRecipes && suggestedRecipes.length > 0 ? (
        <View>
          <Text>Suggested Recipe List</Text>
          <FlatList
            data={suggestedRecipes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View key={item.id}>
                <Text style={{ fontWeight: "bold" }}>Recipe Name:</Text>
                <Text>{item.recipename}</Text>
                <Text style={{ fontWeight: "bold" }}>Ingredients:</Text>
                <Text>{item.ingredients}</Text>
              </View>
            )}
          />
        </View>
      ) : (
        <Text>No suggested recipes available</Text>
      )}
    </View>
  );
};

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../../../Context/authContext";
import axios from "axios";
import { RecipeContext } from "../../../Context/recipeContext";
import RecipeCard from "../../Content/Recipecard";
import { Aboutstyle } from "./about.style";

export const RecipeDetails = ({navigation, route}) => {
  const [recipes] = useContext(RecipeContext);
  const [loading, setLoading]= useState(false);
  const { recipeId } = route.params;
  const [selectedrecipe, setSelectedRecipes] = useState([]);
  const selectedRecipess = selectedrecipe.find((recipeinformations) => recipeinformations.id === recipeId);
 
  const getSelectedRecipe = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://10.0.2.2:3000/recipes');
        setLoading(false);
        setSelectedRecipes(data?.recipeinformations);
      } catch (error) {
        setLoading(false);
        console.log(error);
        
      }
    };
    
    // inintal  posts
    useEffect(() => {
      getSelectedRecipe();
    }, []);
  //global state
  return (
      <View style={Aboutstyle.content}>
      <RecipeCard recipeId = {recipeId} recipeinformations = {selectedRecipess} />
    <View style={{ backgroundColor: "#ffffff" }}>
    </View>
  </View>
);
   };
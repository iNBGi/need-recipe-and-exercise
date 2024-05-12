import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import React, { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../../../Context/authContext";
import axios from "axios";
import { RecipeContext } from "../../../Context/recipeContext";
import Recipenutritioncard from "../../Content/Recipenutritioncard";
import { Aboutstyle } from "./about.style";
import { Card, TextInput,Button,Title,Paragraph} from 'react-native-paper';

export const RecipeNutrition = ({navigation, route}) => {
  const [recipes] = useContext(RecipeContext);
  const [loading, setLoading]= useState(false);
  const { recipeId } = route.params;
  const [selectedrecipe, setSelectedRecipes] = useState([]);
  const [selectednutrition, setSelectedNutritions] = useState([]);
  const selectedRecipess = selectedrecipe.find((recipeinformations) => recipeinformations.id === recipeId);
  const recipenutritions = selectednutrition.find((selectednutritions) => selectednutritions.id === recipeId);
 
  const getSelectedRecipe = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("https://serverrrr-3kbl.onrender.com/recipesinformation");
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

    const getSelectedNutrition = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("https://serverrrr-3kbl.onrender.com/nutrition");
        setLoading(false);
        setSelectedNutritions(data?.nutritions);
      } catch (error) {
        setLoading(false);
        console.log(error);
        
      }
    };
    
    // inintal  posts
    useEffect(() => {
      getSelectedNutrition();
    }, []);
  //global state
  return (
      <View style={Aboutstyle.content}>
         <Card >
     <Card.Actions  style={Aboutstyle.card}>
     <Button onPress={() => navigation.navigate('RecipeDetails', { recipeId })}>Description</Button>
     <Button onPress={() => navigation.navigate('RecipeIngridients', { recipeId })}>Ingridients</Button>
     <Button onPress={() => navigation.navigate('RecipeSteps', { recipeId })}>Steps</Button>
     <Button onPress={() => navigation.navigate('RecipeNutrition', { recipeId })}>Nutrition</Button>
  </Card.Actions>
  </Card>
      <Recipenutritioncard recipeId = {recipeId} nutrition = {recipenutritions} recipeinformations = {selectedRecipess} />
      
    <View style={{ backgroundColor: "#ffffff" }}>
    </View>
  </View>
);
   };
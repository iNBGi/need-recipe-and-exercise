import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity,SafeAreaView,Text,View,ImageBackground,Image,ScrollView} from 'react-native';
import { Card, TextInput,Button,Title,Paragraph} from 'react-native-paper';
import { Menustyle } from './menu.style';
import { RecipeContext } from '../../../Context/recipeContext';
import { AuthContext } from '../../../Context/authContext';
import { RecipeInformationContext } from '../../../Context/recipeinformationcontext';
import { ProfileContext } from "../../../Context/profileinfocontext";



export const FYRecipescreen = ({navigation, route}) => {
    const [state] = useContext(AuthContext) 
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
    return(
<SafeAreaView style={Menustyle.content}>
    <View>
     
    </View> 
    <ScrollView>
      {suggestedRecipes.map((suggestedrecipe) => (
        <Card TouchableOpacity
        key={suggestedrecipe.id}
        onPress={() => navigation.navigate('FYRecipeDetails',{recipeId : suggestedrecipe.id})} style={Menustyle.card1}
        >
            
              <Card.Cover style={Menustyle.cardcover} resizeMode={`cover`}  source={{ uri: suggestedrecipe.image }}/>
              <Card.Title title = {suggestedrecipe.recipename}></Card.Title>
        </Card>
      ))}
      
    </ScrollView>
    
</SafeAreaView>

    );
 };
 
 
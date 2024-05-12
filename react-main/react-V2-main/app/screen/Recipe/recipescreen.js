import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity,SafeAreaView,Text,View,ImageBackground,Image,ScrollView} from 'react-native';
import { Card, TextInput,Button,Title,Paragraph} from 'react-native-paper';
import { Menustyle } from './menu.style';
import { RecipeContext } from '../../../Context/recipeContext';
import { AuthContext } from '../../../Context/authContext';
import { RecipeDetails } from './recipedetails';



export const Recipescreen = ({navigation, route}) => {
    const [state] = useContext(AuthContext)
    const [recipes] = useContext(RecipeContext)
    
    return(
<SafeAreaView style={Menustyle.content}>
    <View>
     
    </View> 
    <ScrollView>
      {recipes.map((recipe) => (
        <Card TouchableOpacity
        key={recipe.id}
        onPress={() => navigation.navigate('RecipeDetails',{recipeId : recipe.id})} style={Menustyle.card1}
        >
            
              <Card.Cover style={Menustyle.cardcover} resizeMode={`cover`}  source={{ uri: recipe.image }}/>
              <Card.Title title = {recipe.recipename}></Card.Title>
        </Card>
      ))}
      
    </ScrollView>
    
</SafeAreaView>

    );
 };
 
 
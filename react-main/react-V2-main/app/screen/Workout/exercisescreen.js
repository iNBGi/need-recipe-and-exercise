import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity,SafeAreaView,Text,View,ImageBackground,Image,ScrollView} from 'react-native';
import { Card, TextInput,Button,Title,Paragraph} from 'react-native-paper';
import { Menustyle } from '../Menu/menu.style';
import { RecipeContext } from '../../../Context/recipeContext';
import { AuthContext } from '../../../Context/authContext';
import { ExerciseContext } from '../../../Context/exerciseContext';



export const Exercisescreen = ({navigation, route}) => {
    const [state] = useContext(AuthContext)
    const [exercises] = useContext(ExerciseContext)
    
    return(
<SafeAreaView style={Menustyle.content}>
    <View>

    </View> 

    <ScrollView>
      {exercises.map((exercise) => (
        <Card TouchableOpacity
        key={exercise.id}
        onPress={() => navigation.navigate('ExerciseDetails',{exerciseId : exercise.id})} style={Menustyle.card1}
        >
            
              <Card.Cover style={Menustyle.cardcover} resizeMode={`cover`}  source={{ uri: exercise.image }}/>
              <Card.Title title = {exercise.exercise}></Card.Title>
        </Card>
      ))}
      
    </ScrollView>
    
</SafeAreaView>


    
   
    );
 };
 
 
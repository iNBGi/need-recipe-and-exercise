import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import { RecipeContext } from '../../Context/recipeContext';
import { Recipestyle } from './recipe.style';

const Recipestepscard = ({ nutrition, recipeinformations, recipeId }) => {
  const [recipes] = useContext(RecipeContext);
  const navigation = useNavigation();
  const selectedrecipeinformation = recipeinformations;
  const selectednutrition = nutrition;
  const recipesinfo = recipes;
  const selectedrecipe = recipes.filter(recipe => recipe.id === recipeId);
  

  // Dummy data for the pie chart
  const parseValue = (value) => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? 0 : parsedValue;
  };

  const data = selectednutrition
    ? [
        { name: 'Fat', population: parseValue(selectednutrition.fat), color: '#FF6384' },
        { name: 'Calories', population: parseValue(selectednutrition.calories), color: '#36A2EB' },
        { name: 'Carbohydrates', population: parseValue(selectednutrition.carbohydrates), color: '#FFCE56' },
        { name: 'Protein', population: parseValue(selectednutrition.protein), color: '#00BFFF' },
        { name: 'Cholesterol', population: parseValue(selectednutrition.cholesterol), color: '#8A2BE2' },
      ]
    : [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white'  }}>
      <ScrollView>
        <View>
          <Card>
            <Card.Content>
              {selectedrecipeinformation ? (
                <>
               {selectedrecipe.map((recipe) => (
        <Card>
          <Card.Cover style={Recipestyle.cardcover} resizeMode={`cover`} source={{ uri: recipe.image }} />

        </Card>
      ))}
            
                 <Title style={{ textAlign: 'center' }}>{selectedrecipeinformation.name}</Title>
                  <Title style={{ textAlign: 'center' }}>{selectedrecipeinformation.recipename}</Title>
                  <Title style={{ textAlign: 'center' }}>Steps</Title>
                  <Paragraph>{selectedrecipeinformation.steps}</Paragraph>
                  <View style={Recipestyle.separator} />
                </>
              ) : (
                <Text>Recipe information not found.</Text>
              )}
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  ); 
};


export default Recipestepscard;
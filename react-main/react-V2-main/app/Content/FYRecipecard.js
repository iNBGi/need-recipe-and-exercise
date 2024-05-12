import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import { RecipeContext } from '../../Context/recipeContext';
import { Recipestylecard } from './recipe.stylecard';

const FYRecipeCard = ({ nutrition, recipeinformations, recipeId }) => {
  const [recipes] = useContext(RecipeContext);
  const navigation = useNavigation();
  const selectedrecipeinformation = recipeinformations;
  const recipesinfo = recipes;
  const selectedrecipe = recipes.filter(recipe => recipe.id === recipeId);
  

  // Dummy data for the pie chart
  const parseValue = (value) => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? 0 : parsedValue;
  };

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
        <Card.Cover style={Recipestylecard.cardcover} resizeMode={`cover`} source={{ uri: recipe.image }} />

      </Card>
    ))}
          
               <Title style={{ textAlign: 'center' }}>{selectedrecipeinformation.name}</Title>
                <Title style={{ textAlign: 'center' }}>{selectedrecipeinformation.recipename}</Title>
                <Title style={{ textAlign: 'center' }}>Description</Title>
                <Paragraph>{selectedrecipeinformation.description}</Paragraph>
                <View style={Recipestylecard.separator} />
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

export default FYRecipeCard;
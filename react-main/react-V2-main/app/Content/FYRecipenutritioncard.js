import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import { RecipeContext } from '../../Context/recipeContext';
import { Recipestyle } from './recipe.style';

const FYRecipenutritioncard = ({ nutrition, recipeinformations, recipeId }) => {
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
                  </>
                ) : (
                  <Text>Recipe information not found.</Text>
                )}
              </Card.Content>
            </Card>
  
            <Card>
              <Card.Content>
              <Title style={{ textAlign: 'center' }}>Nutrition</Title>
                {selectednutrition ? (
                  <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text>Calories:</Text>
                      <Text>{selectednutrition.calories}</Text>
                    </View>
                    <View style={Recipestyle.separator} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text>Carbohydrates:</Text>
                      <Text>{selectednutrition.carbohydrates}</Text>
                    </View>
                    <View style={Recipestyle.separator} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text>Cholesterol:</Text>
                      <Text>{selectednutrition.cholesterol}</Text>
                    </View>
                    <View style={Recipestyle.separator} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text>Fat:</Text>
                      <Text>{selectednutrition.fat}</Text>
                    </View>
                    <View style={Recipestyle.separator} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text>Protein:</Text>
                      <Text>{selectednutrition.protein}</Text>
                    </View>
                    <View style={Recipestyle.separator} />
                  </>
                ) : (
                  <Text>Nutrition information not found.</Text>
                )}
              </Card.Content>
            </Card>
       
            <Card>
              
              <Card.Content>
              <View style={Recipestyle.separator} />
                <ScrollView>
                  <Title style={{ textAlign: 'center' }}>Analytics</Title>
                  <View>
                    <PieChart
                      data={data}
                      width={300}
                      height={200}
                      chartConfig={{
                        color: (opacity = 1) =>` rgba(26, 255, 146, ${opacity})`,
                        propsForDots: {
                          r: '6',
                          strokeWidth: '2',
                          stroke: '#ffa726',
                        },
                      }}
                      accessor="population"
                      backgroundColor="transparent"
                      paddingLeft="15"
                      absolute
                    />
                  </View>
                </ScrollView>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

export default FYRecipenutritioncard;
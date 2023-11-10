import { SafeAreaView,Text,View,ImageBackground,Image,ScrollView} from 'react-native';
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { RecipeContext } from "../../Context/recipeContext";
import { Menustyle } from "../screen/Recipe/menu.style";
import { Card, TextInput,Button,Title,Paragraph} from 'react-native-paper';
const RecipeCard = ({recipeinformations, recipeId}) => {
    const [recipes] = useContext(RecipeContext)
    const navigation = useNavigation();
    const selectedrecipeinformation = recipeinformations

  //handle delete prompt
  return (
    <SafeAreaView style={Menustyle.content}>
    <View>
    <Card >
       <Card.Actions  style={Menustyle.card}>
       <Image style={{width:35,height:35,marginRight: 5}}  source={require('./asset/blacklogo.png')}></Image>
       <Button onPress={() => navigation.navigate('Recipescreen')}>Back</Button>     
       </Card.Actions>
       </Card>
       <ScrollView>
   <View>
       <Card style={Menustyle.card3}>
       <Card.Content>
       <ScrollView>
    {selectedrecipeinformation ? ( // Check if selectedrecipeinformation exists
      <>
        <Title style={{ textAlign: 'center' }}>{selectedrecipeinformation.recipename}</Title>
        <Title style={{ textAlign: 'center' }}>Ingredients</Title>
        <Paragraph> {selectedrecipeinformation.ingredients}</Paragraph>
        <Title style={{ textAlign: 'center' }}>Steps</Title>
        <Paragraph> {selectedrecipeinformation.steps}</Paragraph>
        <Title style={{ textAlign: 'center' }}>Nutrition</Title>
        <Paragraph> {selectedrecipeinformation.nutrition}</Paragraph>
        <Paragraph> {recipeId}</Paragraph>
      
      </>
    ) : (
      <Text>Recipe information not found.</Text>
    )}
  </ScrollView>
 </Card.Content>
       </Card>

   </View>   

   </ScrollView>
    </View>
        
</SafeAreaView>
  );
};

export default RecipeCard;
import React from 'react';

import { SafeAreaView,Text,View,ImageBackground,Image,ScrollView} from 'react-native';
import { Card, TextInput,Button,Title,Paragraph} from 'react-native-paper';
import { Menustyle } from './menu.style';


export const Foryoumenuscreen = ({navigation, route }) => {
  
    return(
<SafeAreaView style={Menustyle.content}>
    <View>
   
   <ScrollView>
    <Card style={Menustyle.card1}>
    <Card.Cover style={Menustyle.cardcover} resizeMode={`cover`} source={require('./asset/Fitnessbuddy.png')}/>
    <Card.Content>
      <Title>Food Recipe</Title>
      <Paragraph>Free healthy food recipe for Your fitness journey!</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button onPress={() => navigation.navigate('Recipescreen')}>Go</Button>
    </Card.Actions>
    </Card>
    </ScrollView> 
    </View> 

</SafeAreaView>

    
   
    );
 };

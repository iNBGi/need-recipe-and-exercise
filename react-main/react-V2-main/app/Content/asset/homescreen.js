import React from 'react';
import { SafeAreaView,Text,View,ImageBackground,Image} from 'react-native';
import { Card, TextInput,Button,Title,Paragraph} from 'react-native-paper';
import {Homestyle} from './home.style'



export const Homescreen = ({navigation}) => {
    return(
<SafeAreaView style={Homestyle.content}>
    <View>
    <Text style={Homestyle.titleText} >{"Home Screen"}</Text>
    <Card>
    
        
       <Card.Actions style={Homestyle.card}>
       <Image style={{width:35,height:35,marginRight: 5}}  source={require('./asset/blacklogo.png')}></Image>
       <Button onPress={() => navigation.navigate('Menu')} style={Homestyle.button}>Menu</Button>
      <Button onPress={() => navigation.navigate('Home')} style={Homestyle.button}>Home</Button>
      <Button onPress={() => navigation.navigate('About')} style={Homestyle.button}>About</Button>
      <Button onPress={() => navigation.navigate('Contact')} style={Homestyle.button}>Contact</Button>     
    </Card.Actions>
    </Card>   
    </View>

    

    <View>
       <Card style={Homestyle.card1}>
       <Card.Content>
       <Title style={{textAlign:'center'}}>Welcome to FitnessBuddy</Title>
       <Paragraph style={{textAlign:'center'}}>Click Menu to Start your Fitness journey with Us! </Paragraph>
       </Card.Content>
       </Card>
    </View>
    
    <ScrollView>
    <Card style={Homestyle.card1}>
    <Card.Cover style={Homestyle.cardcover} resizeMode={`cover`} source={require('./asset/Fitnessbuddy.png')}/>
    <Card.Content>
      <Title>Food Recipe</Title>
      <Paragraph>Free healthy food recipe for Your fitness journey!</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button>Go</Button>
    </Card.Actions>
    
     </Card>
    <Card style={Homestyle.card1}>
    <Card.Cover style={Homestyle.cardcover} resizeMode={`cover`} source={require('./asset/COVER3.png')}/>
    <Card.Content>
      <Title>Gym Equipments</Title>
      <Paragraph>Different Uses of Gym Equipments</Paragraph>
    </Card.Content>
    <Card.Actions>
    <Button>Go</Button>
    </Card.Actions>
    </Card>

    <Card style={Homestyle.card1}>
    <Card.Cover style={Homestyle.cardcover} resizeMode={`cover`} source={require('./asset/bmi.png')}/>
    <Card.Content>
      <Title>BMI Calculator</Title>
      <Paragraph>Provides a fairly reliable indicator of body fatness for most people and is used to screen for weight categories that may lead to health problems.</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button>Go</Button>
    </Card.Actions>
    </Card>
    
    <Card style={Homestyle.card1}>
    <Card.Cover style={Homestyle.cardcover} resizeMode={`cover`} source={require('./asset/COVER1.png')}/>
    <Card.Content>
      <Title>Calorie Deficit Calculator</Title>
      <Paragraph>Help you discover how much weight is realistic for you to lose and the calories needed to achieve that weight loss</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button>Go</Button>
    </Card.Actions>
    </Card>

    <Card style={Homestyle.card2}>
    <Card.Cover style={Homestyle.cardcover} resizeMode={`cover`} source={require('./asset/COVER2.png')}/>
    <Card.Content>
      <Title>Workout Guide</Title>
      <Paragraph>Workout guides for all</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button>Go</Button>
    </Card.Actions>
    </Card>
    
    </ScrollView> 
   
 
</SafeAreaView>
    
   
    );

 };

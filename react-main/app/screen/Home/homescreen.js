import { SafeAreaView,Text,View,ImageBackground,Image,ScrollView} from 'react-native';
import { Card, TextInput,Button,Title,Paragraph} from 'react-native-paper';
import {Homestyle} from './home.style'
import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { AuthContext } from '../../../Context/authContext';


  
export const Homescreen = ({ navigation, route  }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const names = ['dekdek']
  const [state] = useContext(AuthContext)
  
    // Define a function to fetch the coach's name from your database

  
    return(
<SafeAreaView style={Homestyle.content}>
    <View>
    
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
    <ScrollView>
    <View>
       <Card style={Homestyle.card2}>
       <Card.Content>
       <Text style={Homestyle.titleText}>
       Welcome, {state.firstname}!
              </Text>
       <Paragraph style={{textAlign:'center'}}>Click Menu to Start your Fitness journey with Us! </Paragraph>
       </Card.Content>
       </Card>
    </View>

    

    

    <ScrollView horizontal={true}>

    <Card style={Homestyle.card1}>
    <Card.Cover style={Homestyle.cardcover} resizeMode={`cover`} source={require('./asset/fit1.jpg')}/>
     </Card>

    <Card style={Homestyle.card1}>
    <Card.Cover style={Homestyle.cardcover} resizeMode={`cover`} source={require('./asset/fit2.jpg')}/>
    </Card>

    <Card style={Homestyle.card1}>
    <Card.Cover style={Homestyle.cardcover} resizeMode={`cover`} source={require('./asset/fit3.jpg')}/>
    </Card>
    
    <Card style={Homestyle.card1}>
    <Card.Cover style={Homestyle.cardcover} resizeMode={`cover`} source={require('./asset/fit4.jpg')}/>
    </Card>

    <Card style={Homestyle.card1}>
    <Card.Cover style={Homestyle.cardcover} resizeMode={`cover`} source={require('./asset/fit5.jpg')}/>
    </Card>

    </ScrollView>

    </ScrollView> 
   
 
</SafeAreaView>
    
   
    );

 };

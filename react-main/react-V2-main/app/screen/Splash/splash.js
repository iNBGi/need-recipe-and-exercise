import { SafeAreaView,Text,View,ImageBackground,Image,ScrollView} from 'react-native';
import { Card, TextInput,Button,Title,Paragraph} from 'react-native-paper';
import {Splashstyle} from './splash.style'
import React, { useContext, useEffect, useState } from 'react';



  

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Add any additional setup or navigation logic if needed
    setTimeout(() => {
      navigation.replace('Login'); // Replace 'Home' with the name of your main screen
    }, 3000); // Set the duration of the splash screen in milliseconds
  }, [navigation]);

  return (
    <View style={Splashstyle.container}>
      <Text style={Splashstyle.text}>Your App Name</Text>
    </View>
  );
};


export default SplashScreen;
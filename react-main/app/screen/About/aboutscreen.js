import React from 'react';

import { SafeAreaView,Text,View,ImageBackground,Image} from 'react-native';
import { Card, TextInput,Button,Title,Paragraph} from 'react-native-paper';
import { Aboutstyle } from './about.style';


export const Aboutscreen = ({navigation}) => {
    return(
<SafeAreaView style={Aboutstyle.content}>
    <View>
    <Card >
       
        
       <Card.Actions  style={Aboutstyle.card}>
       <Image style={{width:35,height:35,marginRight: 5}}  source={require('./asset/blacklogo.png')}></Image>
       <Button onPress={() => navigation.navigate('Menu')}>Menu</Button>
      <Button onPress={() => navigation.navigate('Home')}>Home</Button>
      <Button onPress={() => navigation.navigate('About')}> About</Button>
      <Button onPress={() => navigation.navigate('Contact')}>Contact</Button>
      
      
    </Card.Actions>
   </Card>
   
   <View>
       <Card style={Aboutstyle.card1}>
       <Card.Content>
       <Title>About the Application</Title>
       <Paragraph>This app helps users to lose weight, maintain a healthy lifestyle, and know their body mass index (BMI) using a step-based approach. It walks you through three phases: weight management, calorie deficit, and weight maintenance. The user will be able to keep track of their progress and weigh themselves on the scale. </Paragraph>
       </Card.Content>
       </Card>
   </View>
    

    
   
   
    </View>
    
    
 
</SafeAreaView>
    
   
    );
 };

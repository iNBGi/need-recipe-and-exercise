import React from 'react';

import { SafeAreaView,Text,View,ImageBackground,Image,ScrollView} from 'react-native';
import { Card, TextInput,Button,Title,Paragraph} from 'react-native-paper';
import { Exerstyle } from './exer.screen';


export const Exerscreen = ({navigation}) => {
    return(
<SafeAreaView style={Exerstyle.content}>
    <View>
    <Card >
       <Card.Actions  style={Exerstyle.card}>
       <Image style={{width:35,height:35,marginRight: 5}}  source={require('./asset/blacklogo.png')}></Image>
       <Button onPress={() => navigation.navigate('Menu')}>Back</Button>     
    </Card.Actions>
    </Card>
   
 
    </View>
    <ScrollView>
       <View>
    <Card style={Exerstyle.card1}>
    <Card.Cover style={Exerstyle.cardcover} resizeMode={`cover`} source={require('./asset/3.png')}/>
    <Card.Content>
  <Title>Treadmill</Title>
</Card.Content>
    
     </Card>
    <Card style={Exerstyle.card1}>
    <Card.Cover style={Exerstyle.cardcover} resizeMode={`cover`} source={require('./asset/4.png')}/>
    <Card.Content>
      <Title>Treadmill</Title>
    </Card.Content>
    </Card>

    <Card style={Exerstyle.card1}>
    <Card.Cover style={Exerstyle.cardcover} resizeMode={`cover`} source={require('./asset/5.png')}/>
    <Card.Content>
      <Title>Barbel and Dumbell</Title>
    </Card.Content>
    </Card>
    
    <Card style={Exerstyle.card1}>
    <Card.Cover style={Exerstyle.cardcover} resizeMode={`cover`} source={require('./asset/6.png')}/>
    <Card.Content>
      <Title>Abdominal Bench</Title>
    </Card.Content>
    </Card>

    <Card style={Exerstyle.card1}>
    <Card.Cover style={Exerstyle.cardcover} resizeMode={`cover`} source={require('./asset/7.png')}/>
    <Card.Content>
      <Title>Workout Guide</Title>
    </Card.Content>
    </Card>
    
  
    </View> 
    </ScrollView> 

</SafeAreaView>

    
   
    );
 };

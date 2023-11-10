import React,{Component, useState} from 'react';
import { render } from 'react-dom';

import { SafeAreaView,Text,View,ImageBackground,Image} from 'react-native';
import { Card, TextInput,Button,Title,Paragraph} from 'react-native-paper';
import { Aboutstyle } from './about.style';

export default class Calculator extends Component
{
    constructor(props)
    {
        super(props);
        this.state={weight:0,height:0};
    }

    Sum =()=> 
    {
    var N1=parseInt(this.state.weight);
    var N2=parseInt(this.state.height);
    var R=N1/N2;
    
    }
    
}
export const Bmiscreen = ({navigation}) => {
    

    
    return(
<SafeAreaView style={Aboutstyle.content}>
    <View>
    <Card >
       
    
       <Card.Actions  style={Aboutstyle.card}>
       <Image style={{width:35,height:35,marginRight: 5}}  source={require('./asset/blacklogo.png')}></Image>
       <Button onPress={() => navigation.navigate('Menu')}>Back</Button>  
    </Card.Actions>
   </Card>
   
   <View>
       <Card style={Aboutstyle.card1}>
       <Card.Cover style={Aboutstyle.cardcover} resizeMode={`cover`} source={require('./asset/bmichart.jpg')}/>
       <Card.Content>
       <Title style={{ textAlign: 'center',}}>Enter Information</Title>
       
       <Text style={Aboutstyle.Text} >{"Weight : KG "}</Text>
       <TextInput style={{borderwidth:1, margin:10}} placeholder="weight" onChangeText={weight=> this.setState({weight})}/>
       <Text style={Aboutstyle.Text} >{"Height : KG "}</Text>
       <TextInput style={{borderwidth:1, margin:10}} placeholder="height" onChangeText={height=> this.setState({height})}/>
       <Button onPress={this.Sum} style={Aboutstyle.cardButton}>Calculate</Button>
       <Text style={Aboutstyle.Text} >{"BMI Result :"}</Text>
       
       
       </Card.Content>
       </Card>
   </View>
    

    
   
   
    </View>
    
    
 
</SafeAreaView>
    
   
    );
    
 };

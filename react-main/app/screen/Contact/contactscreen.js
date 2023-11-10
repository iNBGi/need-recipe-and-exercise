import React from 'react';

import { SafeAreaView,Text,View,ImageBackground,Image} from 'react-native';
import { Card, TextInput,Button,Title,Paragraph} from 'react-native-paper';
import { Aboutstyle, Contactstyle } from './contact.style';


export const Contactscreen = ({navigation}) => {
    return(
<SafeAreaView style={Contactstyle.content}>
    <View>
    <Card > 
       <Card.Actions  style={Contactstyle.card}>
       <Image style={{width:35,height:35,marginRight: 5}}  source={require('./asset/blacklogo.png')}></Image>
       <Button onPress={() => navigation.navigate('Menu')}>Menu</Button>
      <Button onPress={() => navigation.navigate('Home')}>Home</Button>
      <Button onPress={() => navigation.navigate('About')}> About</Button>
      <Button onPress={() => navigation.navigate('Contact')}>Contact</Button>
    </Card.Actions>
   </Card>
   
   <View>
       <Card style={Contactstyle.card1}>
       <Card.Content>
       <Title style={{ textAlign: 'center',}}>Contact Us!</Title>
       <Paragraph style={{ textAlign: 'center',}}>Any problem? Contact us. {'\n'} Telephone: 4481047 {'\n'} Phone: (639)361266318 {'\n'} Email: Fitnessbuddy@Gmail.com </Paragraph>
       </Card.Content>
       </Card>
       <Card style={Contactstyle.card1}>
       <Card.Content>
       <Title style={{ textAlign: 'center',}}>Be Part of The of Community</Title>
       <Paragraph style={{ textAlign: 'center',}}>Share your journey with us. {'\n'}Fb: Fitnessbuddy {'\n'}IG: @Fitnessbuddy {'\n'}Twitter: @Fitnessbuddy</Paragraph>
       </Card.Content>
       </Card>
   
    </View>
    

    
   
   
    </View>
    
    
 
</SafeAreaView>
    
   
    );
 };

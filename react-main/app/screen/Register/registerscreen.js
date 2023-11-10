
import React from 'react';
import { Alert, SafeAreaView, View} from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { loginStyle } from './login.style';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import axios from "axios";

export const Registerscreen = ({navigation}) => {  

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        try {
          setLoading(true);
          if (!firstname ||!lastname || !email || !password) {
            Alert.alert('Error','Please Fill All Fields');
            return;
          }
          setLoading(false);
          const { data } = await axios.post("http:10.0.2.2:3000/registering", {
            firstname,
            lastname,
            email,
            password,
          });
          if (data.success === true) {
            // Successful login
            alert(data && data.message);
          navigation.navigate('Login');
          console.log("Register Data==> ", { lastname,firstname, email, password });
          } 

        }
         catch (error) {
          // Handle network errors or other issues
          alert(error.response.data.message);
          setLoading(false);
          console.log(error);
        }

      };
   return (

        <SafeAreaView style={loginStyle.content}> 
        <View>

            <Card>
                <Card.Title title="Register" titleStyle={loginStyle.cardTitle}></Card.Title>
                <Card.Content>
                <TextInput label="Firstname" value={firstname}  onChangeText={(text) => setFirstname(text)}></TextInput>
                <TextInput label="Lastname" value={lastname} onChangeText={(text) => setLastname(text)}></TextInput>
                <TextInput label="Email" value={email} onChangeText={(text) => setEmail(text)}keyboardType="email-address"></TextInput>
                <TextInput label="Password" value={password} onChangeText={(text) => setPassword(text)}secureTextEntry={true}></TextInput>
                <Button uppercase={false} style={loginStyle.cardButton}>Forgot email/password</Button>
                <Button 
                mode="contained" 
                style={loginStyle.cardButton} onPress={handleSubmit}>
                Register
                </Button>
                <Button  style={loginStyle.cardButton} onPress={()=> navigation.navigate('Login')}>Login</Button>
                </Card.Content>                                                         
            </Card>
            </View>
        </SafeAreaView>
   );

   }

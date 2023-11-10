import { Alert, SafeAreaView, View} from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { loginStyle } from './login.style';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../../../Context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";


export const Loginscreen = ({navigation}) => {  
  const [state, setState] = useContext(AuthContext)
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [firstname, setFirstName] = useState('');
        const [loading, setLoading] = useState('false');
        const handleregister = async () => {
            const response = await axios.post('https://react-native-server-5j9t.onrender.com/register')
        }
        const handleLogin = async () => {
          
          try {
            setLoading(true);
          if (!username || !password) {
            // Check if either username or password is empty
            Alert.alert('Error', 'Please enter both username and password.');
            return;
          }
          setLoading(false);
          const {data} = await axios.post("https://react-native-server-5j9t.onrender.com/login", {username, password});
            if (data.success === true) {
              // Successful login
              
              setState(data)
              await AsyncStorage.setItem("@auth", JSON.stringify(data));
              alert(data && data.message);
              navigation.navigate('Home')
              console.log("Login Data ===>", (username, password))
            } 
            
          }
         
           catch (error) {
            // Handle network errors or other issues
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
          }
        };
        const getLocalStorageData = async () => {
            let data = await AsyncStorage.getItem("@auth");
            console.log ("Local Storage ==>", data);
        }
        getLocalStorageData();
   return (
    
       
    <SafeAreaView style={loginStyle.content}>
    <View>
      <Card>
        <Card.Title title="Login" titleStyle={loginStyle.cardTitle} />
        <Card.Content>
        <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
          <Button
            uppercase={false}
            style={loginStyle.cardButton}
            onPress={() => navigation.navigate('ForgotPassword')} // Navigate to the "ForgotPassword" screen
          >
            Forgot email/password
          </Button>
          <Button
            mode="contained"
            style={loginStyle.cardButton}
            onPress={handleLogin}
          >
            Login
          </Button>
          <Button
            style={loginStyle.cardButton}
            onPress={()=> navigation.navigate('Register')}
                
          >
            Register
          </Button>
        </Card.Content>
      </Card>
    </View>
  </SafeAreaView>
   );
    
   }
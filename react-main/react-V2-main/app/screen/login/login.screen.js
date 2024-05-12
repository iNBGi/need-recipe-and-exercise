import { Alert, SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { loginStyle } from './login.style';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../../../Context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Loginscreen = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null); // Add userData state
  const [loading, setLoading] = useState('false');
  const [showPassword, setShowPassword] = useState(false);
  
  const checkUserStatus = async () => {
    try {
      let storedUserData = await AsyncStorage.getItem("@auth"); 
      
      console.log("Stored Token:", storedUserData);
  
      if (storedUserData) {
        console.log("Token found, navigating to 'Homes'");
        setState((prevState) => ({ ...prevState, token: storedUserData }));
        navigation.replace("Homes");
      } else {
        console.log("Token not found, navigating to 'Login'");
        // Only navigate to the login screen if it's the first time checking
        if (!state.token) {
          navigation.replace("Login");
        }
      }
    } catch (error) {
      console.error("Error checking user status:", error);
      navigation.replace("Login");
    }
  };
  
  
  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!username || !password) {
        Alert.alert('Error', 'Please enter both username and password.');
        return;
      }
      setLoading(false);
      const { data } = await axios.post("https://serverrrr-3kbl.onrender.com/login", { username, password });
      if (data.success === true) {
        setState(data);
        setUserData(data); // Set the userData state
        console.log('Stored user data:', data);
        
        // Store the user data in AsyncStorage
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        
        // Display an alert
        alert(data && data.message);
        
        // Navigate to the 'Homes' screen
        navigation.navigate('Homes');
        
        console.log("Login Data ===>", (username, password));
      }
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  const getStoredUserData = async () => {
    // Get user data from AsyncStorage
   let storedUserData = await AsyncStorage.getItem("@auth"); 
    console.log("Stored User Data ==>", storedUserData);

    // If there is user data, parse it and set the userData state
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  };

  // UseEffect to call getStoredUserData when the component mounts
  useEffect(() => {
    getStoredUserData();
  }, []);

  return (
    <SafeAreaView style={loginStyle.container}>
      <View style={loginStyle.content}>
        <Card style={loginStyle.card}>
          <Card.Title title="PoseEase Login" titleStyle={loginStyle.cardTitle} />
          <Card.Content>
            <View style={loginStyle.inputContainer}>
              <Icon name="person" size={20} color="#007BFF" style={loginStyle.icon} />
              <TextInput
                style={loginStyle.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View style={loginStyle.inputContainer}>
              <Icon name="lock" size={20} color="#007BFF" style={loginStyle.icon} />
              <TextInput
                style={loginStyle.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity
                style={loginStyle.iconButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={20}
                  color="#007BFF"
                  style={{ backgroundColor: showPassword ? 'transparent' : '#fff' }}
                />
              </TouchableOpacity>
            </View>
            <Button
              uppercase={false}
              style={loginStyle.forgotButton}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              Forgot Email/Password
            </Button>
            <Button mode="contained" style={loginStyle.loginButton} onPress={handleLogin}>
              Login
            </Button>
            <Button
              style={loginStyle.registerButton}
              onPress={() => navigation.navigate('Register')}
            >
              Register
            </Button>

          
          
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};

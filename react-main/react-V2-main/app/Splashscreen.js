import React, { useContext, useEffect } from "react";
import { ActivityIndicator, View, Image, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import { AuthContext } from "../Context/authContext";

const SplashScreen = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);

  useEffect(() => {
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
          navigation.replace("Login");
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        navigation.replace("Login");
      }
    };

    checkUserStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="zoomIn"
        iterationCount={1}
        source={require("./poseee.png")}
        style={{ width: "90%", resizeMode: "contain", margin: 30 }}
      />
      <Animatable.Text
        animation="fadeInUp"
        iterationCount={1}
        style={styles.phrase}
      >
        Make workout easy
      </Animatable.Text>
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        easing="ease-out"
        style={styles.activityIndicatorContainer}
      >
        <ActivityIndicator
          color="#307ecc"
          size="large"
          style={styles.activityIndicator}
        />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  activityIndicatorContainer: {
    alignItems: "center",
  },
  activityIndicator: {
    height: 80,
  },
  phrase: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default SplashScreen;

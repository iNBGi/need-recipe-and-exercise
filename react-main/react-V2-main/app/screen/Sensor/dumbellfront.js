import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export const WelcomeToDumbellSensor = ({ onStart }) => {
  const navigation = useNavigation(); // Hook to access navigation object

  const handleStart = (level) => {
    onStart(level);
  };

  return (
    <View style={styles.container}>
      {/* Area for squat guide, notes, and procedures */}
      <View style={styles.cardContainer}>
        <View style={styles.cardContent}>
          {/* Add your input fields, text areas, or any other content here */}
          <Text style={styles.squatGuideText}>Welcome to dumbbell sensoe Sensor</Text>
          <Text style={styles.squatGuideText}>Please make sure that you are wearing a proper workout clothes for better detection</Text>
          <Text style={styles.squatGuideText}>Please position yourself in a well-lit area or studio for better detection</Text>
          <Text style={styles.squatGuideText}>Please stand away from the camera until your whole body is visible.</Text>
          <Text style={styles.squatGuideText}>Presume starting position for the workout.</Text>
          <Text style={styles.squatGuideText}>Press the level you desire to workout.</Text>
          <Text style={styles.squatGuideText}>Beginner - 10 reps</Text>
          <Text style={styles.squatGuideText}>Intermediate - 15 reps</Text>
          <Text style={styles.squatGuideText}>Experienced - 20 reps</Text>

        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Beginner" onPress={() => handleStart('beginner')} style={styles.button} />
        <Button title="Intermediate" onPress={() => handleStart('intermediate')} style={styles.button} />
        <Button title="Experienced"  onPress={() => handleStart('experienced')} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueBackground: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black', // Updated text color
  },
  countdownText: {
    color: 'black', // Updated text color
  },
  squatGuideText: {
    marginBottom: 20, // Increased space between lines
    fontSize: 20, // Increased font size
    textAlign: 'center',
    color: 'black', // Updated text color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#307ecc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
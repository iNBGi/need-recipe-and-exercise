import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const WelcomeToLungeSensor = ({ onStart }) => {
  const navigation = useNavigation();

  const handleStart = (level) => {
    onStart(level);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.cardContent}>
          <Text style={styles.lungeGuideText}>Welcome to Lunge Sensor</Text>
          <Text style={styles.lungeGuideText}>Please make sure that you are wearing proper workout clothes for better detection</Text>
          <Text style={styles.lungeGuideText}>Please position yourself in a well-lit area for better detection</Text>
          <Text style={styles.lungeGuideText}>Please stand away from the camera until your whole body is visible.</Text>
          <Text style={styles.lungeGuideText}>Presume starting position for the workout.</Text>
          <Text style={styles.lungeGuideText}>Press the level you desire to workout.</Text>
          <Text style={styles.squatGuideText}>Beginner - 10 reps</Text>
          <Text style={styles.squatGuideText}>Intermediate - 15 reps</Text>
          <Text style={styles.squatGuideText}>Experienced - 20 reps</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Beginner" onPress={() => handleStart('beginner')} style={styles.button} />
        <Button title="Intermediate" onPress={() => handleStart('intermediate')} style={styles.button} />
        <Button title="Experienced" onPress={() => handleStart('experienced')} style={styles.button} />
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
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    padding: 20,
  },
  lungeGuideText: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

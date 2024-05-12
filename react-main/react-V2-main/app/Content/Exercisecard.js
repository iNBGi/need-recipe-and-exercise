import { SafeAreaView,Text,View,ImageBackground,Image,ScrollView} from 'react-native';
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { RecipeContext } from "../../Context/recipeContext";
import { Menustyle } from "../screen/Recipe/menu.style";
import { Card, TextInput,Button,Title,Paragraph} from 'react-native-paper';
import Video from 'react-native-video';
import YoutubeIframe from 'react-native-youtube-iframe';

const ExerciseCard = ({exerciseinformations, exerciseId}) => {
    const navigation = useNavigation();
    const selectedExerciseInformation = exerciseinformations
   

  //handle delete prompt
  return (
    <SafeAreaView style={styles.content}>
      <ScrollView>
        <View style={styles.cardContainer}>
          <Card style={styles.card3}>
            <Card.Content>
              {selectedExerciseInformation ? (
                <>
                  <Title style={styles.title}>
                    {selectedExerciseInformation.exercise}
                  </Title>
                  <View style={styles.line}></View>

                  <YoutubeIframe
                    height={200}
                    videoId={selectedExerciseInformation.videolink}
                  />
                  <View style={styles.line}></View>

                  <Title style={styles.subtitle}>Description</Title>
                  <Paragraph style={styles.paragraph}>
                    {selectedExerciseInformation.description}
                  </Paragraph>
                  <View style={styles.line}></View>

                  <Title style={styles.subtitle}>Target muscles</Title>
                  <Paragraph style={styles.paragraph}>
                    {selectedExerciseInformation.muscle}
                  </Paragraph>
                  <View style={styles.line}></View>

                  <Title style={styles.subtitle}>Steps</Title>
                  <Paragraph style={styles.paragraph}>
                    {selectedExerciseInformation.steps}
                  </Paragraph>
                  <View style={styles.line}></View>
                </>
              ) : (
                <Text>Exercise information not found.</Text>
              )}
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  cardContainer: {
    margin: 10,
  },
  card3: {
    backgroundColor: '#fffff',
    borderRadius: 0,
    padding: 0,
    marginBottom: 0,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 12,
    marginVertical: 5,
  },
  title: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  paragraph: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
  },
};

export default ExerciseCard;
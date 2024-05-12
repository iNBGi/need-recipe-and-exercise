import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
  } from "react-native";
  import React, { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../../../Context/authContext";
import axios from "axios";
  import { RecipeContext } from "../../../Context/recipeContext";
import ExerciseCard from "../../Content/Exercisecard"
import { Aboutstyle } from "../Recipe/about.style";

export const ExerciseDetails = ({navigation, route}) => {
    const [loading, setLoading]= useState(false);
    const { exerciseId } = route.params;
    const [selectedexercise, setSelectedExercise] = useState([]);
    const selectedExercise = selectedexercise.find((exerciseinformations) => exerciseinformations.id === exerciseId);
   
    const getSelectedExercise = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("https://serverrrr-3kbl.onrender.com/exerciseinformation");
          setLoading(false);
          setSelectedExercise(data?.exerciseinformations);
        } catch (error) {
          setLoading(false);
          console.log(error);
          
        }
      };
      
      // inintal  posts
      useEffect(() => {
        getSelectedExercise();
      }, []);

      
    //global state
    return (
        <View style={Aboutstyle.content}>
        <ExerciseCard exerciseId = {exerciseId} exerciseinformations = {selectedExercise} />
      <View style={{ backgroundColor: "#ffffff" }}>
      </View>
    </View>
  );
     };


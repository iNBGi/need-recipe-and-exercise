import React, { useContext, useState, useEffect } from 'react';
import { FlatList, SafeAreaView, View, Text, Alert } from 'react-native';
import { Button, Card, TextInput, RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../Context/authContext';
import { loginStyle } from './login.style';
import { ProfileContext } from '../../../Context/profileinfocontext';
export const ProfileScreen = ({ navigation, route }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [state, setState] = useContext(AuthContext);
  const [bmi, setBMI] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isGoalOpen, setIsGoalOpen] = useState(isNewProfile || isEditMode);  // Updated
const [isActivityLevelOpen, setIsActivityLevelOpen] = useState(isNewProfile || isEditMode);  // Updated
const [isGenderOpen, setisGenderopen] = useState(isNewProfile || isEditMode);
const [isGenderRadioButtonDisabled, setIsGenderRadioButtonDisabled] = useState(true);
const userId = state?.user?.id;
  const [currentValue, setCurrentValue] = useState();
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(isNewProfile || isEditMode);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [existingData, setExistingData] = useState(null);
  const [isNewProfile, setIsNewProfile] = useState(false);
  const [, , , updateProfileInformation] = useContext(ProfileContext);
useEffect(() => {
  const fetchData = async () => {
    try {

      
      const { data } = await axios.get('https://serverrrr-3kbl.onrender.com/getProfile', {
        params: { userId },
      });

      if (data.success) {
        const profileData = data.profileinfo;
        if (profileData) {
          setWeight(profileData.weight.toString());
          setHeight(profileData.height.toString());
          setAge(profileData.age.toString());
          setBMI(profileData.bmi.toString());
          setCurrentValue(profileData.goal);
          setSelectedGoal(profileData.goal);
          setGender(profileData.gender);
          setIsDropdownDisabled(true); // Enable the dropdowns when there is existing data
          setIsGoalOpen(false);
          setIsActivityLevelOpen(false);
          setExistingData(profileData);
          setisGenderopen(false)
          setIsNewProfile(false);
          setIsGenderRadioButtonDisabled(false);
          console.log(profileData)
        } else {
          
          setIsNewProfile(true);
          setIsDropdownDisabled(false); // Enable the dropdowns when there is no existing data
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setIsNewProfile(true);
       
      } else {
        console.log(userId);
        console.error('Error fetching profile data:', error);
      }
    }
  };

  fetchData();
}, [userId]);

  useEffect(() => {
    if (weight && height && age) {
      calculateBMI();
    }
  }, [weight, height, age]);

  const calculateBMI = () => {
    const weightInKg = parseFloat(weight);
    const heightInM = parseFloat(height) / 100;
    const ageValue = parseInt(age);

    if (weightInKg && heightInM && ageValue) {
      const bmiValue = weightInKg / (heightInM * heightInM);
      setBMI(bmiValue.toFixed(2));

      let suggestedGoal = null;

      if (bmiValue < 18.5) {
        suggestedGoal = 'GW';
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        suggestedGoal = 'MW';
      } else {
        suggestedGoal = 'LW';
      }

      setCurrentValue(suggestedGoal);
      setSelectedGoal(suggestedGoal);

      setIsDropdownDisabled(false);
    }
  };

  const handleEdit = () => {
    if (existingData) {
      Alert.alert(
        'Confirm Edit',
        'Are you sure you want to edit your information?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              setIsEditMode(true);
              setIsDropdownDisabled(false);
              setIsGenderRadioButtonDisabled(false);
              setisGenderopen(false);
            },
          },
        ]
      );
    } else {
      setIsEditMode(true);
      setIsDropdownDisabled(false);
      setIsGenderRadioButtonDisabled(true);
      setisGenderopen(false);
    }
  };

  const calculateBMR = () => {
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageValue = parseInt(age);
    let bmr = 0;

    if (gender === 'male') {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageValue + 5;
    } else {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageValue - 161;
    }

    return bmr;
  };

  const calculateTotalCalories = (bmr) => {
    const activityFactors = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extraActive: 1.9,
    };

    const totalCalories = bmr * activityFactors[activityLevel];
    return totalCalories;
  };

  const handleCancel = () => {
    setWeight(existingData ? existingData.weight.toString() : '');
    setHeight(existingData ? existingData.height.toString() : '');
    setAge(existingData ? existingData.age.toString() : '');
    setBMI(existingData ? existingData.bmi.toString() : '');
    setCurrentValue(existingData ? existingData.goal : '');
    setSelectedGoal(existingData ? existingData.goal : '');
    setGender(existingData.gender);
    setIsDropdownDisabled(true);
    setIsEditMode(false);
    setisGenderopen(true);
    setIsGenderRadioButtonDisabled(true);
  };

  const handleSaveOrUpdate = async () => {
    try {
      setLoading(true);

      if (!validateInputs()) {
        setLoading(false);
        return;
      }

      const bmr = calculateBMR();
      const totalCalories = calculateTotalCalories(bmr);

      const requestData = {
        userId: userId,
        age: parseInt(age),
        weight: parseInt(weight),
        height: parseInt(height),
        bmi: parseFloat(bmi),
        goal: selectedGoal,
        gender: gender,
        activityLevel: activityLevel,
        calories: totalCalories,
      };

      console.log('Request Data:', requestData);

      const { data } = await axios.post('https://serverrrr-3kbl.onrender.com/bmiposting', requestData);

      if (data.success === true) {
        alert(data && data.message);
        console.log('Information Submitted/Updated:', requestData);
        await updateProfileInformation();

        setIsEditMode(false);
        fetchData();
      }
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    } finally {
      setIsEditMode(false);
    }
  };

  const validateInputs = () => {
    const parsedAge = parseInt(age, 10);
    const parsedHeight = parseInt(height, 10);
    const parsedWeight = parseInt(weight, 10);
    const parsedBMI = parseFloat(bmi);

    if (isNaN(parsedAge) || isNaN(parsedHeight) || isNaN(parsedWeight) || isNaN(parsedBMI)) {
      Alert.alert('Error', 'Please enter valid numeric values for Age, Height, Weight, and BMI');
      return false;
    }

    if (!selectedGoal) {
      Alert.alert('Error', 'Please choose a goal');
      return false;
    }

    return true;
  };

  const items = [
    { label: 'Gain Weight', value: 'GW' },
    { label: 'Maintain Weight', value: 'MW' },
    { label: 'Lose Weight', value: 'LW' },
  ];

  const handleLogout = async () => {
  try {
    // Clear user data from AsyncStorage
    await AsyncStorage.removeItem("@auth");
    
    // Clear the user and token state
    setState({
      user: null,
      token: "",
    });
    
    // Navigate to the 'Login' screen
    navigation.navigate("Login");
  } catch (error) {
    console.error('Error logging out:', error);
  }
};


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={['dummy']}
        keyExtractor={() => 'dummyKey'}
        renderItem={() => (
          <View style={{ flex: 1, marginBottom: 20 }}>
            <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 20 }}>
              Welcome {state?.user?.firstname}!
            </Text>
            <Card.Title />
            <Card.Content>
              <TextInput
                label="Weight (KG)"
                value={weight}
                onChangeText={(text) => setWeight(text)}
                editable={isEditMode || isNewProfile}
              />
              <TextInput
                label="Height (CM)"
                value={height}
                onChangeText={(text) => setHeight(text)}
                editable={isEditMode || isNewProfile}
              />
              <TextInput
                label="Age"
                value={age}
                onChangeText={(text) => setAge(text)}
                editable={isEditMode || isNewProfile}
              />

              {bmi && (
                <View>
                  <Text style={{ fontSize: 18, marginTop: 10 }}>
                    Your BMI: {bmi}
                  </Text>
                </View>
              )}

<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
  <Text>Gender:</Text>
  <RadioButton.Group onValueChange={(value) => setGender(value)} value={gender}>
    <RadioButton.Item label="Male" value="male" disabled={isGenderRadioButtonDisabled || !isEditMode} />
    <RadioButton.Item label="Female" value="female" disabled={isGenderRadioButtonDisabled || !isEditMode} />
  </RadioButton.Group>
</View>

              <View style={{ padding: 30 }}>
                <DropDownPicker
                  items={items}
                  open={isGoalOpen}
                  disabled={isDropdownDisabled || !isEditMode}
                  setOpen={() => setIsGoalOpen(!isGoalOpen)}
                  value={currentValue}
                  setValue={(val) => {
                    setCurrentValue(val);
                    setSelectedGoal(val);
                  }}
                  maxHeight={200}
                  autoScroll
                  placeholder="Choose Goal"
                />
              </View>

              <View style={{ padding: 30 }}>
                <DropDownPicker
                  items={[
                    { label: 'Sedentary', value: 'sedentary' },
                    { label: 'Lightly Active', value: 'lightlyActive' },
                    { label: 'Moderately Active', value: 'moderatelyActive' },
                    { label: 'Very Active', value: 'veryActive' },
                    { label: 'Extra Active', value: 'extraActive' },
                  ]}
                  open={isActivityLevelOpen}
                  disabled={isDropdownDisabled || !isEditMode}
                  setOpen={() => setIsActivityLevelOpen(!isActivityLevelOpen)}
                  value={activityLevel}
                  setValue={(val) => setActivityLevel(val)}
                  maxHeight={200}
                  autoScroll
                  placeholder="Choose Activity Level"
                />
              </View>

              {isEditMode ? (
                <View>
                  <Button
                    mode="contained"
                    style={[loginStyle.loginButton, { marginBottom: 20 }]}
                    onPress={handleSaveOrUpdate}
                  >
                    Save Updated Information
                  </Button>

                  <Button
                    mode="contained"
                    style={loginStyle.loginButton}
                    onPress={handleCancel}
                  >
                    Cancel
                  </Button>
                </View>
              ) : (
                <>
                  {existingData && (
                    <Button
                      mode="contained"
                      style={[loginStyle.loginButton, { marginBottom: 20 }]}
                      onPress={handleEdit}
                    >
                      Edit Information
                    </Button>
                  )}

                  {isNewProfile && (
                    <Button
                      mode="contained"
                      style={[loginStyle.loginButton, { marginBottom: 20 }]}
                      onPress={handleSaveOrUpdate}
                    >
                      Save Information
                    </Button>
                  )}
                </>
              )}

              <Button
                mode="contained"
                style={loginStyle.loginButton}
                onPress={handleLogout}
              >
                Logout
              </Button>
            </Card.Content>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
import React, { useContext } from 'react';
import { SafeAreaView,Image , ScrollView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { Homestyle } from './home.style';
import { AuthContext } from '../../../Context/authContext';
import { ProfileContext } from '../../../Context/profileinfocontext';
export const Homescreen = ({ navigation }) => {
  const [state] = useContext(AuthContext);
  const [profile] = useContext(ProfileContext);
  

  // Define your menu items here
  const menuItems = [
    { imageSource: require('./asset/Allrecipe.png'), title: 'Dietary Food ', screen: 'Recipescreen', description: 'Free Dietary Recipe for your fitness journey!' },
    { imageSource: require('./asset/SuggetedRecipe.png'), title: 'Suggested Foods', screen: 'FYRecipescreen', description: 'Suggested Dietary Recipe based on your goal!' },
    { imageSource: require('./asset/proj2.png'), title: 'Pose Detection', screen: 'Sensormenu', description: 'Pose Detection for different exercises!' },
    { imageSource: require('./asset/COVER2.png'), title: 'Workout Guide', screen: 'Exercisescreen', description: 'Workout guides for all!' },
  ];
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={Homestyle.menucard}
      onPress={() => navigation.navigate(item.screen)}
    >
   
      <Card.Cover
        style={Homestyle.menucardCover}
        resizeMode="cover"
        source={item.imageSource}
      />
      <Card.Content>
        <Title style={Homestyle.menucardTitle}>{item.title}</Title>
        <Paragraph style={Homestyle.menucardParagraph}>{item.description}</Paragraph>
        </Card.Content>
        
    </TouchableOpacity>
  
  );
  return (
    <SafeAreaView style={Homestyle.content}>
      <Card style={Homestyle.card2}>
       <Card.Content>
       <Text style={Homestyle.titleheader}>
    WELCOME {state?.user?.firstname ? state.user.firstname.toUpperCase() : ''}
</Text>

<View style={Homestyle.row}> 
<Text>
       Target Calories per Day: 
              </Text>
              <Text>
                
              {profile.calories}
              </Text>
</View>
<View style={Homestyle.row}> 
<Text>
       Goal: 
              </Text>
              <Text>
              {profile.goal}
              </Text>
</View>
<View style={Homestyle.row}> 
<Text>
       Activity Level: 
              </Text>
              <Text>
              {profile.activityLevel}
              </Text>
</View>
         
       </Card.Content>
       </Card>
       <FlatList
  data={menuItems}
  keyExtractor={(item) => item.screen}
  renderItem={renderItem}
  contentContainerStyle={Homestyle.menuContainer}
  numColumns={2}
/>
    </SafeAreaView>
  );
};

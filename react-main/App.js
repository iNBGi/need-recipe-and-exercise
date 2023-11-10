import React from 'react';
import  {Provider as PaperProvider, TextInput} from 'react-native-paper';
import  { AppNavigator } from './app/app.navigator';
import { Homescreen } from './app/screen/Home/homescreen';
import { Loginscreen } from './app/screen/login/login.screen';
import { Aboutscreen } from './app/screen/About/aboutscreen';


const App = () => {

  return (
    <PaperProvider>
      <AppNavigator/>
    </PaperProvider>

  );
};


export default App;
  

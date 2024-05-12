import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppNavigator } from './app/app.navigator';

const App = () => {
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
};

export default App;

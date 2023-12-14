import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStacks from './src/screens/AppStacks';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <AppStacks />
    </NavigationContainer>
  );
}

export default App;

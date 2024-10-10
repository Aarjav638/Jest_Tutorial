import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React, {lazy} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, View} from 'react-native';
import App from '../App';

export type RootStackParamList = {
  App: undefined;
  Home: undefined;
};

const home = lazy(() => import('../screens/home'));

const Stack = createNativeStackNavigator<RootStackParamList>();

const Loader = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const Navigation = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="App" component={App} />
          <Stack.Screen
            name="Home"
            component={home}
            options={{
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </React.Suspense>
  );
};

export default Navigation;

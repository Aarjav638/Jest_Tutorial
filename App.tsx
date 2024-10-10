import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CustomButton from './components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './components/Navigation';

type AppProp = NativeStackScreenProps<RootStackParamList, 'App'>;

const App = ({navigation}: AppProp) => {
  const [state, setState] = React.useState('Initial State');
  return (
    <View style={styles.container}>
      <Text>Testing App</Text>
      <CustomButton
        onPress={() => {
          console.log('Button Pressed');
          setState('Button Pressed');
          navigation.navigate('Home');
        }}
        label="My Custom Button"
      />
      <Text testID="State">{state}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

export default App;

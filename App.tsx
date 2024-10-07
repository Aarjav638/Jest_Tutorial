import {View, Text} from 'react-native';
import React from 'react';
import CustomButton from './components/CustomButton';

const App = () => {
  const [state, setState] = React.useState('Initial State');
  return (
    <View>
      <Text>Testing App</Text>
      <CustomButton
        onPress={() => {
          console.log('Button Pressed');
          setState('Button Pressed');
        }}
        label="My Custom Button"
      />
      <Text testID="State">{state}</Text>
    </View>
  );
};

export default App;

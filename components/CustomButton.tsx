import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

type CustomButtonProps = {
  onPress: () => void;
  label: string;
};

const CustomButton = ({onPress, label}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      testID="MyCustomButton">
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    elevation: 5,
    width: '80%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666fff',
  },
});

export default CustomButton;

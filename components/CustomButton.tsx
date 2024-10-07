import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

type CustomButtonProps = {
  onPress: () => void;
  label: string;
};

const CustomButton = ({onPress, label}: CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} testID="MyCustomButton">
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';

test('Button Clicked', () => {
  const mockOnPress = jest.fn();
  const {getByTestId} = render(
    <CustomButton onPress={mockOnPress} label="Test" />,
  );

  const button = getByTestId('MyCustomButton');
  fireEvent.press(button);
  expect(mockOnPress).toHaveBeenCalled();
});

import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import App from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/Navigation';
import {RouteProp} from '@react-navigation/native';

// Mock the navigation prop
const mockNavigation: Partial<
  NativeStackNavigationProp<RootStackParamList, 'App'>
> = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  canGoBack: jest.fn(),
  isFocused: jest.fn(),
};

// Mock the route prop
const mockRoute: RouteProp<RootStackParamList, 'App'> = {
  key: 'mock-key',
  name: 'App',
  params: undefined, // If there are params expected for the route, set them here
};

test('renders the UI correctly', () => {
  const tree = render(
    <App navigation={mockNavigation as any} route={mockRoute} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Changing States', () => {
  const {getByTestId, queryByTestId} = render(
    <App navigation={mockNavigation as any} route={mockRoute} />,
  );

  // Ensure initial state is "Initial State"
  const state = queryByTestId('State');
  expect(state?.props.children).toBe('Initial State');

  // Get the button and press it
  const button = getByTestId('MyCustomButton');
  fireEvent.press(button);

  // Ensure state has changed to "Button Pressed"
  expect(state?.props.children).toBe('Button Pressed');
});

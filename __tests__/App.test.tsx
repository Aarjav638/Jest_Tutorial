import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import App from '../App';

test('renders the UI correctly', () => {
  const tree = render(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Changing States', () => {
  const {getByTestId, queryByTestId} = render(<App />);

  const state = queryByTestId('State');

  expect(state?.props.children).toBe('Initial State');

  const button = getByTestId('MyCustomButton');

  fireEvent.press(button);

  expect(state?.props.children).toBe('Button Pressed');
});

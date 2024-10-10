import {render} from '@testing-library/react-native';
import Home from '../screens/home';
import React from 'react';
test('renders the UI correctly', () => {
  const tree = render(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});

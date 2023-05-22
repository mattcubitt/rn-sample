/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';

it('renders list', async () => {
  render(<App />);

  await waitFor(() => screen.getByTestId('herosList'));
  await waitFor(() => screen.getByTestId('villainsList'));

  fireEvent.press(screen.getByTestId('Batman'));
  fireEvent.press(screen.getByTestId('Joker'));

  fireEvent.press(screen.getByTestId('fightButton'));

  const winnerText = await screen.findByText('Hero Batman wins');

  expect(winnerText).toBeDefined();
});

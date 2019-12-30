import React from 'react';
import reactReduxFirebaseMock from 'react-redux-firebase';
import { render, fireEvent, screen } from '@testing-library/react';
import AppNavBar from './index';

jest.mock('react-redux-firebase', () => ({
  useFirebase: jest.fn().mockReturnValue({
    logout: jest.fn(),
  }),
}));

describe('App Nav Bar', () => {
  beforeEach(() => jest.clearAllMocks());

  test('that firebase logout is called when the logout button is pressed', () => {
    render(<AppNavBar />);

    fireEvent.click(screen.getByText(/Logout/i));

    expect(reactReduxFirebaseMock.useFirebase().logout).toHaveBeenCalled();
  });
});

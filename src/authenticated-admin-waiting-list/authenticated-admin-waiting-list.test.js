import React from 'react';
import reactReduxFirebaseMock from 'react-redux-firebase';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthenticatedAdminWaitingList from './index';

jest.mock('react-redux-firebase', () => ({
  useFirebase: jest.fn(() => {
    const retVal = {
      auth: () => {},
      app: () => {},
    };
    retVal.auth.GoogleAuthProvider = {};
    retVal.auth.GoogleAuthProvider.PROVIDER_ID = '';

    return retVal;
  }),
  isLoaded: jest.fn(),
  isEmpty: jest.fn(),
}));
jest.mock('react-redux');
jest.mock('../admin-waiting-list', () => () => (
  <div data-testid="admin-waiting-list" />
));
jest.mock('react-firebaseui/StyledFirebaseAuth', () => () => (
  <div data-testid="google-button" />
));

describe('Authenticated Admin Waiting List', () => {
  beforeEach(() => jest.clearAllMocks());

  test('that a google button is rendered if firebase auth data is empty and not loaded', () => {
    reactReduxFirebaseMock.isLoaded.mockReturnValue(false);
    reactReduxFirebaseMock.isEmpty.mockReturnValue(true);

    const { queryByTestId } = render(<AuthenticatedAdminWaitingList />);

    expect(queryByTestId('google-button')).toBeInTheDocument();
  });

  test('that the admin waiting list is shown if firebase auth data is loaded and not empty', () => {
    reactReduxFirebaseMock.isLoaded.mockReturnValue(true);
    reactReduxFirebaseMock.isEmpty.mockReturnValue(false);

    const { queryByTestId } = render(<AuthenticatedAdminWaitingList />);

    expect(queryByTestId('admin-waiting-list')).toBeInTheDocument();
  });

  test('that the a loading element is shown when data is not loaded but the auth creds not empty', () => {
    reactReduxFirebaseMock.isLoaded.mockReturnValue(false);
    reactReduxFirebaseMock.isEmpty.mockReturnValue(false);

    const { getByText } = render(<AuthenticatedAdminWaitingList />);

    expect(getByText(/Loading/i)).toBeInTheDocument();
  });
});

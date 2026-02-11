import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App Router', () => {
  test('renders the Home page by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Expect to see content from the Home component
    expect(screen.getByText(/home - react city map/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome to the modern react techbytes demo!/i)).toBeInTheDocument();
  });

  // You could add more tests here to navigate to other pages and verify their content
});

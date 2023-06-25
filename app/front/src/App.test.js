import { render, screen } from '@testing-library/react';
import GlobalLayout from './GlobalLayout';

test('renders learn react link', () => {
  render(<GlobalLayout />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

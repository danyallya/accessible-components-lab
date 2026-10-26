import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
describe('Inclusive Interface Lab', () => {
  it('renders the component audit workspace', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Design for everyone/i })).toBeInTheDocument();
  });
});

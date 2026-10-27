import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
describe('Inclusive Interface Lab', () => {
  it('renders the component audit workspace', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Design for everyone/i })).toBeInTheDocument();
    expect(screen.getByText(/SAMPLE AUDIT · NOT CONFORMANCE EVIDENCE/i)).toBeInTheDocument();
    expect(screen.getByText(/0 records · no manual testing claimed/i)).toBeInTheDocument();
    expect(screen.queryByText(/^PASS$/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/High contrast mode/i));
    expect(screen.getByText(/no contrast ratio has been measured/i)).toBeInTheDocument();
  });
});

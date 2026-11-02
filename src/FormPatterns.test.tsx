import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { FormPatterns, isValidNotificationEmail } from './FormPatterns';

afterEach(cleanup);

describe('FormPatterns', () => {
  it('keeps persistent help and a text status available before submission', () => {
    render(<FormPatterns />);
    const form = screen.getByRole('form', { name: 'Notification preferences' });

    expect(within(form).getByRole('textbox', { name: /Email address/i })).toHaveAttribute('aria-describedby', expect.stringContaining('form-pattern-email-help'));
    expect(within(form).getByText(/Help: updates are only sent/i)).toBeInTheDocument();
    expect(within(form).getByRole('status')).toHaveTextContent('No changes submitted yet.');
  });

  it('links an actionable error and focuses the invalid field', () => {
    render(<FormPatterns />);
    const form = screen.getByRole('form', { name: 'Notification preferences' });
    const email = within(form).getByRole('textbox', { name: /Email address/i });

    fireEvent.click(within(form).getByRole('button', { name: 'Save preference preview' }));

    expect(email).toHaveAttribute('aria-invalid', 'true');
    expect(within(form).getByText(/Error: enter a valid email address/i)).toBeInTheDocument();
    expect(within(form).getByRole('status')).toHaveTextContent('Error: fix the marked field before saving.');
    expect(document.activeElement).toBe(email);
  });

  it('reports a successful session-only update after a valid address', () => {
    render(<FormPatterns />);
    const form = screen.getByRole('form', { name: 'Notification preferences' });
    const email = within(form).getByRole('textbox', { name: /Email address/i });

    fireEvent.change(email, { target: { value: 'person@example.com' } });
    fireEvent.click(within(form).getByRole('button', { name: 'Save preference preview' }));

    expect(email).not.toHaveAttribute('aria-invalid', 'true');
    expect(within(form).getByRole('status')).toHaveTextContent('Success: preferences updated for this session only.');
  });

  it('accepts only simple, complete email addresses for the example', () => {
    expect(isValidNotificationEmail('person@example.com')).toBe(true);
    expect(isValidNotificationEmail('person@example')).toBe(false);
    expect(isValidNotificationEmail(' person@example.com ')).toBe(true);
  });
});

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ContrastCalculator } from './ContrastCalculator';

afterEach(cleanup);

describe('ContrastCalculator', () => {
  it('shows a calculated ratio and compares it with the selected threshold', () => {
    render(<ContrastCalculator />);
    expect(screen.getByText('Meets selected threshold')).toBeInTheDocument();
    expect(screen.getByText('15.910:1')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Foreground color'), { target: { value: '#777777' } });
    expect(screen.getByText('Below selected threshold')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Compare against'), { target: { value: 'text-large-aa' } });
    expect(screen.getByText('Meets selected threshold')).toBeInTheDocument();
  });

  it('identifies invalid colors and withholds the stale ratio', () => {
    render(<ContrastCalculator />);
    const foreground = screen.getByLabelText('Foreground color');
    fireEvent.change(foreground, { target: { value: 'transparent' } });

    expect(foreground).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Enter a valid 3- or 6-digit hex color.')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Enter valid hex colors to calculate a ratio.');
    expect(screen.queryByText('15.910:1')).not.toBeInTheDocument();
  });
});

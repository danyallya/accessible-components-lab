import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { KeyboardChecklist } from './KeyboardChecklist';
afterEach(cleanup);
describe('keyboard observation checklist', () => {
  it('starts untested and refuses empty evidence', () => {
    render(<KeyboardChecklist/>);
    expect(screen.getAllByRole('combobox').every(input => (input as HTMLSelectElement).value === 'not-run')).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Record keyboard session' }));
    expect(screen.getByRole('status')).toHaveTextContent('Add the browser/test environment');
    expect(screen.getByText(/0 session observations/)).toBeInTheDocument();
  });
  it('records explicit outcomes and focus notes then invalidates edited evidence', () => {
    render(<KeyboardChecklist/>);
    fireEvent.change(screen.getByLabelText(/Browser, OS/), { target: { value: 'Synthetic test environment, keyboard only' } });
    for (const notes of screen.getAllByRole('textbox').slice(1)) fireEvent.change(notes, { target: { value: 'Not run: example fixture only.' } });
    fireEvent.change(screen.getByLabelText('Outcome: Tab forward'), { target: { value: 'issue-found' } });
    fireEvent.change(screen.getByLabelText('Focus-order notes: Tab forward'), { target: { value: 'Synthetic issue: example control skipped.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Record keyboard session' }));
    expect(screen.getByText(/5 session observations · 1 issues · 4 not run/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Focus-order notes: Tab forward'), { target: { value: 'Changed draft' } });
    expect(screen.getByText(/0 session observations/)).toBeInTheDocument();
  });
});

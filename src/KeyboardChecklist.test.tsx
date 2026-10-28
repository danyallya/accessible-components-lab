import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { KeyboardChecklist } from './KeyboardChecklist';
afterEach(cleanup);
describe('keyboard observation checklist', () => {
  it('starts untested and refuses empty evidence', () => {
    render(<KeyboardChecklist/>);
    expect(screen.getAllByRole('combobox').every(input => (input as HTMLSelectElement).value === 'not-run')).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Record keyboard session' }));
    const environment = screen.getByLabelText(/Browser, OS/);
    expect(environment).toHaveAttribute('aria-invalid', 'true');
    expect(document.getElementById(environment.getAttribute('aria-describedby')!)).toHaveTextContent('Record the browser, assistive technology, or test environment.');
    expect(document.activeElement).toBe(environment);
    expect(screen.getByRole('status')).toHaveTextContent('6 fields need attention');
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
  it('identifies a missing scenario note, focuses it, and accepts the correction', () => {
    render(<KeyboardChecklist/>);
    fireEvent.change(screen.getByLabelText(/Browser, OS/), { target: { value: 'Synthetic browser, keyboard only' } });
    for (const notes of screen.getAllByRole('textbox').slice(1, -1)) fireEvent.change(notes, { target: { value: 'Not run: example fixture only.' } });
    const missingNote = screen.getByLabelText('Focus-order notes: Leave the component');
    fireEvent.click(screen.getByRole('button', { name: 'Record keyboard session' }));
    expect(missingNote).toHaveAttribute('aria-invalid', 'true');
    expect(document.getElementById(missingNote.getAttribute('aria-describedby')!)).toHaveTextContent('Record what was observed or why the test was not run.');
    expect(document.activeElement).toBe(missingNote);

    fireEvent.change(missingNote, { target: { value: 'Not run: left the sample with Tab and no trap was observed.' } });
    expect(missingNote).not.toHaveAttribute('aria-invalid');
    fireEvent.click(screen.getByRole('button', { name: 'Record keyboard session' }));
    expect(screen.getByText(/5 session observations · 0 issues · 5 not run/)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('no conformance claim');
  });
});

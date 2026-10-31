import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { StructureInspectionGuide } from './StructureInspectionGuide';

afterEach(cleanup);

describe('StructureInspectionGuide', () => {
  it('organizes the page-structure review into headings, landmarks, and names', () => {
    render(<StructureInspectionGuide />);
    const guide = screen.getByRole('region', { name: 'Inspect headings, landmarks, and names' });

    expect(within(guide).getByRole('heading', { name: 'Headings', level: 3 })).toBeInTheDocument();
    expect(within(guide).getByRole('heading', { name: 'Landmarks', level: 3 })).toBeInTheDocument();
    expect(within(guide).getByRole('heading', { name: 'Accessible names', level: 3 })).toBeInTheDocument();
    expect(within(guide).getByText(/multiple navigation landmarks, give each a short, distinct name/i)).toBeInTheDocument();
  });

  it('includes a labeled settings-form example and states the manual-review limits', () => {
    render(<StructureInspectionGuide />);

    expect(screen.getByText(/<main id="main-content">/)).toBeInTheDocument();
    expect(screen.getByText(/<label for="email">Email address<\/label>/)).toBeInTheDocument();
    expect(screen.getByText(/This guide does not inspect a page or record findings/i)).toBeInTheDocument();
    expect(screen.getByText(/do not establish WCAG conformance/i)).toBeInTheDocument();
  });
});

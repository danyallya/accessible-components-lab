import type { AuditRecord, ComponentRecord } from '../domain/audit';

export const sampleComponents: ComponentRecord[] = [
  { id: 'keyboard-access', name: 'Keyboard access', category: 'Interaction', status: 'needs-follow-up', summary: 'No keyboard test session has been recorded for this sample.' },
  { id: 'focus-visibility', name: 'Focus visibility', category: 'Visual', status: 'needs-follow-up', summary: 'Inspect the focus indicator with keyboard input; this demo is not evidence.' },
  { id: 'color-contrast', name: 'Color contrast', category: 'Visual', status: 'not-reviewed', summary: 'No contrast ratio is calculated by this sample.' },
];

export const sampleAuditRecord: AuditRecord = {
  id: 'sample-settings-audit',
  componentId: 'settings-form',
  title: 'Settings form review example',
  scope: 'Illustrative checklist for keyboard access, focus visibility, and contrast.',
  status: 'draft',
  evidence: [],
  limitations: [
    'This is fictional sample content; no manual or assistive technology review has been performed.',
    'A checklist or automated result does not establish accessibility conformance.',
  ],
  createdAt: '2026-10-27T00:00:00.000Z',
  isSample: true,
};

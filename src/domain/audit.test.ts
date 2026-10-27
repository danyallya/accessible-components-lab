import { describe, expect, it } from 'vitest';
import { sampleAuditRecord } from '../data/sampleAudit';
import { getComponentStatusLabel, validateAuditEvidence, validateAuditRecord } from './audit';

describe('Inclusive Interface Lab audit schemas', () => {
  it('keeps the sample audit explicitly draft with scope and limitations but no claimed evidence', () => {
    expect(sampleAuditRecord.isSample).toBe(true);
    expect(sampleAuditRecord.status).toBe('draft');
    expect(sampleAuditRecord.evidence).toHaveLength(0);
    expect(validateAuditRecord(sampleAuditRecord)).toEqual([]);
  });

  it('requires a scenario, environment, and written observation for evidence', () => {
    expect(validateAuditEvidence({
      id: 'evidence-1',
      method: 'keyboard',
      scenario: '',
      environment: '',
      outcome: 'not-run',
      notes: '',
      recordedAt: 'not-a-date',
    })).toEqual([
      { fieldPath: 'scenario', code: 'required', message: 'Describe the interaction scenario.' },
      { fieldPath: 'environment', code: 'required', message: 'Record the browser, assistive technology, or test environment.' },
      { fieldPath: 'notes', code: 'required', message: 'Record what was observed or why the test was not run.' },
      { fieldPath: 'recordedAt', code: 'format', message: 'Use a valid date and time for the evidence record.' },
    ]);
  });

  it('does not allow a recorded audit with no evidence and uses neutral component status labels', () => {
    const recorded = { ...sampleAuditRecord, status: 'recorded' as const };
    expect(validateAuditRecord(recorded)).toContainEqual(expect.objectContaining({
      fieldPath: 'evidence',
      code: 'evidence',
    }));
    expect(getComponentStatusLabel('needs-follow-up')).toBe('Follow-up needed');
    expect(getComponentStatusLabel('reviewed')).toBe('Review recorded');
  });
});

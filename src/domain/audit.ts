export const COMPONENT_STATUSES = ['not-reviewed', 'in-review', 'needs-follow-up', 'reviewed'] as const;
export type ComponentStatus = (typeof COMPONENT_STATUSES)[number];

export const AUDIT_STATUSES = ['draft', 'in-review', 'recorded'] as const;
export type AuditStatus = (typeof AUDIT_STATUSES)[number];

export const EVIDENCE_METHODS = ['automated-check', 'keyboard', 'screen-reader', 'zoom', 'lived-experience'] as const;
export type EvidenceMethod = (typeof EVIDENCE_METHODS)[number];

export const EVIDENCE_OUTCOMES = ['observed', 'issue-found', 'not-run'] as const;
export type EvidenceOutcome = (typeof EVIDENCE_OUTCOMES)[number];

export type AuditEvidence = {
  id: string;
  method: EvidenceMethod;
  scenario: string;
  environment: string;
  outcome: EvidenceOutcome;
  notes: string;
  recordedAt?: string;
};

export type AuditRecord = {
  id: string;
  componentId: string;
  title: string;
  scope: string;
  status: AuditStatus;
  evidence: AuditEvidence[];
  limitations: string[];
  createdAt: string;
  isSample: boolean;
};

export type ComponentRecord = {
  id: string;
  name: string;
  category: string;
  status: ComponentStatus;
  summary: string;
};

export type AuditValidationIssue = {
  fieldPath: string;
  code: 'required' | 'format' | 'evidence';
  message: string;
};

const isBlank = (value: string) => value.trim().length === 0;
const isTimestamp = (value: string) => value.length > 0 && Number.isFinite(Date.parse(value));

export function validateAuditEvidence(evidence: AuditEvidence): AuditValidationIssue[] {
  const issues: AuditValidationIssue[] = [];
  if (isBlank(evidence.id)) issues.push({ fieldPath: 'id', code: 'required', message: 'Give the evidence record an identifier.' });
  if (isBlank(evidence.scenario)) issues.push({ fieldPath: 'scenario', code: 'required', message: 'Describe the interaction scenario.' });
  if (isBlank(evidence.environment)) issues.push({ fieldPath: 'environment', code: 'required', message: 'Record the browser, assistive technology, or test environment.' });
  if (isBlank(evidence.notes)) issues.push({ fieldPath: 'notes', code: 'required', message: 'Record what was observed or why the test was not run.' });
  if (evidence.recordedAt && !isTimestamp(evidence.recordedAt)) {
    issues.push({ fieldPath: 'recordedAt', code: 'format', message: 'Use a valid date and time for the evidence record.' });
  }
  return issues;
}

export function validateAuditRecord(record: AuditRecord): AuditValidationIssue[] {
  const issues: AuditValidationIssue[] = [];
  if (isBlank(record.title)) issues.push({ fieldPath: 'title', code: 'required', message: 'Name this audit record.' });
  if (isBlank(record.componentId)) issues.push({ fieldPath: 'componentId', code: 'required', message: 'Choose the component under review.' });
  if (isBlank(record.scope)) issues.push({ fieldPath: 'scope', code: 'required', message: 'Describe what the audit covers.' });
  if (!isTimestamp(record.createdAt)) issues.push({ fieldPath: 'createdAt', code: 'format', message: 'Use a valid audit creation date.' });
  if (record.limitations.length === 0 || record.limitations.every(isBlank)) {
    issues.push({ fieldPath: 'limitations', code: 'required', message: 'Record what this audit does not establish.' });
  }
  if (record.status === 'recorded' && record.evidence.length === 0) {
    issues.push({ fieldPath: 'evidence', code: 'evidence', message: 'Add evidence before recording an audit session.' });
  }
  record.evidence.forEach((evidence, index) => {
    for (const issue of validateAuditEvidence(evidence)) {
      issues.push({ ...issue, fieldPath: `evidence.${index}.${issue.fieldPath}` });
    }
  });
  return issues;
}

export function getComponentStatusLabel(status: ComponentStatus): string {
  switch (status) {
    case 'not-reviewed': return 'Not reviewed';
    case 'in-review': return 'In review';
    case 'needs-follow-up': return 'Follow-up needed';
    case 'reviewed': return 'Review recorded';
  }
}

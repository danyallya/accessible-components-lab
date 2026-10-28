import { useState } from 'react';
import { validateAuditEvidence, type AuditEvidence, type EvidenceOutcome } from './domain/audit';

const scenarios = [
  ['forward', 'Tab forward', 'Reach every interactive control once in a logical reading order.'],
  ['backward', 'Shift+Tab backward', 'Reverse the same order without losing focus.'],
  ['visible', 'Visible focus', 'Identify focus in both themes and at browser zoom.'],
  ['activate', 'Activate controls', 'Use Enter/Space as appropriate; arrows operate the slider.'],
  ['escape', 'Leave the component', 'Move into and out of the sample without an unintended keyboard trap.'],
] as const;

export function KeyboardChecklist() {
  const [environment, setEnvironment] = useState('');
  const [entries, setEntries] = useState<Record<string, { outcome: EvidenceOutcome; notes: string }>>({});
  const [records, setRecords] = useState<AuditEvidence[]>([]);
  const [message, setMessage] = useState('');
  return <section className="keyboard-checklist" aria-labelledby="keyboard-title">
    <h2 id="keyboard-title">Keyboard navigation checklist</h2>
    <p>Session notes only. These observations do not establish conformance. Record actual focus order and limitations; select Not run when untested.</p>
    <form onSubmit={event => {
      event.preventDefault();
      const draft = scenarios.map(([id, title, expected]) => ({ id, method: 'keyboard' as const, scenario: `${title}: ${expected}`, environment,
        outcome: entries[id]?.outcome ?? 'not-run', notes: entries[id]?.notes ?? '', recordedAt: new Date().toISOString() }));
      if (draft.some(entry => validateAuditEvidence(entry).length)) {
        setMessage('Add the browser/test environment and notes or a not-run reason for every step.'); return;
      }
      setRecords(draft); setMessage('Five keyboard observations recorded for this session; no conformance claim.');
    }}>
      <label htmlFor="keyboard-environment">Browser, OS and assistive technology (or none)</label>
      <input id="keyboard-environment" value={environment} onChange={event => { setEnvironment(event.target.value); setRecords([]); setMessage(''); }} placeholder="Example: browser/version, OS, keyboard only"/>
      <ol>{scenarios.map(([id, title, expected]) => <li key={id}><h3>{title}</h3><p>{expected}</p>
        <label htmlFor={`result-${id}`}>Outcome: {title}</label>
        <select id={`result-${id}`} value={entries[id]?.outcome ?? 'not-run'} onChange={event => {
          setEntries(current => ({ ...current, [id]: { notes: current[id]?.notes ?? '', outcome: event.target.value as EvidenceOutcome } })); setRecords([]); setMessage('');
        }}><option value="not-run">Not run</option><option value="observed">Observed</option><option value="issue-found">Issue found</option></select>
        <label htmlFor={`notes-${id}`}>Focus-order notes: {title}</label>
        <textarea id={`notes-${id}`} value={entries[id]?.notes ?? ''} onChange={event => {
          setEntries(current => ({ ...current, [id]: { outcome: current[id]?.outcome ?? 'not-run', notes: event.target.value } })); setRecords([]); setMessage('');
        }} placeholder="Actual order, expected/observed difference, or why not run"/>
      </li>)}</ol>
      <button type="submit">Record keyboard session</button><p role="status">{message}</p>
    </form>
    <p>{records.length} session observations · {records.filter(entry => entry.outcome === 'issue-found').length} issues · {records.filter(entry => entry.outcome === 'not-run').length} not run</p>
  </section>;
}

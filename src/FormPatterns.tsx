import { useState } from 'react';
import { Button, FormControlLabel, Switch, TextField } from '@mui/material';
import { FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

export type FormFeedbackStatus = 'idle' | 'error' | 'success';

export function isValidNotificationEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function FormPatterns() {
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [status, setStatus] = useState<FormFeedbackStatus>('idle');
  const [weeklySummary, setWeeklySummary] = useState(true);
  const emailError = emailTouched && !isValidNotificationEmail(email);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailTouched(true);

    if (!isValidNotificationEmail(email)) {
      setStatus('error');
      document.getElementById('form-pattern-email')?.focus();
      return;
    }

    setStatus('success');
  };

  return (
    <section className="form-patterns" aria-labelledby="form-patterns-title">
      <header className="form-patterns-heading">
        <div>
          <span className="lab-overline">PATTERN EXAMPLE · FORMS</span>
          <h2 id="form-patterns-title">Give every form state a clear next step</h2>
        </div>
        <span className="form-patterns-tag">ERROR · STATUS · HELP</span>
      </header>

      <p className="form-patterns-intro">
        Pair a visible label with persistent help, a linked error message and a text status. The example below validates before it reports a session-only preview update.
      </p>

      <div className="form-pattern-grid">
        <article className="form-pattern-card">
          <span className="lab-overline">INTERACTIVE EXAMPLE</span>
          <h3 id="notification-preferences-title">Notification preferences</h3>
          <form aria-labelledby="notification-preferences-title" noValidate onSubmit={submitForm}>
            <TextField
              id="form-pattern-email"
              fullWidth
              size="small"
              type="email"
              label="Email address"
              value={email}
              required
              error={emailError}
              helperText={emailError ? 'Error: enter a valid email address, such as you@example.com.' : 'Help: updates are only sent when you request them.'}
              inputProps={{ 'aria-describedby': 'form-pattern-email-helper-text form-pattern-email-help' }}
              onBlur={() => setEmailTouched(true)}
              onChange={event => {
                setEmail(event.target.value);
                setStatus('idle');
              }}
            />
            <p id="form-pattern-email-help" className="form-pattern-help">
              We will not send or store this sample address; it only demonstrates form feedback.
            </p>

            <FormControlLabel
              control={<Switch checked={weeklySummary} onChange={event => setWeeklySummary(event.target.checked)} inputProps={{ 'aria-describedby': 'weekly-summary-help' }} size="small" />}
              label="Weekly summary"
            />
            <p id="weekly-summary-help" className="form-pattern-help">Help: explain what changing this preference affects.</p>

            <p className={`form-pattern-status ${status}`} role="status" aria-live="polite" aria-atomic="true">
              {status === 'error' && <FiAlertCircle aria-hidden="true" />}
              {status === 'success' && <FiCheckCircle aria-hidden="true" />}
              {status === 'idle' && <FiInfo aria-hidden="true" />}
              <span>{status === 'error' ? 'Error: fix the marked field before saving.' : status === 'success' ? 'Success: preferences updated for this session only.' : 'No changes submitted yet.'}</span>
            </p>

            <Button type="submit" variant="contained">Save preference preview</Button>
          </form>
        </article>

        <aside className="form-pattern-anatomy" aria-labelledby="form-pattern-anatomy-title">
          <span className="lab-overline">PATTERN ANATOMY</span>
          <h3 id="form-pattern-anatomy-title">What to inspect</h3>
          <ul>
            <li><b>Error</b><span>Use `aria-invalid`, a linked message and a concrete correction.</span></li>
            <li><b>Status</b><span>State the result in words; color and icons are supporting cues only.</span></li>
            <li><b>Help text</b><span>Keep instructions next to the control and explain its impact.</span></li>
          </ul>
        </aside>
      </div>

      <p className="form-patterns-limit">
        This is a synthetic preview, not a delivery or conformance result. Test the complete flow with keyboard, zoom and assistive technology in a named environment; no address or preference is persisted.
      </p>
    </section>
  );
}

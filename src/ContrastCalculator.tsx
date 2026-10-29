import { useMemo, useState } from 'react';
import { CONTRAST_CRITERIA, getContrastRatio, isValidHexColor, normalizeHexColor, type ContrastCriterionId } from './domain/contrast';

const initialForeground = '#222222';
const initialBackground = '#FFFFFF';

export function ContrastCalculator() {
  const [foreground, setForeground] = useState(initialForeground);
  const [background, setBackground] = useState(initialBackground);
  const [criterionId, setCriterionId] = useState<ContrastCriterionId>('text-normal-aa');

  const foregroundValid = isValidHexColor(foreground);
  const backgroundValid = isValidHexColor(background);
  const criterion = CONTRAST_CRITERIA.find((item) => item.id === criterionId)!;
  const ratio = useMemo(
    () => getContrastRatio(foreground, background),
    [foreground, background],
  );

  return (
    <section className="contrast-calculator" aria-labelledby="contrast-calculator-title">
      <div className="contrast-heading">
        <div>
          <span className="lab-overline">COLOR CHECK · NUMERIC COMPARISON</span>
          <h2 id="contrast-calculator-title">Check a color pair</h2>
        </div>
        <span className="contrast-tag">WCAG 2 ratio</span>
      </div>
      <p className="contrast-intro">
        Enter two opaque sRGB hex colors to calculate their contrast ratio and compare it with one selected threshold.
      </p>

      <div className="contrast-grid">
        <div className="contrast-color-fields">
          <div className="contrast-field">
            <label htmlFor="contrast-foreground">Foreground color</label>
            <input
              id="contrast-foreground"
              type="text"
              value={foreground}
              onChange={(event) => setForeground(event.target.value)}
              placeholder="#222222"
              maxLength={7}
              autoComplete="off"
              spellCheck={false}
              aria-invalid={!foregroundValid}
              aria-describedby={foregroundValid ? 'contrast-foreground-help' : 'contrast-foreground-help contrast-foreground-error'}
            />
            <small id="contrast-foreground-help">Use #RGB or #RRGGBB.</small>
            {!foregroundValid && <small className="contrast-error" id="contrast-foreground-error">Enter a valid 3- or 6-digit hex color.</small>}
          </div>
          <div className="contrast-field">
            <label htmlFor="contrast-background">Background color</label>
            <input
              id="contrast-background"
              type="text"
              value={background}
              onChange={(event) => setBackground(event.target.value)}
              placeholder="#FFFFFF"
              maxLength={7}
              autoComplete="off"
              spellCheck={false}
              aria-invalid={!backgroundValid}
              aria-describedby={backgroundValid ? 'contrast-background-help' : 'contrast-background-help contrast-background-error'}
            />
            <small id="contrast-background-help">Use #RGB or #RRGGBB.</small>
            {!backgroundValid && <small className="contrast-error" id="contrast-background-error">Enter a valid 3- or 6-digit hex color.</small>}
          </div>
        </div>

        <div className="contrast-evaluation">
          <label htmlFor="contrast-criterion">Compare against</label>
          <select
            id="contrast-criterion"
            value={criterionId}
            onChange={(event) => setCriterionId(event.target.value as ContrastCriterionId)}
          >
            {CONTRAST_CRITERIA.map((item) => (
              <option value={item.id} key={item.id}>{item.label} ({item.ratio}:1)</option>
            ))}
          </select>
          <p className="contrast-criterion-note">
            WCAG large text means at least 18 pt regular or 14 pt bold. Confirm size and weight separately before choosing that target.
          </p>
          <div className="contrast-preview" style={{ color: normalizeHexColor(foreground) ?? undefined, backgroundColor: normalizeHexColor(background) ?? undefined }}>
            <span className="contrast-preview-caption">Preview</span>
            <strong>Aa</strong>
            <span>Sample text on this background</span>
          </div>
        </div>
      </div>

      <div className="contrast-result" aria-live="polite" aria-atomic="true">
        {ratio === null ? (
          <p role="status">Enter valid hex colors to calculate a ratio.</p>
        ) : (
          <>
            <div>
              <span className="contrast-result-label">Calculated contrast ratio</span>
              <strong className="contrast-ratio">{ratio.toFixed(3)}:1</strong>
            </div>
            <div className={ratio >= criterion.ratio ? 'contrast-outcome meets' : 'contrast-outcome below'}>
              <b>{ratio >= criterion.ratio ? 'Meets' : 'Below'} selected threshold</b>
              <span>{criterion.ratio}:1 · {criterion.label}</span>
            </div>
          </>
        )}
      </div>
      <p className="contrast-limitation">
        A ratio is only a color-value comparison. Check the applicable text size, opacity, states and surrounding content yourself; this result does not establish accessibility or WCAG conformance.
      </p>
    </section>
  );
}

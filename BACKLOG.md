# 30-day delivery plan
## Daily operating loop
Review prior code and Git diff, inspect the backlog and debug defects. Add/update tests for changed interaction behavior, implement today's ticket, run tests/typecheck/build, update docs and backlog, and leave tomorrow prepared. Record unavailable checks with reason; continue static review. Add findings with severity and evidence.

## Foundation status
Day 00 MUI-based audit workspace, interactive theme/contrast/text-scale samples, PWA scaffold and smoke test are present. Dependencies and lockfile are installed; smoke test (1/1), typecheck and production build passed. This Vite template has no standalone lint script. Nexus .npmrc is local and ignored.

## Daily tickets
### Day 00 verification
Nexus returned 404 for packages used by this project. Following the user's approval, dependencies were installed with npmjs fallback; the ignored local .npmrc keeps Nexus as default and contains only required scope overrides. Day 01 has not started.

| Day | Deliverable |
|---|---|
| 01 | **Done** — define typed audit/component/evidence schemas and validation; label demo statuses as unverified and expose evidence limitations. |
| 02 | **Done** — keyboard checklist records session-only outcomes and focus notes, identifies invalid fields, and directs focus to the first error. Actual sample keyboard/assistive-technology/zoom checks remain unclaimed. |
| 03 | Implementation and local review complete — contrast calculator for opaque sRGB hex inputs, relative luminance, selectable WCAG 2.2 thresholds and explicit limits; GitHub PR/panel delivery in progress. |
| 04 | Add heading, landmark and accessible-name inspection guide. |
| 05 | Add form error, status and help-text patterns. |
| 06 | Add dialog and menu keyboard interaction scenarios. |
| 07 | Review first-week checks, test interactions and clarify non-conformance claims. |
| 08 | Add pattern detail pages with code, expected behavior and pitfalls. |
| 09 | Add reusable manual test session and evidence capture. |
| 10 | Add issue severity, owner and remediation tracking. |
| 11 | Add audit history and before/after resolution notes. |
| 12 | Add test matrix for browser, zoom, keyboard and screen reader. |
| 13 | Add team comments and accessible review checklist. |
| 14 | Review data model and evidence privacy; add regressions. |
| 15 | Add CSV and XLSX export for audit findings. |
| 16 | Add print/PDF report with scope and methodology caveats. |
| 17 | Add component library import metadata and version history. |
| 18 | Add reusable audit templates for forms, navigation and tables. |
| 19 | Refine mobile review flow and responsive check cards. |
| 20 | Audit both themes, contrast and text resizing at 200% zoom. |
| 21 | Conduct keyboard and screen-reader pass with documented findings. |
| 22 | Add offline PWA support for read-only patterns and local drafts. |
| 23 | Add issue search, filtering and remediation dashboard. |
| 24 | Add high-contrast, reduced-motion and forced-colors test guidance. |
| 25 | Add import/export of versioned audit project files. |
| 26 | Add secure evidence attachment rules and data-retention guidance. |
| 27 | Review every pattern with a manual test plan and user review notes. |
| 28 | Run regression tests across checklist and report workflows. |
| 29 | Complete methodology, keyboard guide and responsible-use docs. |
| 30 | Release-candidate review, all checks, known limits and release notes. |

Mark each day Done, In progress or Blocked. Include evidence and prepare the next day's work.

- Day 01: Done. Audit records now require scope/limitations, recorded sessions require evidence, and the demo states explicitly that no manual testing or conformance result is claimed; next is Day 02, keyboard navigation checklist and focus-order notes.
- Review carry-over after Day 02: the keyboard checklist captures session notes, but real keyboard/assistive-technology/zoom testing of the sample is still unperformed; revisit with the browser/device matrix on Day 21.

## Process change effective Day 02 — 2026-10-27

Apply [DELIVERY-POLICY.md](DELIVERY-POLICY.md) to every remaining ticket: finish Inclusive Interface Lab before the next repository, use meaningful scope-driven commits and deliver through its own reviewed PR. A blocked external gate needs a concrete record and next action. This adds delivery gates without moving Day 02–30 product work or changing completed history.

## Contribution integration — 2026-10-27

Effective Day 02: apply [CONTRIBUTING.md](CONTRIBUTING.md) inside existing tickets. At already scheduled weekly reviews, assess real feedback such as a component keyboard/focus case naming browser, assistive technology and observed behavior; at documentation/setup tickets, improve a component-specific accessible example with limitations. Day 30 records actual contribution evidence and outstanding external dependencies. No day is renumbered and no quota or badge is a completion criterion. Next scope: Day 04 — heading, landmark and accessible-name inspection guide.

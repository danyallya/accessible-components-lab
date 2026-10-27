# Inclusive Interface Lab

The Inclusive Interface Lab helps product teams review and improve the components they ship. It is intended for designers, engineers and accessibility partners who need a shared, practical place to inspect interaction patterns and record quality checks.

## Foundation
The workspace presents keyboard access, focus visibility and contrast checks alongside an interactive sample settings form. High-contrast and text-scale controls demonstrate how product decisions affect real components. Material UI supplies the accessible component primitives; React Icons supports navigation and review cues.

The current checks are an interface foundation, not a formal compliance result. They do not replace manual review, assistive technology testing or evaluation by people with disabilities. The roadmap adds pattern documentation, test scenarios, audit evidence, exports, PWA support and team review workflows.

## Run locally
Use Node.js 20 or newer. The project-local `.npmrc` is ignored by Git because registry configuration is machine-specific. Use `npm ci`; npmjs is an approved fallback if a configured mirror is missing a dependency.

    npm ci
    npm run dev

Run npm test, npm run typecheck and npm run build before a release. Keep examples keyboard operable, use semantic labels, preserve zoom and avoid color-only status meaning.

## Responsible use
Treat automated checks as evidence for investigation, not a pass certificate. Record the browser, assistive technology and tested flow for each manual audit. Include diverse users in product review, and do not store sensitive audit notes without a clear retention policy.

### Audit record and evidence contract
`src/domain/audit.ts` defines audit lifecycle, component review status, evidence method/outcome, and validation issue types. Each evidence record identifies the scenario, environment, outcome, notes and optional timestamp; a recorded audit requires evidence and must retain its limitations. The included audit is explicitly fictional, remains a draft with no evidence, and makes no claim of WCAG or other conformance.

## Delivery and review

Inclusive Interface Lab requires scenario/environment evidence for keyboard and assistive-technology behavior, clear unresolved findings and explicit limits on any conformance claim. Follow [DELIVERY-POLICY.md](DELIVERY-POLICY.md) from Day 02 for sequential execution, scope-driven commits and this repository's separate branch/PR with GitHub panel review and merge.

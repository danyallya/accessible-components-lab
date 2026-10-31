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

## Contributions and examples

See [CONTRIBUTING.md](CONTRIBUTING.md) for reproducible reports, genuine collaboration and product examples such as a component-specific accessible example with limitations. Contributions follow the product backlog and reviewed PR workflow.

## Keyboard checklist and focus-order notes

The session-only checklist covers forward/reverse Tab order, visible focus, native control activation and leaving the sample without a trap. Every outcome defaults to Not run. Recording requires the browser/OS/assistive-technology environment and observed focus-order notes or a not-run reason for every step, using the existing evidence validator. Invalid environment and scenario-note fields receive linked error text, and focus moves to the first invalid field; correcting a field clears only its own error. Editing the draft invalidates its recorded snapshot. Counts distinguish observations, issues and untested steps; they never mark a component conformant or alter the original fictional audit. No notes are saved/uploaded. The checklist form was verified in a 390px browser viewport, but actual keyboard, assistive-technology and zoom behavior in the sample remains untested; synthetic DOM tests establish form behavior only.

## Color contrast calculator

The calculator accepts opaque `#RGB` or `#RRGGBB` sRGB values, shows a live color sample, computes relative luminance and contrast ratio, and compares the number with a selected WCAG 2.2 threshold. Choices cover normal and large text at AA and AAA, plus the 3:1 non-text contrast threshold for applicable user-interface components and meaningful graphics. WCAG defines large text as at least 18 pt regular or 14 pt bold; the user must confirm that definition and the criterion's applicability. [WCAG 2.2 Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [Contrast Enhanced](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html), [Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), and the [relative luminance definition](https://www.w3.org/TR/WCAG22/#dfn-relative-luminance) describe the criteria and calculation.

The ratio and threshold comparison are arithmetic only. The calculator does not interpret font size/weight, opacity, state, images, exceptions, surrounding colors or the meaning of a graphical object, and it does not establish accessibility or WCAG conformance. Inputs remain in page state and are not saved or uploaded.

## Heading, landmark and accessible-name inspection guide

The settings-form example shows how to inspect a page heading and section headings, the header/navigation/main landmarks, a visible form label associated with its input, and the text name of its action. Use a browser accessibility tree or a screen reader to compare the exposed structure and names with the visible interface; this guide does not scan pages or record findings. Record the actual browser, assistive technology, steps and observations when testing. A checklist result is evidence for review, not a WCAG conformance claim.

The review follows W3C WAI guidance for [headings](https://www.w3.org/WAI/tutorials/page-structure/headings/), [labeling page regions](https://www.w3.org/WAI/tutorials/page-structure/labels/) and [labeling form controls](https://www.w3.org/WAI/tutorials/forms/labels/). Use visible labels where possible, give same-type navigation landmarks distinct names when there are multiple, and leave the unique main landmark identifiable without an unnecessary extra label.

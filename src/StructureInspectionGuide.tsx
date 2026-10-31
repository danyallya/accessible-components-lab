const settingsExample = `<header>
  <a href="#main-content">Skip to content</a>
</header>
<nav aria-label="Workspace">
  <a href="/overview">Overview</a>
</nav>
<main id="main-content">
  <h1>Workspace settings</h1>
  <form aria-labelledby="notifications-heading">
    <h2 id="notifications-heading">Notifications</h2>
    <label for="email">Email address</label>
    <input id="email" name="email" type="email" autocomplete="email">
    <button type="submit">Save preferences</button>
  </form>
</main>`;

export function StructureInspectionGuide() {
  return (
    <section className="inspection-guide" aria-labelledby="inspection-guide-title">
      <header className="inspection-guide-heading">
        <div>
          <span className="lab-overline">MANUAL REVIEW · PAGE STRUCTURE</span>
          <h2 id="inspection-guide-title">Inspect headings, landmarks, and names</h2>
        </div>
        <span className="inspection-guide-tag">INSPECTION GUIDE</span>
      </header>

      <p className="inspection-guide-intro">
        Review the rendered page with browser accessibility tools and assistive technology. Compare what users can see with the structure and names exposed to them.
      </p>

      <div className="inspection-guide-grid">
        <article className="inspection-guide-step">
          <span className="inspection-step-number">01</span>
          <h3>Headings</h3>
          <ul>
            <li>Open the heading list and check that headings describe the content that follows.</li>
            <li>Follow the content hierarchy with heading levels; avoid skipping levels when moving into a subsection.</li>
            <li>Confirm visual text styled as a heading is also marked up as a heading.</li>
          </ul>
        </article>

        <article className="inspection-guide-step">
          <span className="inspection-step-number">02</span>
          <h3>Landmarks</h3>
          <ul>
            <li>Inspect the landmark list for the page header, navigation, main content, and footer where present.</li>
            <li>Use the single main landmark to identify the primary content; it usually needs no extra label.</li>
            <li>When a page has multiple navigation landmarks, give each a short, distinct name.</li>
          </ul>
        </article>

        <article className="inspection-guide-step">
          <span className="inspection-step-number">03</span>
          <h3>Accessible names</h3>
          <ul>
            <li>Inspect form controls and actions in the accessibility tree, including icon-only controls.</li>
            <li>Confirm each name explains the control's purpose and agrees with its visible label.</li>
            <li>Prefer a visible, associated label or button text; use ARIA when visible text cannot provide the name.</li>
          </ul>
        </article>
      </div>

      <div className="inspection-guide-example">
        <div>
          <span className="lab-overline">PRODUCT EXAMPLE · SETTINGS FORM</span>
          <h3>Follow the page from its header to its action</h3>
          <p>
            The example has a skip link, a named workspace navigation landmark, one main region, a page heading, a labeled form section, an explicitly associated email label, and a text button.
          </p>
        </div>
        <pre><code>{settingsExample}</code></pre>
      </div>

      <p className="inspection-guide-limit">
        This guide does not inspect a page or record findings. Test the actual interface in a named browser and assistive-technology environment; record the steps and observed result in the session checklist below. These checks do not establish WCAG conformance.
      </p>
    </section>
  );
}

# Relavia — official website (relavia.github.io)

The official website of **Relavia**, an open-source, non-profit,
all-protocol proxy client. Main project repository:
<https://github.com/relavia/relavia>

- Preview (GitHub Pages, organization site): <https://relavia.github.io/>
- The custom domain `relavia.org` is **not registered yet**; when it is,
  see [CUSTOM-DOMAIN.md](CUSTOM-DOMAIN.md) for the switch-over steps.

## About the eye graphic

The eye graphic used on this site (`assets/mark.svg`) is a **placeholder
mark, not the final logo**. It follows direction 1 ("paths into the
pupil") of the logo direction brief in the main repository
(`docs/step3-商标与品牌基础.md`, section 5): the upper and lower eyelids
are two path lines, and thin routes converge from the left into one solid
node as the pupil. Abstract geometry only — no realistic eyeball, no
surveillance feel, no medical feel. The final logo is subject to the
trademark/graphic-element search described in that brief and has not
been commissioned yet.

## Site facts

- Plain HTML/CSS/JS. No build step, no framework, no CDN, no external
  fonts (system font stack), no analytics, no tracking — consistent with
  the project's no-telemetry principle.
- Trilingual (简体中文 / 繁體中文 / English) with instant in-page
  switching; all three packs in `i18n.js` carry the same key set, and
  `script.js` refuses to apply an incomplete pack.
- Content is deliberately conservative: the project is in development,
  v1.0 is not released, and this site offers no downloads. Releases will
  be published only via the main repository's Releases page.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The single page (default text: 简体中文） |
| `styles.css` | All styling |
| `i18n.js` | The three language packs (`window.TRANSLATIONS`) |
| `script.js` | Language switching (no reload, localStorage-persisted) |
| `assets/mark.svg` | Placeholder eye mark (see above) |
| `CUSTOM-DOMAIN.md` | Steps to move this site to relavia.org |
| `.nojekyll` | Serve files as-is on GitHub Pages |

## License

Site code is part of the Relavia project and is released under
GPL-3.0-or-later, same as the main repository. The Relavia name and
marks belong to the project founder; the open-source license grants no
trademark rights.

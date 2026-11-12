// Relavia website language switching: instant, no reload.
// Supported packs: zh-Hans / zh-Hant / en (same key set, see i18n.js).
(function () {
  "use strict";
  var SUPPORTED = ["zh-Hans", "zh-Hant", "en"];
  var STORAGE_KEY = "relavia-lang";

  function pageKeys() {
    var keys = [];
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      keys.push(el.getAttribute("data-i18n"));
    });
    return keys;
  }

  function apply(lang) {
    var pack = window.TRANSLATIONS && window.TRANSLATIONS[lang];
    if (!pack) return;
    // Refuse an incomplete pack rather than rendering a half-switched page.
    var missing = pageKeys().filter(function (k) { return !(k in pack); });
    if (missing.length) {
      if (window.console) console.error("relavia i18n: pack " + lang + " missing keys:", missing);
      return;
    }
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = pack[el.getAttribute("data-i18n")];
    });
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
  }

  function initialLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.indexOf(saved) >= 0) return saved;
    } catch (e) { /* ignore */ }
    var nav = (navigator.language || "zh-Hans");
    if (/^zh/i.test(nav)) return /hant|tw|hk|mo/i.test(nav) ? "zh-Hant" : "zh-Hans";
    if (/^en/i.test(nav)) return "en";
    return "zh-Hans";
  }

  document.querySelectorAll(".lang-switch button").forEach(function (btn) {
    btn.addEventListener("click", function () { apply(btn.getAttribute("data-lang")); });
  });

  apply(initialLang());
})();

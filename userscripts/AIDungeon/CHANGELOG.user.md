# Changelog

**TODO:**

* Export adventures in `.epub`?

## v1.4.0

* Optimized GraphQL queries to return less data
* Replaced Markdown export with an HTML export
* Updated `getToken()`
  * If no firebase token is found within `indexedDB`, fetch one from `identitytoolkit.googleapis.com`
* Added support for Yoga GraphiQL tool on `api.aidungeon.com/graphql` and all other API destinations.
  * On page load, automatically injects firebase token into `Headers`

---

## v1.3.0

* During an import, added text of which sub-scenario is currently being imported.
* Added **full** import support for multiple choice sub-scenarios.
  * **Reload the page after importing.**

---

## v1.2.0

* Fixed buttons not being injected into the Story Card Management section.
* During an export, added text of which sub-scenario is currently being exported.
* During an import, added support for multiple choice sub-scenarios, **only up to one layer deep.**
  * **Reload the page after importing.**

---

## v1.1.2

* Fixed buttons not injecting
* Reworked backend code

---

## v1.1.1

* Added ability to export "Scripting" from scenarios

---

## v1.0.0

* Initial release

---

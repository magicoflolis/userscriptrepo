<h1 align="center">
<sub>
<img src="https://raw.githubusercontent.com/magicoflolis/userscriptrepo/refs/heads/master/userscripts/AIDungeon/src/img/favicon.png" height="38" width="38">
</sub>
Adventure + Scenario Exporter
</h1>

Export any adventure or scenario to a local file, it uses GraphQL to retrieve this information.

## **Download**

**UserScript:**

- [Greasy Fork](https://greasyfork.org/scripts/528397)
- [GitHub Repo](https://github.com/magicoflolis/userscriptrepo/raw/refs/heads/master/userscripts/AIDungeon/dist/main-userjs.user.js)

**(Not Recommended) Bookmarklet:**

Save this URL as a bookmark, clicking it will cause the script to inject itself into the current webpage.

```JS
javascript:(function(){['https://cdn.jsdelivr.net/gh/magicoflolis/userscriptrepo@master/userscripts/AIDungeon/dist/main-userjs.user.js'].map(s=>document.body.appendChild(document.createElement('script')).src=s)})();
```

## Features

> `scenario` refers to both adventures and scenarios

- `scenario` file formats:
  - JSON - raw json response, _everything is written to the file_
  - TXT - formatted text file, _NOT everything is written to the file_
  - MD - formatted markdown file, _NOT everything is written to the file_
- UserScript Commands via `GM_registerMenuCommand`:
  - Export Instructions (JSON) - raw json response for AI models / Story Generators
  - Export Text Instructions (TXT) - formatted AI Instructions (_text based_) for AI models / Story Generators
  - Export in \* - shortcut for "EXPORT `scenario` (_file_)"
- Additional notes:
  - Adventure "ACTIONS" (do, say, etc.) are limited to `10,000`

## Previews

<p>
  <img src="https://raw.githubusercontent.com/magicoflolis/userscriptrepo/refs/heads/master/userscripts/AIDungeon/assets/preview-a.png">
  <img src="https://raw.githubusercontent.com/magicoflolis/userscriptrepo/refs/heads/master/userscripts/AIDungeon/assets/preview-b.png">
  <img src="https://raw.githubusercontent.com/magicoflolis/userscriptrepo/refs/heads/master/userscripts/AIDungeon/assets/preview-c.png">
</p>

### TODO

- Add "Multiple Choice" support to scenarios, currently will only export top-level scenarios
- Add "Scripting" support to `scenario`, will be implimented in next release

### Source Code

- <https://github.com/magicoflolis/userscriptrepo/tree/master/userscripts/AIDungeon>

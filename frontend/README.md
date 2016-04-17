# frontend

Basert på https://github.com/christianalfoni/flux-react-boilerplate

## Oppsett

First, copy `app/settings.js_template` to `app/settings.js` and edit the settings as needed.

For å sette opp frontenden er du nødt til å ha node.js installert.

* `npm install -g gulp`
* `npm install`
* `gulp`

Mappen `build` inneholder nå siden. For å teste den kan du f.eks. gå inn i `build`, skrive `python -m SimpleHTTPServer` og gå til `localhost:8000`. Så lenge gulp holdes kjørende, vil filene i `build` automatisk holdes oppdatert når du endrer på kildekoden.
# radiorevolt.no

Ny side for radiorevolt.no som erstatning for gamle dusken.no/radio.

## Konsept

radiorevolt.no skal være en single-page application (SPA) der lydinnholdet er tett integrert i siden. Det skal være mulig å fortsette å høre på det samme innholdet mens man navigerer gjennom nettsiden, og man skal enkelt kunne skifte mellom ulikt lydinnhold -- for eksempel en arkivsending eller livestreamen -- uten å måtte bruke noen eksterne løsninger. Dette er ulikt situasjonen i dag, der streamen eksisterer i en avspiller i et eget popup-vindu, "stream-on-demand" eksisterer på en egen nettside og podcaster er rene MP3-filer som spilles av i nettleseren.

## Teknologivalg

På møtet 24. januar 2016 gikk vi inn for følgende teknologivalg:

Prosjektet benytter JavaScript både på frontend og backend, der frontenden bruker React og backenden bruker Node.js. Backenden produserer JSON-endepunkter som konsumeres av frontenden og eventuelle andre sider som ønsker å benytte seg av innholdet, for eksempel dusken.no.


# Development guide
## Server
[MongoDB](https://www.mongodb.org/downloads) must be installed in order to run and develop the server application.

To get the application up and running locally, run

```bash
npm install
npm run
```

and visit http://localhost:3000
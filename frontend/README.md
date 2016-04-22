# frontend

Basert på https://github.com/christianalfoni/flux-react-boilerplate

## Oppsett

First, copy `app/settings.js_template` to `app/settings.js` and edit the settings as needed.

For å sette opp frontenden er du nødt til å ha node.js installert.

* `npm install -g gulp`
* `npm install`
* `gulp`

Mappen `build` inneholder nå siden. For å teste den kan du f.eks. gå inn i `build`, skrive `python -m SimpleHTTPServer` og gå til `localhost:8000`. Så lenge gulp holdes kjørende, vil filene i `build` automatisk holdes oppdatert når du endrer på kildekoden.

## Player

### Settings

The player also uses the API-URL from the `app/settings.js`.

### Usage

The player can be accessed through the global variable `revoltPlayer`.

<dl>
  <dt>revoltPlayer.play()</dt>
  <dd>Resumes to play a paused audio, at the time it was paused.</dd>

  <dt>revoltPlayer.pause()</dt>
  <dd>Sets the currently playing audio on pause.</dd>
  
  <dt>revoltPlayer.stop()</dt>
  <dd>Stops and destroys the current audio. Cannot be recovered.</dd>
    
  <dt>revoltPlayer.togglePlayPause()</dt>
  <dd>Toggles the current audio between play and pause. If the current audio is paused, it starts playing, and if the current audio is playing, it gets paused.</dd>
  
  <dt>revoltPlayer.previous()</dt>
  <dd>Plays the previous track in the queue if available. If the current audio is a podcast or stream-on-demand, it plays the previous podcast/stream-on-demand (based on time).
  If the current audio is live, it plays the previous live show from the start. If the previous show is longer back in time than 4 hours, it plays from 4 hours ago. If you are already playing from 4 hours ago, nothing happens.</dd>
  
  <dt>revoltPlayer.next()</dt>
  <dd>Plays the next track in the queue if available. If the current audio is a podcast or stream-on-demand, it plays the next podcast/stream-on-demand (basedon time).
  If the current audio is live, it plays the next live show from the start. If the current show is the most recent, it starts to play live. If you are already playing live, noting happens.</dd>
  
  <dt>revoltPlayer.playPodcast(int::broadcastID, int::programID)</dt>
  <dd>Plays the specified podcast, and adds all podcast created by the program to the queue (relative to the specified podcast)</dd>
  
  <dt>revoltPlayer.playOnDemand(int::broadcastID, int::programID)</dt>
  <dd>Plays the specified on-demand-broadcast, and adds all on-demand-broadcasts created by the program to the queue (relative to the specified broadcast)</dd>
  
  <dt>revoltPlayer.playLive(int::offset)</dt>
  <dd>Plays live with an offset in seconds (offset = 0 for live). Maximum offset is 4 hours (14400 seconds)</dd>
</dl>

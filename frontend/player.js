/* eslint-disable */

import {soundManager} from 'soundmanager2';

import 'whatwg-fetch';

var Player,
  playerSelector = "audioplayer",
  utils,
  revoltPlayer = null;

soundManager.setup({
  preferFlash: false,
  debugMode: false,
  html5PollingInterval: 50
});

soundManager.onready(function() {
  const playerElement = utils.get(playerSelector);

  if (playerElement) {
    window.revoltPlayer = new Player(playerElement);
  } else {
    console.warn("No player element found");
  }
});

/**
 * The web player class
 * @param playerElement The DOM element that contains the HTML of the player
 */
Player = function(playerElement) {

  var winding = false,
    liveOffset = 0,
    volume = 70,
    oldVolume = 0,
    dom = {
      player: null,
      playPause: null,
      playPauseIcon: null,
      time: null,
      duration: null,
      title: null,
      progress: null,
      progressLoaded: null,
      progressPlayed: null,
      volume: null,
      volumeLevel: null,
      volumeButton : null,
      previous: null,
      next: null,
      windBack: null,
      windForward: null
    },
    GA_CATEGORY = {
      sod: "StreamOnDemand",
      podcast: "Podcast",
      live: "Live"
    },
    GA_ACTION = {
      start: "playbackStarted",
      pause: "playbackPause",
      resume: "playbackResume",
      minute: "playbackMinute",
      wind: "playbackWind",
      automaticNext: "automaticNext",
      back: "playbackBack",
      next: "playbackNext"
    },
    secondsPlayed = 0,
    secondCounter = null,
    soundObject = null,
    live = false,
    playlistController = null,
    liveController = null,
    isTouch = 'ontouchstart' in window,
    eStart = isTouch ? 'touchstart'	: 'mousedown',
    eMove = isTouch ? 'touchmove'	: 'mousemove',
    eEnd = isTouch ? 'touchcancel'	: 'mouseup';

  function googleAnalyticsEvent(action) {
    var category, label, show;

    if (live) {
      show = liveController.getShow();
      category = GA_CATEGORY.live;
      label = show.starttime+" - "+show.title+" (Stream)";
    } else if (playlistController.isPodcast()) {
      show = playlistController.getCurrent();
      category = GA_CATEGORY.podcast;
      label = getNormalizedDate(show.date)+" - "+show.showName+" (Podcast) {"+show.programID+":"+show.showID+"}";
    } else {
      show = playlistController.getCurrent();
      category = GA_CATEGORY.sod;
      label = getNormalizedDate(show.date)+" - "+show.showName+" (SoD) {"+show.programID+":"+show.showID+"}";
    }

    ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label
    });
  }

  function getNormalizedDate(str) {
    var date = new Date(str);
    return date.getFullYear()+"-"+pad(date.getMonth()+1, 2)+"-"+pad(date.getDate(), 2)
  }

  function countSeconds() {
    if (secondsPlayed % 60 == 0 && secondsPlayed > 0) {
      googleAnalyticsEvent(GA_ACTION.minute);
    }
    if (soundObject.playState) {
      secondCounter = setTimeout(countSeconds, 1000); // Call again in one second
    }
    secondsPlayed++;
  }

  function setTitle(title) {
    var maxLength = 140;
    dom.title.innerHTML = title.length > maxLength ? title.substring(0, maxLength-3) + "..." : title;
  }

  function getTime(msec, useString) {
    // convert milliseconds to hh:mm:ss, return as object literal or string

    var nSec = Math.floor(msec/1000),
      hh = Math.floor(nSec/3600),
      min = Math.floor(nSec/60) - Math.floor(hh * 60),
      sec = Math.floor(nSec -(hh*3600) -(min*60));

    return (useString ? ((hh ? hh + ':' : '') + (hh && min < 10 ? '0' + min : min) + ':' + ( sec < 10 ? '0' + sec : sec ) ) : { 'min': min, 'sec': sec });

  }

  function getDate(dateStr, monthName) {
    var monthNames = [
      "Januar", "Februar", "Mars",
      "April", "Mai", "Juni", "Juli",
      "August", "September", "Oktober",
      "November", "Desember"
    ];
    var date = new Date(dateStr);
    if (monthName) {
      return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
    }
    return pad(date.getDate(), 2) + "." + pad(date.getMonth()+1, 2) + "." + date.getFullYear();

  }

  function getDateTimeString() {
    return pad(date.getDate(), 2) + "-" + pad(date.getMonth()+1, 2) + "." + date.getFullYear() + " " + date.getHours() + ":00:00"
  }

  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  function stopAll() {
    soundManager.stopAll();
  }

  function resume() {
    if (soundObject && soundObject.readyState) {
      soundObject.resume();
    }
  }

  function pause() {
    if (soundObject && soundObject.readyState) {
      soundObject.pause();
    }
  }

  function togglePlayPause() {
    if (soundObject && soundObject.readyState) {
      soundObject.togglePause();
    } else {
      playLive(0);
    }
  }

  function playNext() {
    if (soundObject && soundObject.readyState) {
      if (live) {
        playLive(liveController.forward());
      } else {
        playShow(playlistController.getNext());
      }
    }
  }

  function playPrevious() {
    if (soundObject && soundObject.readyState) {
      if (live) {
        playLive(liveController.back());
      } else {
        if (soundObject.position > 4*1000) {
          soundObject.setPosition(0);
        } else {
          playShow(playlistController.getPrevious());
        }
      }
    }
  }

  function playOnDemand(broadcastId, pos=0) {
    live = false;

    fetch(`/api/broadcast/${broadcastId}`)
    .then(res => res.json())
    .then(broadcast => {
      const apiURL = `http://pappagorg.radiorevolt.no/v1/lyd/ondemand/${broadcast.digasShowID}`;

      playlistController.clearPlaylist();
      playlistController.setPodcast(false);

      fetch(apiURL)
      .then(res => res.json())
      .then(broadcasts => {

        for (var i = broadcasts.length-1; i >= 0; i--) {
          var date = broadcasts[i].dato.toString().substr(0,4);
          date += "-" + broadcasts[i].dato.toString().substr(4,2);
          date += "-" + broadcasts[i].dato.toString().substr(6);
          playlistController.addShow({
            title: broadcast.title,
            showName: broadcasts[i].program,
            showURL: `/program/${broadcast.programSlug}`,
            url: broadcasts[i].url,
            date: date,
            showID: broadcast.digasShowID,
            broadcastID: broadcast.digasBroadcastID
          });
          if (broadcasts[i].id === broadcast.digasBroadcastID) {
            playlistController.setPosition(broadcasts.length-1-i);
          }
        }
        playShow(playlistController.getCurrent(), pos);
      });
    });
  }

  function playPodcast(broadcastId, pos=0) {
    live = false;

    fetch(`/api/broadcast/${broadcastId}`)
    .then(res => res.json())
    .then(broadcast => {
      const apiURL = `http://pappagorg.radiorevolt.no/v1/lyd/podcast/${broadcast.digasShowID}`;

      playlistController.clearPlaylist();
      playlistController.setPodcast(true);

      fetch(apiURL)
      .then(res => res.json())
      .then(broadcasts => {
        for (var i = broadcasts.length-1; i >= 0; i--) {
          var date = broadcasts[i].dato.toString().substr(0,4);
          date += "-" + broadcasts[i].dato.toString().substr(4,2);
          date += "-" + broadcasts[i].dato.toString().substr(6);
          playlistController.addShow({
            title: `${broadcast.title}`,
            showName: broadcast.programName,
            showURL: `/program/${broadcast.programSlug}`,
            url: broadcasts[i].url,
            date: date,
            showID: broadcast.digasShowID,
            broadcastID: broadcast.digasBroadcastID
          });

          if (broadcasts[i]._id === broadcast.digasBroadcastID) {
            playlistController.setPosition(broadcasts.length-1-i);
          }
        }
        playShow(playlistController.getCurrent(), pos);
      });
    });
  }

  function setLiveTitle() {
    // TODO: Add title from dab.radiorevolt.no
    var currentShowURL = "http://pappagorg.radiorevolt.no/v1/sendinger/dato/",
      studio = "autoavvikler";

    var now = new Date(),
      then = new Date(now - liveOffset);

    var URL = currentShowURL + now.getFullYear() + "/" + pad(now.getMonth()+1, 2) + "/" + pad(now.getDate(), 2) + "/" + studio;

    if (live) {
      fetch(URL).then(res => res.json()).then(function (results) {
        for (var key in results) {
          var date, time;

          date = results[key].starttime.split(" ")[0].split("-");
          time = results[key].starttime.split(" ")[1].split(":");

          var start = new Date(date[0], parseInt(date[1])-1, date[2], time[0], time[1], time[2]);

          date = results[key].endtime.split(" ")[0].split("-");
          time = results[key].endtime.split(" ")[1].split(":");

          var end = new Date(date[0], parseInt(date[1])-1, date[2], time[0], time[1], time[2]);

          if (start.getTime() < then.getTime() && end.getTime() > then.getTime()) {
            setTitle(results[key].title);
            setTimeout(setLiveTitle, Math.abs(end.getTime() - then.getTime()) + 5000);
            liveController.setShow(results[key]);
            googleAnalyticsEvent(GA_ACTION.start);
            secondsPlayed = 0; // reinitialize the seconds counter
            return;
          }
        }
      });
    }
  }

  function playLive(offset) {

    if (live && liveOffset == 0 && offset == 0) {
      return;
    }

    live = true;
    liveOffset = offset*1000;

    if (offset == 0) {
      dom.live.innerHTML = 'Live <i class="fa fa-circle" style="color: red"></i>';
    } else {
      dom.live.innerHTML = 'Live <i class="fa fa-circle-o"></i>';
    }

    dom.time.innerHTML = offset == 0 ? "" : "-" + getTime(offset*1000, true);
    dom.duration.innerHTML = "";

    // TODO: It might be a previous show depending on offset (the API for dab.radiorevolt.no should be able to handle offset)
    setLiveTitle();

    play(liveController.setOffset(offset));
  }

  function setVolume(v) {
    v = v > 100 ? 100 : (v < 0 ? 0 : v);

    dom.volumeLevel.style.height = v + '%';

    if (v >= 50 && volume < 50) {
      dom.volumeButton.innerHTML = '<i class="fa fa-2x fa-volume-up"></i>';
    } else if (v > 0 && v < 50 && (volume == 0 || volume >= 50)) {
      dom.volumeButton.innerHTML = '<i class="fa fa-2x fa-volume-down"></i>';
    } else if (v == 0 && volume > 0) {
      dom.volumeButton.innerHTML = '<i class="fa fa-2x fa-volume-off"></i>';
    }

    soundManager.setVolume(v);

    oldVolume = volume;

    volume = v;
  }

  function wind(sec) {
    if (!live) {
      return;
    }

    play(liveController.setOffset(liveController.getOffset() - sec));

    liveOffset = liveController.getOffset()*1000;

    setLiveTitle();

    if (liveOffset == 0) {
      dom.live.innerHTML = 'Live <i class="fa fa-circle" style="color: red"></i>';
    } else {
      dom.live.innerHTML = 'Live <i class="fa fa-circle-o"></i>';
    }

    dom.time.innerHTML = liveOffset == 0 ? "" : "-" + getTime(liveOffset, true);

  }

  function playShow(show, pos=0) {
    if (show === null) {
      return;
    }
    setTitle(show.showName + " - " + getDate(show.date, false));
    dom.live.innerHTML = 'Live <i class="fa fa-circle-o"></i>';
    play(show.url, pos);
  }

  function play(url, pos=0) {
    if (!live && !soundManager.canPlayURL(url)) {
      console.warn("cannot play url: " + url);
      return;
    }

    if (!soundObject) {
      soundObject = makeSound(url);
    }

    // required to reset pause/play state on iOS so whileplaying() works? odd.
    soundObject.stop();

    stopAll();

    soundObject.play({
      url: url,
      position: pos*1000
    });
  }

  function makeSound(url) {

    return soundManager.createSound({

      url: url,

      volume: volume,

      whileplaying: function() {
        if (!live && !winding) {
          var width = Math.min(100, Math.max(0, (100 * this.position / this.durationEstimate))) + '%';

          if (this.duration) {
            dom.progressPlayed.style.width = width;
            dom.time.innerHTML = getTime(this.position, true);
          }
        }
      },

      onplay: function() {
        utils.css.swapClass(dom.playPauseIcon, "fa-play", "fa-pause");
        // Live Google Analytics is in setTitle since it needs to update whenever a new show starts
        if (!live) {
          googleAnalyticsEvent(GA_ACTION.start);
        }
        secondsPlayed = 0; // initialize the second counter
        countSeconds(); // Start to count seconds played
      },

      onpause: function() {
        utils.css.swapClass(dom.playPauseIcon, "fa-pause", "fa-play");
        googleAnalyticsEvent(GA_ACTION.pause);
        if (live) {
          dom.live.innerHTML = 'Live <i class="fa fa-circle-o"></i>';
        }
        clearTimeout(secondCounter); // pause the second counter
      },

      onresume: function() {
        googleAnalyticsEvent(GA_ACTION.resume);
        utils.css.swapClass(dom.playPauseIcon, "fa-play", "fa-pause");
        countSeconds(); // Start to count seconds played
      },

      onload: function(ok) {
        if (!live && ok) {
          dom.duration.innerHTML = getTime(this.duration, true);
        } else if (this._iO && this._iO.onerror) {
          this._iO.onerror();
        }
      },

      onerror: function() {
        /*
         if (navigator.userAgent.match(/mobile/i)) {
         // mobile will likely block the next play() call if there is a setTimeout() - so don't use one here.
         myNextCoolFunction();
         } else {
         if (myCoolTimeoutVariable) {
         window.clearTimeout(myCoolTimeoutVariable);
         }
         myCoolTimeoutVariable = window.setTimeout(myNextCoolFunction, 2000);
         }
         */
      },

      onstop: function() {
        utils.css.swapClass(dom.playPauseIcon, "fa-pause", "fa-play");
        clearTimeout(secondCounter); // Stop to count seconds
      },

      onfinish: function() {
        if (!live) {
          var lastIndex, next;

          clearTimeout(secondCounter); // Stop to count seconds

          lastIndex = playlistController.getPosition();

          next = playlistController.getNext();

          if (next && playlistController.getPosition !== lastIndex) {
            playShow(next);
            googleAnalyticsEvent(GA_ACTION.automaticNext);
          }
        }
      }

    });
  }

  /**
   * The class that controls the playlist (next, previous etc)
   * Contains shows on the following format:
   * {
   *   title: <title>,
   *   showName: <name of the show>,
   *   showURL: <URL for the show homepage>,
   *   url: <URL for the audio>,
   * }
   **/
  function PlaylistController() {
    var playlist = [],
      position = 0,
      podcast = false;

    function isPodcast() {
      return podcast;
    }

    function setPodcast(p) {
      podcast = p;
    }

    function getPlaylist() {
      return playlist;
    }

    function setPosition(pos) {
      pos = pos < playlist.length && pos >= 0 ? pos : position;
      position = pos;
    }

    function getPosition() {
      return position;
    }

    function getNext() {
      if (playlist.length < 1) {
        return null;
      }

      if (playlist.length < position + 2) {
        return null;
      }

      position ++;

      return playlist[position];
    }

    function getPrevious() {
      if (playlist.length < 1) {
        return null;
      }

      if (position - 1 < 0) {
        return null;
      }

      position --;

      return playlist[position];
    }

    function get(index) {
      if (index >= playlist.length || index < 0) {
        return null;
      }

      position = index;

      return playlist[position];
    }

    function getCurrent() {
      if (playlist.length < 1) {
        return null;
      }

      return playlist[position];
    }

    function addShow(show) {
      playlist.push(show);
    }

    function clearPlaylist() {
      playlist = [];
    }

    return {
      getPlaylist: getPlaylist,
      getNext: getNext,
      getPrevious: getPrevious,
      getCurrent: getCurrent,
      get: get,
      addShow: addShow,
      clearPlaylist: clearPlaylist,
      setPosition: setPosition,
      getPosition: getPosition,
      isPodcast: isPodcast,
      setPodcast: setPodcast
    }
  }

  function LiveController() {
    var liveURL = "http://streamer.radiorevolt.no:8081/revolt",
      offset = 0,
      show = null,
      maxOffset = 4*60*60; // four hours

    function setOffset(seconds) {
      seconds = seconds > maxOffset ? maxOffset : seconds;
      seconds = seconds < 0 ? 0 : seconds;

      offset = seconds;
      dom.progressPlayed.style.width = Math.min(100, Math.max(0, (100 * (maxOffset - offset) / maxOffset))) + '%';

      return getURL();
    }

    function setOffsetPercent(percent) {
      percent = percent >= 0 && percent <= 1 ? percent : 0;
      return setOffset(parseInt(maxOffset*(1-percent)));
    }

    function getMaxOffset() {
      return maxOffset;
    }

    function getURL() {
      return liveURL + "?offset=" + offset;
    }

    function back() {
      var now = new Date();
      var current = new Date(now.getTime() - offset*1000);
      var then = new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate(),
        current.getHours(),
        0, 0
      );

      if (current.getTime() - then.getTime() < 4*1000 && offset < maxOffset) {
        then = new Date(then.getTime() - 1000*60*60);
      }

      var diff = (now.getTime() - then.getTime())/1000;
      var sec = Math.floor(diff);

      sec = sec > maxOffset ? maxOffset : sec;

      return sec;
    }

    function forward() {
      var now = new Date();
      var future = new Date(now.getTime() - offset*1000 + 60*60*1000);
      var nextHour = new Date(
        future.getFullYear(),
        future.getMonth(),
        future.getDate(),
        future.getHours(),
        0, 0
      );

      var diff = (now.getTime() - nextHour.getTime())/1000;
      diff = diff < 0 ? 0 : diff;
      return Math.floor(diff);
    }

    function playLive() {
      setOffset(0);

      return getURL();
    }

    function isLive() {
      return offset == 0;
    }

    function getOffset() {
      return offset;
    }

    function setShow(s) {
      show = s;
    }

    function getShow() {
      return show;
    }

    return {
      setOffset: setOffset,
      setOffsetPercent: setOffsetPercent,
      getURL: getURL,
      isLive: isLive,
      getOffset: getOffset,
      playLive: playLive,
      back: back,
      forward: forward,
      getMaxOffset: getMaxOffset,
      setShow: setShow,
      getShow: getShow
    };
  }

  function handleMouse(e) {
    var target, barX, barWidth, x, newPosition, sound;

    winding = true;

    target = dom.progress;

    barX = utils.position.getOffX(target);
    barWidth = target.offsetWidth;

    e = isTouch ? e.changedTouches[0] : e;

    x = isTouch ? (e.pageX - barX) : (e.clientX - barX);

    newPosition = (x / barWidth);

    newPosition = newPosition >= 0 && newPosition <= 1 ? newPosition : 0;

    if (live) {
      dom.progressPlayed.style.width = parseInt(newPosition*1000)/10.0 + '%';
    } else {
      sound = soundObject;

      if (sound && sound.duration) {
        dom.progressPlayed.style.width = Math.min(100, Math.max(0, ((100 * sound.duration*newPosition) / sound.durationEstimate))) + '%';
      }
    }

    if (e.preventDefault) {
      e.preventDefault();
    }

    return false;
  }

  function releaseMouse(e) {

    var target, barX, barWidth, x, newPosition, sound;

    target = dom.progress;

    barX = utils.position.getOffX(target);
    barWidth = target.offsetWidth;

    e = isTouch ? e.changedTouches[0] : e;

    x = isTouch ? (e.pageX - barX) : (e.clientX - barX);

    newPosition = (x / barWidth);

    if (live) {
      liveController.setOffsetPercent(newPosition);
      playLive(liveController.getOffset());
    } else {
      sound = soundObject;

      if (sound && sound.duration) {

        sound.setPosition(sound.duration * newPosition);

        // a little hackish: ensure UI updates immediately with current position, even if audio is buffering and hasn't moved there yet.
        if (sound._iO && sound._iO.whileplaying) {
          sound._iO.whileplaying.apply(sound);
        }

      }
    }

    googleAnalyticsEvent(GA_ACTION.wind);

    utils.events.remove(document, eMove, handleMouse);

    utils.events.remove(document, eEnd, releaseMouse);

    utils.events.preventDefault(e);

    winding = false;

    return false;

  }

  function handleVolume(e) {
    var target, newVolume, volumeButton, oldVolume;

    target = dom.volume;
    volumeButton = dom.volumeButton;

    oldVolume = volume;

    newVolume = ((window.innerHeight- e.clientY) - target.offsetTop - volumeButton.clientHeight - volumeButton.offsetTop*2)/target.clientHeight;

    // Fix infinity-bug when mouse moves outside the volume bar
    newVolume = newVolume > 999 ? 0 : newVolume;

    newVolume = parseInt((newVolume < 0 ? 0 : (newVolume > 1 ? 1 : newVolume))*100);

    setVolume(newVolume);

    if (e.preventDefault) {
      e.preventDefault();
    }

    return false;
  }

  function handleVolumeRelease(e) {
    handleVolume(e);

    utils.events.remove(document, "mousemove", handleVolume);

    utils.events.remove(document, "mouseup", handleVolumeRelease);

    utils.events.preventDefault(e);

    return false;
  }

  function isRightClick(e) {

    // only pay attention to left clicks. old IE differs where there's no e.which, but e.button is 1 on left click.
    if (e && ((e.which && e.which === 2) || (e.which === undefined && e.button !== 1))) {
      // http://www.quirksmode.org/js/events_properties.html#button
      return true;
    }

  }

  function init() {
    dom.player = playerElement;
    dom.playPause = utils.get("audioplayer-playpause", playerElement);
    dom.playPauseIcon = utils.get("audioplayer-playpause-icon", playerElement);
    dom.time = utils.get("audioplayer-time-current", playerElement);
    dom.duration = utils.get("audioplayer-time-duration", playerElement);
    dom.title = utils.get("audioplayer-title", playerElement);
    dom.progress = utils.get("audioplayer-bar", playerElement);
    dom.progressLoaded = utils.get("audioplayer-bar-loaded", playerElement);
    dom.progressPlayed = utils.get("audioplayer-bar-played", playerElement);
    dom.live = utils.get("audioplayer-live", playerElement);
    dom.next = utils.get("audioplayer-next", playerElement);
    dom.previous = utils.get("audioplayer-previous", playerElement);
    dom.windBack = utils.get("audioplayer-wind-back", playerElement);
    dom.windForward = utils.get("audioplayer-wind-forward", playerElement);
    dom.volume = utils.get("audioplayer-volume-adjust-bar", playerElement);
    dom.volumeLevel = utils.get("audioplayer-volume-level", playerElement);
    dom.volumeButton = utils.get("audioplayer-volume-button", playerElement);

    utils.events.add(dom.progress, eStart, function(e) {
      if (isRightClick(e)) {
        return true;
      }
      utils.events.add(document, eMove, handleMouse);
      utils.events.add(document, eEnd, releaseMouse);
      return handleMouse(e);
    });

    utils.events.add(dom.playPause, "click", function(e) {
      togglePlayPause();
    });

    utils.events.add(dom.next, "click", function(e) {
      playNext();
      googleAnalyticsEvent(GA_ACTION.next);
    });

    utils.events.add(dom.previous, "click", function(e) {
      playPrevious();
      googleAnalyticsEvent(GA_ACTION.back);
    });

    utils.events.add(dom.live, "click", function(e) {
      playLive(0);
    });

    utils.events.add(dom.volumeButton, "click", function(e) {
      if (volume != 0) {
        setVolume(0);
      } else {
        setVolume(oldVolume);
      }
    });

    utils.events.add(dom.volume, "mousedown", function(e) {
      if (isRightClick(e)) {
        return true;
      }
      utils.events.add(document, 'mousemove', handleVolume);
      utils.events.add(document, 'mouseup', handleVolumeRelease);
      return handleVolume(e);
    });

    /*
    utils.events.add(dom.windBack, "click", function(e) {
      wind(-30);
    });

    utils.events.add(dom.windForward, "click", function(e) {
      wind(30);
    });
    */

    playlistController = new PlaylistController();
    liveController = new LiveController();


    // TODO: Remove volume when dealing with a mobile device (they don't allow HTML5 to set volume)
  }

  init();

  return {
    pause: pause,
    play: resume,
    stop: stopAll,
    togglePlayPause: togglePlayPause,
    previous: playPrevious,
    next: playNext,
    playPodcast: playPodcast,
    playLive: playLive,
    playOnDemand: playOnDemand
  }

};

utils = {
  get: function (className, elem) {
    if (className === undefined) {
      return null;
    }
    if (!(elem === undefined)) {
      return elem.getElementsByClassName(className)[0];
    } else {
      return document.getElementsByClassName(className)[0];
    }
  },
  css: {
    hasClass: function (o, cStr) {
      return (o.className !== undefined ? new RegExp('(^|\\s)' + cStr + '(\\s|$)').test(o.className) : false);

    },
    addClass: function (o, cStr) {

      if (!o || !cStr || this.hasClass(o, cStr)) {
        return false; // safety net
      }
      o.className = (o.className ? o.className + ' ' : '') + cStr;

    },
    removeClass: function (o, cStr) {

      if (!o || !cStr || !this.hasClass(o, cStr)) {
        return false;
      }
      o.className = o.className.replace(new RegExp('( ' + cStr + ')|(' + cStr + ')', 'g'), '');

    },
    swapClass: function (o, cStr1, cStr2) {

      var tmpClass = {
        className: o.className
      };

      this.removeClass(tmpClass, cStr1);
      this.addClass(tmpClass, cStr2);

      o.className = tmpClass.className;

    },
    toggleClass: function (o, cStr) {

      var found,
        method;

      found = this.hasClass(o, cStr);

      method = (found ? this.removeClass : this.addClass);

      method(o, cStr);

      // indicate the new state...
      return !found;

    }
  },
  events: {
    add: function(o, evtName, evtHandler) {
      // return an object with a convenient detach method.
      var eventObject = {
        detach: function() {
          return remove(o, evtName, evtHandler);
        }
      };
      if (window.addEventListener) {
        o.addEventListener(evtName, evtHandler, false);
      } else {
        o.attachEvent('on' + evtName, evtHandler);
      }
      return eventObject;
    },
    remove: function(o, evtName, evtHandler) {
      if (window.removeEventListener !== undefined) {
        return o.removeEventListener(evtName, evtHandler, false);
      } else {
        return o.detachEvent('on' + evtName, evtHandler);
      }
    },
    preventDefault: function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
        e.cancelBubble = true;
      }
      return false;
    }
  },
  position: (function() {

    function getOffX(o) {

      // http://www.xs4all.nl/~ppk/js/findpos.html
      var curleft = 0;

      if (o.offsetParent) {

        while (o.offsetParent) {

          curleft += o.offsetLeft;

          o = o.offsetParent;

        }

      } else if (o.x) {

        curleft += o.x;

      }

      return curleft;

    }

    function getOffY(o) {

      // http://www.xs4all.nl/~ppk/js/findpos.html
      var curtop = 0;

      if (o.offsetParent) {

        while (o.offsetParent) {
          curtop += o.offsetTop;

          o = o.offsetParent;

        }

      } else if (o.y) {

        curtop += o.y;

      }

      return curtop;

    }

    return {
      getOffX: getOffX,
      getOffY: getOffY
    };
  }())
};

window.revoltPlayer = revoltPlayer;

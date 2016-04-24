var flux = require('flux-react');
var actions = require('./actions');

var AudioDAO = require('./dao/AudioDAO');

var AudioStore = flux.createStore({
    onDemandForProgram: {},
    fetchedOnDemandForProgram: {},
    podcastForProgram: {},
    fetchedPodcastForProgram: {},
    exports: {
        getOnDemandForProgram: function(programId) {
            if (this.fetchedOnDemandForProgram[programId] !== undefined) {
                return this.onDemandForProgram[programId];
            }

            var dao = new AudioDAO();
            dao.getOnDemandForProgram(programId, (data) => {
                this.onDemandForProgram[programId] = data;
                this.fetchedOnDemandForProgram[programId] = true;
                this.emitChange();
            });

            return [];
        },
        getOnDemand: function (programId, onDemandId) {
            if (this.onDemandForProgram[programId] !== undefined) {
                if (this.onDemandForProgram[programId][onDemandId] !== undefined) {
                    return this.onDemandForProgram[programId];
                }
            }

            var dao = new AudioDAO();
            dao.getOnDemand(programId, onDemandId, (data) => {
                if (this.onDemandForProgram[programId] === undefined) {
                    this.onDemandForProgram[programId] = {};
                }
                this.onDemandForProgram[programId][onDemandId] = data;
                this.emitChange();
            });

            return {};
        },
        getPodcastForProgram: function(programId) {
            if (this.fetchedPodcastForProgram[programId] !== undefined) {
                return this.podcastForProgram[programId];
            }

            var dao = new AudioDAO();
            dao.getPodcastForProgram(programId, (data) => {
                this.podcastForProgram[programId] = data;
                this.fetchedPodcastForProgram[programId] = true;
                this.emitChange();
            });

            return [];
        },
        getPodcast: function (programId, podcastId) {
            if (this.podcastForProgram[programId] !== undefined) {
                if (this.podcastForProgram[programId][podcastId] !== undefined) {
                    return this.podcastForProgram[programId];
                }
            }

            var dao = new AudioDAO();
            dao.getPodcast(programId, podcastId, (data) => {
                if (this.podcastForProgram[programId] === undefined) {
                    this.podcastForProgram[programId] = {};
                }
                this.podcastForProgram[programId][podcastId] = data;
                this.emitChange();
            });

            return {};
        },
    }
});

module.exports = AudioStore;
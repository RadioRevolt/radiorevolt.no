var flux = require('flux-react');
var actions = require('./actions');

var ProgramDAO = require('./dao/ProgramDAO');

var ProgramStore = flux.createStore({
    programs: [],
    activePrograms: [],
    archivedPrograms: [],
    programDetails: {},
    actions: [
        actions.addProgram
    ],
    addProgram: function (post) {
        // Logic for adding program
        // Update backend and cache
        this.emitChange();
    },
    exports: {
        getPrograms: function() {
            if (this.programs.length != 0) {
                return this.programs;
            }

            var dao = new ProgramDAO();
            dao.getPrograms((data) => {
                this.programs = data;
                this.emitChange();
            });

            return [];
        },
        getActivePrograms: function () {
            if (this.activePrograms.length != 0) {
                return this.activePrograms;
            }

            var dao = new ProgramDAO();
            dao.getPrograms((data) => {
                this.activePrograms = data;
                this.emitChange();
            });

            return [];
        },
        getArchivedPrograms: function () {
            if (this.archivedPrograms.length != 0) {
                return this.archivedPrograms;
            }

            var dao = new ProgramDAO();
            dao.getPrograms((data) => {
                this.archivedPrograms = data;
                this.emitChange();
            });

            return [];
        },
        getProgramDetails: function(programID) {
            if (this.programDetails[programID] != undefined) {
                return this.programDetails[programID];
            }

            var dao = new ProgramDAO();
            dao.getProgramDetails(programID, (data) => {
                this.programDetails[programID] = data;
                this.emitChange();
            });

            return [];
        }
    }
});

module.exports = ProgramStore;
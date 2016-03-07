var flux = require('flux-react');
var actions = require('./actions');

var ProgramDAO = require('./dao/ProgramDAO');

var ProgramStore = flux.createStore({
    programs: [],
    activePrograms: [],
    archivedPrograms: [],
    programDetails: {},
    programDetailsBySlug: {},
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
        getProgramDetails: function(id) {
            if (this.programDetails[id] != undefined) {
                return this.programDetails[id];
            }

            var dao = new ProgramDAO();
            dao.getProgramDetails(id, (data) => {
                this.programDetails[id] = data;
                this.emitChange();
            });

            return {};
        },
        getProgramDetailsBySlug: function(slug) {
            if (this.programDetailsBySlug[slug] != undefined) {
                return this.programDetailsBySlug[slug];
            }

            var dao = new ProgramDAO();

            var findAndSetProgram = () => {
                this.programs.every((each) => {
                    if (each.slug == slug) {
                        let program = each;
                        let id = program["_id"];
                        if (this.programDetails[id] == undefined) {
                            dao.getProgramDetails(id, (data) => {
                                this.programDetails[id] = data;
                                this.programDetailsBySlug[slug] = data;
                                this.emitChange();
                            });
                        } else {
                            this.programDetailsBySlug[slug] = this.programDetails[program["_id"]];
                            this.emitChange();
                        }
                        return false;
                    }
                    return true;
                });
            }

            if (this.programs.length == 0) {
                dao.getPrograms((data) => {
                    this.programs = data;
                    findAndSetProgram();
                });
            } else {
                findAndSetProgram();
            }

            return {};
        }
    }
});

module.exports = ProgramStore;
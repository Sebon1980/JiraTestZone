const parseEpic = require('./parseEpic');
const _ = require('lodash');

module.exports = function parseSprint(sprintId, data) {
    var sprint = {
        sprintId,
        sprintName: "",
        epicsTotal: 0,
        epicsInProgress: 0,
        epicsDone: 0,
        epicsToDo: 0,
        epics: []
    };
    var temp = {};
    var epics = [];

    data.issues.forEach((currentIssue) => {
        var epic = parseEpic(currentIssue.fields.epic.id, data);
        epics.push(epic);
    });

    epics = _.uniqBy(epics, 'epicId');
    console.log(epics)
}
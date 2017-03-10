const JiraClient = require('jira-connector');
const { parseEpic, parseSprint } = require('./helper');

class Jira {

    constructor(config) {
        this.connector = new JiraClient(config);
    }

    detailsOfEpic(epicId) {
        var opts = {
            epicId,
            type: "",
            startAt: 0,
            maxResults: 25
        };
        return this.connector.epic.getIssuesForEpic(opts)
            .then((result) => parseEpic(epicId, result));
    }
    detailsOfSprint(sprintId) {
        var opts = {
            sprintId,
            type: "",
            startAt: 0,
            maxResults: 25

        };
        return this.connector.sprint.getSprintIssues(opts)
            .then((result) => parseSprint(sprintId, result));
    }
}

module.exports = Jira;
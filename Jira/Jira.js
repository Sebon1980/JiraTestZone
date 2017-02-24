const JiraClient = require('jira-connector');
const { parseEpic } = require('./helper');

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
        return this.connector.epic.getIssuesForEpic(opts).then((result) => parseEpic(epicId, result));
    }

}

module.exports = Jira;
var JiraClient = require('jira-connector');
var express = require('express')
var app = express()

var jira = new JiraClient({
    host: 'neumannsebastian.atlassian.net',
    basic_auth: {
        username: 'sebon1980@outlook.de',
        password: 'Tiffy709'
    }
});

module.exports.epics = function() {
    return new Promise((resolve, reject) => {
        var opts = {
            type: "",
            sprintId: 2,
            startAt: 1,
            maxResults: 25
        };
        jira.sprint.getSprintIssues(opts).then((result) => {
            var temp = {};
            var epics = [];
            result.issues.forEach(function(issue) {
                var id = issue.fields.epic.id;
                if (temp[id] === undefined) {
                    temp[id] = issue.fields.epic;
                    epics.push(issue.fields.epic);
                }
            });
            resolve(epics);
        }).catch((error) => {
            reject(error);
        })
    });
}
module.exports.issuesOfEpic = function(id) {
    return new Promise((resolve, reject) => {
        var opts = {
            type: "",
            epicId: id,
            sprintId: 2,
            startAt: 0,
            maxResults: 25
        };
        jira.epic.getIssuesForEpic(opts).then((result) => {
            var temp = {};
            var epicIssues = [];
            epicIssues.push(result)

            result.issues.forEach(function(issue) {
                var id = issue.id;
                if (temp[id] === undefined) {
                    temp[id] = issue.id;

                    epicIssues.push(issue.fields.summary);
                }
            });

            resolve(epicIssues);
        }).catch((error) => {
            reject(error);
        })
    });
}
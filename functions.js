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

module.exports.epicsOfSprint = function(sprintId) {
    return new Promise((resolve, reject) => {
        var opts = {
            type: "",
            sprintId: sprintId,
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
module.exports.issuesOfEpic = function(epicId) {
    return new Promise((resolve, reject) => {
        var opts = {
            type: "",
            epicId: epicId,
            sprintId: 2,
            startAt: 0,
            maxResults: 25
        };
        jira.epic.getIssuesForEpic(opts).then((result) => {
            var epicIssues = [];

            result.issues.forEach(function(issue) {
                const entry = {
                    id: issue.id,
                    key: issue.key,
                    adress: issue.self,
                    summary: issue.fields.summary,
                    assignee: issue.fields.assignee.displayName,
                    status: issue.fields.status.name
                };
                epicIssues.push(entry);
            });
            resolve(epicIssues);
        }).catch((error) => {
            reject(error);
        })
    });
}
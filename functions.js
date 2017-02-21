var JiraClient = require('jira-connector');
var express = require('express');
var app = express();

var jira = new JiraClient({
    host: 'neumannsebastian.atlassian.net',
    basic_auth: {
        username: 'sebon1980@outlook.de',
        password: 'Tiffy709'
    }
});



module.exports.epicsOfSprint = function(sId) {
    return new Promise((resolve, reject) => {
        var opts = {
            type: "",
            sprintId: sId,
            startAt: 0,
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
module.exports.issuesOfEpic = function(eId) {
    return new Promise((resolve, reject) => {
        var opts = {
            type: "",
            epicId: eId,
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
module.exports.statusOfEpic = function(eId) {
    return new Promise((resolve, reject) => {
        var opts = {
            type: "",
            epicId: eId,
            startAt: 0,
            maxResults: 25
        };
        jira.epic.getIssuesForEpic(opts).then((result) => {
            var epicIssues = [];
            var status = {
                total: 0,
                inProgress: 0,
                done: 0,
                toDo: 0
            }

            result.issues.forEach(function(issue) {
                status.total++;
                if (issue.fields.status.name === "Done") {
                    status.done++;
                } else if (issue.fields.status.name == "In Progress") {
                    status.inProgress++;
                } else
                    status.toDo++;
            });
            resolve(status);
        }).catch((error) => {
            reject(error);
        })
    });
}

module.exports.getVersionInfo = function(vId) {
    return new Promise((resolve, reject) => {
        var opts = {
            type: "",
            versionId: vId,
            startAt: 0,
            maxResults: 25
        };
        jira.version.getVersion(opts).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.getStatusOfVersion = function(vId) {
    return new Promise((resolve, reject) => {
        var opts = {
            type: "",
            versionId: vId,
            startAt: 0,
            maxResults: 25
        };
    })
}
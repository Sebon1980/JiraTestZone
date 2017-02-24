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


/** 
 * return a new builded object of an epic with just the required data for Plugin
 * @param {Object} opts The options to pass to the API.  Note that this
 *        object must contain EITHER an epicId;
 * 
 */

var detailsOfEpic = function(eId) {
    return new Promise((resolve, reject) => {
        var opts = {
            type: "",
            epicId: eId,
            startAt: 0,
            maxResults: 25
        };
        var epic = {
            epicName: "",
            epicId: opts.epicId,
            issuesTotal: 0,
            issuesInProgress: 0,
            issuesDone: 0,
            issuesToDo: 0,
            issues: []
        }

        jira.epic.getIssuesForEpic(opts).then((result) => {
            result.issues.forEach(function(issue) {
                epic.epicName = issue.fields.epic.name;
                const entry = {
                    id: issue.id,
                    key: issue.key,
                    adress: issue.self,
                    summary: issue.fields.summary,
                    //assignee: issue.fields.assignee.displayName || 'undefined',
                    status: issue.fields.status.name,
                };

                epic.issues.push(entry);
                epic.issuesTotal++;
                if (issue.fields.status.name === "Done") {
                    epic.issuesDone++;
                } else if (issue.fields.status.name == "In Progress") {
                    epic.issuesInProgress++;
                } else
                    epic.issuesToDo++;
            });
            resolve(epic);
        }).catch((error) => {
            reject(error);
        })
    });
}
module.exports.detailsOfEpic = detailsOfEpic;
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
                    temp[id] = issue.fields.epic.id;
                    epics.push(detailsOfEpic(id));
                }
            });
            Promise.all(epics).then(
                (result) => {
                    resolve(result)
                }).catch((error) => {
                reject(error);
            });
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
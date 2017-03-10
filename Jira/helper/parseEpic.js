const parseIssue = require('./parseIssue');

module.exports = function parseEpic(epicId, data) {
    var epic = {
        epicId,
        epicName: "",
        sprintId: "",
        issuesTotal: data.issues.length,
        issuesInProgress: 0,
        issuesDone: 0,
        issuesToDo: 0,
        issues: []
    };

    data.issues.forEach((currentIssue) => {
        const issue = parseIssue(currentIssue);
        epic.epicName = issue.epicName;
        epic.sprintId = issue.sprintId;

        switch (issue.status) {
            case 'Done':
                epic.issuesDone++;
                break;
            case 'In Progress"':
                epic.issuesInProgress++;
                break;
            default:
                epic.issuesToDo++;
                break;
        }

        epic.issues.push(issue);
    });

    return epic;
};
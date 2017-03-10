module.exports = function parseIssue(issue) {
    const { id, key, self } = issue;
    const { summary, assignee } = issue.fields;
    const assigneeName = assignee ? assignee.displayName : 'Unknown';

    return {
        id,
        key,
        adress: self,
        sprintId: issue.fields.sprint.id,
        summary,
        assigneeName,
        epicName: issue.fields.epic.name,
        status: issue.fields.status.name,
        isDone: issue.fields.status.name == 'Done'
    };
};
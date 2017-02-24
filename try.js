const Jira = require('./Jira');
const config = require('./config');

const sebosJira = new Jira(config.jira);

sebosJira.detailsOfEpic(10100)
    .then(epic => {
        console.log(epic);
    }).catch(e => console.log(e));
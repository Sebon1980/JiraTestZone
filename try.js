const Jira = require('./Jira/Jira');
const config = require('./config');

const sebosJira = new Jira(config.jira);


/*sebosJira.detailsOfEpic(10104)
    .then(epic => {
        console.log(epic);
    }).catch(e => console.log(e));

*/
sebosJira.detailsOfSprint(2)
    .then(sprint => {
        console.log('blabla: ' + sprint);
    }).catch(e => console.log(e));
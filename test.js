var express = require('express')
var app = express()

var JiraClient = require('jira-connector');

var jira = new JiraClient({
    host: 'neumannsebastian.atlassian.net',
    basic_auth: {
        username: 'sebon1980@outlook.de',
        password: 'Tiffy709'
    }
});
//----------------------------------------------
app.get('/', function(req, res) {
    res.send('Hello World')
})

//----------------------------------------------
app.get('/getSprint', function(req, res) {
        var opts = {
            type: "",
            sprintId: 2,
            startAt: 1,
            maxResults: 0
        }
        jira.sprint.getSprint(opts).then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        });
    })
    //----------------------------------------------
app.get('/getAllEpics', function(req, res) {
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

            res.send(epics);


        }).catch((error) => {
            res.send(error);
        })
    })
    //----------------------------------------------
app.get('/getAllSprintIssues', function(req, res) {
        var opts = {
            type: "",
            sprintId: 2,
            startAt: 1,
            maxResults: ""
        }
        jira.sprint.getSprintIssues(opts).then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        });
    })
    //----------------------------------------------

app.get('/getBoards', function(req, res) {

    var opts = {
        type: "",
        startAt: 1,
        maxResults: 0
    }
    jira.board.getAllBoards(opts).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})

//----------------------------------------------

app.listen(3000)
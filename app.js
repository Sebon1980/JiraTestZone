var test = require('./functions.js');
const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;


function epicTest(sprintId) {
    return test.epicsOfSprint();
}

function issueTest(epicId) {
    return test.issuesOfEpic(epicId)
}

function versionTest(versionId) {
    return test.getVersionInfo(versionId)
}









app.get('/epic', function(req, res) {
    epicTest()
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => { res.send(err) })
})
app.get('/issue', function(req, res) {
    issueTest(10100)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => { res.send(err) })
})
app.get('/version', function(req, res) {
    versionTest()
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => { res.send(err) })
})
app.listen(port, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
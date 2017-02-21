var test = require('./functions.js');
const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;


function epicTest(sId) {
    return test.epicsOfSprint(sId);
}

function issueTest(eId) {
    return test.issuesOfEpic(eId)
}

function versionTest(vId) {
    return test.getVersionInfo(vId)
}

function statusTest(eId) {
    return test.statusOfEpic(eId)
}









app.get('/epic/:sId', function(req, res) {
    epicTest(req.params.sId)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => { res.send(err) })
})
app.get('/status/:eId', function(req, res) {
    statusTest(req.params.eId)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => { res.send(err) })
})

app.get('/issue/:eId', function(req, res) {
    issueTest(req.params.eId)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => { res.send(err) })
})
app.get('/version/:vId', function(req, res) {
    versionTest(req.params.vId)
        .then((resp) => {
            res.send(resp)
        })
        .catch((err) => { res.send(err) })
})
app.listen(port, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
var epics = require('./functions.js');


/*function test() {
    epics.epics().then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })

}*/

function issueTest() {
    epics.issuesOfEpic(10100).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
}

//test();
issueTest();
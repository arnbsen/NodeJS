console.log('Starting app.js');
// Calling External Libraries
const yargs = require('yargs');


// Calling our own library
const notes = require('./notes.js');

var command = process.argv[2];
var action = yargs.argv;
switch (command) {
    case 'add':
        action.title != undefined?action.body != undefined?console.log(notes.addNote(action.title, action.body)):undefinedError('body'):undefinedError('title');
        break;
    case 'remove': 
        action.title != undefined?console.log(notes.remove(action.title)):undefinedError('title');
        break;
    case 'all' : 
        console.log(notes.getAll());
        break;
    case 'getIndex' : 
        console.log(notes.getIndex());
        break;
    case 'edit': 
        action.title != undefined?action.body != undefined?console.log(notes.edit(action.title, action.body)):undefinedError('body'):undefinedError('title');
        break;
    default:
        console.log('Invalid Command');
        break;
}
function undefinedError(arg) {
    console.log(`Invalid argument: ${arg} cannot be left empty or left`);
}
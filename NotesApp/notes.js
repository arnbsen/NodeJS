console.log('Starting notes.js');
const _ = require('lodash');
const fs = require('fs');
var currBuffer;
if(fs.existsSync('notes.json')){
    currBuffer = JSON.parse(fs.readFileSync('notes.json'))
}else{
    currBuffer = new Array();
    fs.writeFileSync('notes.json', JSON.stringify(currBuffer));
}
var note = function(title, body){
    this.title = title;
    this.body = body;
}

var addNote = (title, body) => {
    if (_.findIndex(currBuffer, (o) => {return o.title == title;}) != -1){
        return 'Note already exists';
    } else { 
        currBuffer.push(new note(title, body));
        fs.writeFileSync('notes.json', JSON.stringify(currBuffer));
        return `Note titled: ${title} Added`;
    }
}
var getAll = () => {
    return JSON.stringify(currBuffer);
}
var edit = (title, body) => {
    var idx = _.findIndex(currBuffer, (o) => {return o.title == title;})
    if (idx != -1){
        currBuffer.splice(idx, 1);
        currBuffer.push(new note(title, body));
        fs.writeFileSync('notes.json', JSON.stringify(currBuffer));
        return `Note ${title} Edited`;
    } else {
        return 'Note not found';
    }
}
var remove = (title) => {
    var idx = _.findIndex(currBuffer, (o) => {return o.title == title;})
    if (idx != -1){
        currBuffer.splice(idx, 1);
        fs.writeFileSync('notes.json', JSON.stringify(currBuffer));
        return `Note ${title} Removed`;
    } else {
        return 'Note not found';
    }
}
var getIndex = () => {
    var retvar = new Array();
    for (var i=0; i<currBuffer.length; i++){
        retvar.push(currBuffer[i].title);
    }
    if (retvar.length > 0){
        return JSON.stringify(retvar);
    } else {
        return 'No notes are there';
    }
}
module.exports = {
    addNote,
    getAll,
    edit,
    remove,
    getIndex
}
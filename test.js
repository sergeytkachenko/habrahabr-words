const assert = require('assert');
const fs = require('fs');
const mapFile = 'map.txt';
const falseFile = 'false-words.txt';
const trueFile = 'words.txt';

const program = require('./js/index');

fs.readFile(mapFile, (err, data) => {
    if (err) throw err;
    program.init(data);

    fs.readFile(trueFile, (err, trueData) => {
        fs.readFile(falseFile, (err, falseData) => {
            const count = 10000;
            let attemptRight = 0;
            for(let i = 0; i < count / 2; i++) {
                let finalWord = randomWord(trueData);
                if (program.test(finalWord)) {
                    attemptRight++;
                } else {
                    console.log("true: " + finalWord);
                }
            }
            for(let i = 0; i < count / 2; i++) {
                let finalWord = randomWord(falseData);
                if (!program.test(finalWord)) {
                    attemptRight++;
                } else {
                    //console.log("false: " + finalWord);
                }
            }
            console.log('Count right answers: ' + attemptRight / count * 100 + '%');
        });
    });
});

// fs.readFile(file, (err, data) => {
//     if (err) throw err;
//     program.init(data);
//     program.t();
// });




function randomWord(data) {
    let r = randomNumber(0, data.length - 100);
    let randomWords = data.toString('utf-8', r, r + 100);
    randomWords = randomWords.replace(/\n|\r/g, ' ').replace(/^[^\s]+/, '');
    return randomWords.replace(/^\s*([^\s]+).*/, '$1').toLowerCase();
}

function randomNumber (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
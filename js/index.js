const fs = require('fs');

class Words {

    constructor() {
        this.data = null;
        this.symbols = {};
    }

    init(dataBuffer) {
        this.data = dataBuffer;
        this.lines = {};
        let lines = this.getLines();
        for (let line of lines) {
            let symbol = line.slice(0,1);
            let hashes = line.slice(2);
            if (!symbol) {continue;}
            this.lines[symbol] = hashes.split('|');
        }
        fs.writeFile('map-json.txt', Buffer.from(JSON.stringify(this.lines)));
    }

    getLines() {
        return this.explode();
    }

    test(word) {
        for (let index = 0; index < word.length; index++) {
            let symbol = word[index];
            let before = word[index - 1] || '0';
            let after = word[index + 1] || '0';
            let hash = before + after;
            if (!this.lines[symbol] || this.lines[symbol].indexOf(hash) === -1) {
                return false;
            }
        }
        return true;
    }

    t() {
        let words = this.explode();
        for (let word of words) {
            if (word === 'ghostology') {debugger}
            for (let index = 0; index < word.length; index++) {
                let symbol = word[index];
                this.addSymbol(symbol, index, word);
            }
        }
        let lines = [];
        for (var symbol in this.symbols) {
            let hashes = this.symbols[symbol];
            let line = symbol + ':' + hashes.sort().join('|');
            lines.push(line);
        }
        fs.writeFile('map.txt', lines.join('\n'));
    }

    addSymbol(symbol, index, word) {
        if (!this.symbols[symbol]) {
            this.symbols[symbol] = [];
        }
        let before = word[index - 1] || '0';
        let after = word[index + 1] || '0';
        let hash = before + after;
        if (this.symbols[symbol].indexOf(hash) === -1) {
            this.symbols[symbol].push(hash);
        }
    }

    explode() {
        let data = this.data.toString().toLowerCase();
        data = data.replace(/\n/g, ' ');
        return data.split(' ');
    }
}

module.exports =  new Words();
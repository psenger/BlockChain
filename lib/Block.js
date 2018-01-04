const randomString = require("randomstring"),
    sha = 'sha256';
let crypto;
try {
    crypto = require('crypto');
} catch (err) {
    console.log('crypto support is disabled!');
    throw new Error('Crypto support is disabled.');
}
if (-1 === crypto.getHashes().indexOf(sha)) {
    throw new Error(`Missing required ${sha} hash algorithm.`);
}

module.exports = class Block {
    constructor(data, difficulty = 4, sequence = 0, timeStamp = new Date(), previousHash = '') {
        this.data = data;
        this.sequence = sequence;
        this.timeStamp = timeStamp.toISOString();
        this.previousHash = previousHash;
        this.difficulty = difficulty;
    }

    mineBlock() {
        // ----------------------------------------------------
        // this code looked good, but locks down the difficulty
        // ----------------------------------------------------
        // let hash = '';
        // let nounce = '';
        // if ( this.sequence === 0 ) { // Genesis block, gen many hashes till prefix is 0000
        //     do {
        //         nounce = randomString.generate();
        //         hash = this.calculateHash( nounce );
        //         difficulty
        //     } while  ( ! hash.startsWith( '0000') );
        // } else {
        //     nounce = randomString.generate();
        //     hash = this.calculateHash( nounce );
        // }
        // this.nounce = nounce;
        // this.hash = hash;
        // return this;
        // ----------------------------------------------------
        let hash = '';
        let nounce = '';
        let test = Array(this.difficulty + 1).join('0');
        do {
            nounce = randomString.generate();
            hash = this.calculateHash(nounce);
        } while (hash.substring(0, this.difficulty) !== test);
        this.nounce = nounce;
        this.hash = hash;
        return this;
    }

    calculateHash(nounce = this.nounce) {
        return crypto.createHash(sha).update(
            this.sequence
            + this.timeStamp
            + JSON.stringify(this.data)
            + this.previousHash
            + nounce
        ).digest('hex');
    }
};
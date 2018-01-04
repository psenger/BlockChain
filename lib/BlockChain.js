const Block = require('./Block');

module.exports = class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        let block = new Block('Genesis block');
        return block.mineBlock();
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    };

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.sequence = this.chain.length;
        this.chain.push(newBlock.mineBlock());
        return this;
    };

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
};
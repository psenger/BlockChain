const Block = require('./lib/Block'),
    BlockChain = require('./lib/BlockChain');

const blockChain = (new BlockChain()).addBlock(new Block({author: "Philip A Senger"}))
    .addBlock(new Block({author: "Benjamin G Senger"}))
    .addBlock(new Block({author: "Danika A Senger"}))
    .addBlock(new Block({author: "Maria I Senger"}));

console.log(JSON.stringify(blockChain, '\t', 4));
console.log(blockChain.isChainValid());
#!/usr/bin/node

const { Web3 } = require('web3');

var quicknodeurl = 'YOUR_QUICKNODE_URL';

// Replace this with the BSC mainnet provider URL
const providerUrl = quicknodeurl

const web3 = new Web3(providerUrl);

async function getTransactionDetails(transactionHash) {
    try {
        const transaction = await web3.eth.getTransaction(transactionHash);
        console.log('Transaction:', transaction);
    } catch (error) {
        console.error('Error fetching transaction details:', error);
    }
}

async function getBlockTransactions(blockNumber) {
    try {
        const block = await web3.eth.getBlock(blockNumber);
        console.log('Block Number:', block.number);
        console.log('Block Transactions:', block.transactions);

        for (const transactionHash of block.transactions) {
            await getTransactionDetails(transactionHash);
        }
    } catch (error) {
        console.error('Error fetching block transactions:', error);
    }
}

async function fetchAllBlocks() {
    try {
        const latestBlockNumber = await web3.eth.getBlockNumber();
        const genesisBlockNumber = 0;

        for (let blockNumber = latestBlockNumber; blockNumber >= genesisBlockNumber; blockNumber--) {
            console.log('Fetching block:', blockNumber);
            await getBlockTransactions(blockNumber);
        }
    } catch (error) {
        console.error('Error fetching blocks:', error);
    }
}

fetchAllBlocks();
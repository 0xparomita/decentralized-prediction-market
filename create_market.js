const { ethers } = require("hardhat");
const config = require("./market_config.json");

async function main() {
    const [admin] = await ethers.getSigners();
    const pm = await ethers.getContractAt("PredictionMarket", config.pm, admin);

    const question = "Will ETH flip BTC by 2030?";
    const duration = 3600; // 1 hour for testing

    console.log(`Creating Market: "${question}"`);
    
    const tx = await pm.createMarket(question, duration);
    await tx.wait();

    console.log("Market Created! ID: 0");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

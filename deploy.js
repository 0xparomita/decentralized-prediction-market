const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with:", deployer.address);

    // 1. Deploy Betting Token
    const Token = await ethers.getContractFactory("MockUSDC");
    const token = await Token.deploy();
    await token.waitForDeployment();
    const tokenAddr = await token.getAddress();

    // 2. Deploy Market
    const PM = await ethers.getContractFactory("PredictionMarket");
    const pm = await PM.deploy(tokenAddr);
    await pm.waitForDeployment();
    const pmAddr = await pm.getAddress();

    console.log(`PredictionMarket: ${pmAddr}`);

    // Save Config
    const config = { pm: pmAddr, token: tokenAddr };
    fs.writeFileSync("market_config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

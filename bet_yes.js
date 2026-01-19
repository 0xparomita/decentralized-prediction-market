const { ethers } = require("hardhat");
const config = require("./market_config.json");

async function main() {
    const [_, user] = await ethers.getSigners();
    const pm = await ethers.getContractAt("PredictionMarket", config.pm, user);
    const token = await ethers.getContractAt("MockUSDC", config.token, user);

    // Give user tokens
    const [admin] = await ethers.getSigners();
    await token.connect(admin).transfer(user.address, ethers.parseEther("100"));

    const amount = ethers.parseEther("50");
    const marketId = 0;
    const YES = 1; // Enum: PENDING=0, YES=1, NO=2

    console.log("Approving...");
    await token.approve(config.pm, amount);

    console.log("Betting YES...");
    const tx = await pm.bet(marketId, YES, amount);
    await tx.wait();

    console.log("Bet Placed!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

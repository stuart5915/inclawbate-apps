const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const CLAWS = process.env.CLAWS_TOKEN;
  const DD = process.env.DD_TOKEN;
  const CREATOR = process.env.OWNER_WALLET;
  const RATE = 5; // 1 CLAWS = 5 DD

  console.log("Deploying ClawsToDDSwap...");
  console.log("  CLAWS:", CLAWS);
  console.log("  DD:   ", DD);
  console.log("  Creator:", CREATOR);
  console.log("  Rate:", RATE, "DD per CLAWS");

  const factory = await hre.ethers.getContractFactory("ClawsToDDSwap");
  const contract = await factory.deploy(CLAWS, DD, CREATOR, RATE);
  await contract.waitForDeployment();

  const addr = await contract.getAddress();
  console.log("\nClawsToDDSwap deployed to:", addr);
  console.log("\nIMPORTANT: Fund the contract with DD tokens before users can swap.");
  console.log("Send DD to:", addr);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

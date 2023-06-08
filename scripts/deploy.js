const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Fetching deployer balance...");
  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance));

  console.log("Deploying NFTMarketplace contract...");
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();


  console.log("Waiting for NFTMarketplace deployment to complete...");
  await nftMarketplace.deployed();

  console.log("NFTMarketplace contract deployed successfully!");
  console.log("Deployed contract address:", nftMarketplace.address);
}

main().catch((error) => {
  console.error("Error during deployment:", error);
  process.exitCode = 1;
});
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    // hardhat: {},
    
    polygon_mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/Gd_K-PgxidV-ArTJ0hwTg1wLC1jxYWSu",
      accounts: [
        `0x${"be9692e6bbb260b8ca72467e7af9e60542ec64e28bf73000d976cb31063b2f2c"}`,
      ],
    },
    mainnet: {
      url: "https://polygon-mainnet.infura.io/v3/95256f155f14462998353b7c1e4eec95",
      accounts: [
        `0x${"fcab45e9b773c4f7f159964f9a8bdf018753ca13cf895aa4c2fdaa5302e94db0"}`,
      ],
    },
    matic_mainnet: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/dDLPKmZMUzSypOG6cBRmTCwWX9NljA_d",
      accounts: [
        `0x${"fcab45e9b773c4f7f159964f9a8bdf018753ca13cf895aa4c2fdaa5302e94db0"}`,
      ],
    },
  },
};

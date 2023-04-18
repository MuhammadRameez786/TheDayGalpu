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
  },
};

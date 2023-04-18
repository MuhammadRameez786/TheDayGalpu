import React, { useState, useEffect, useContext } from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

// This should already be declared in your API file

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const projectId = "2NJsvBEmmvZhXzdTRZ8zsCgtKC5";
const projectSecretKey = "78df09bb9b83f3b80f6dec1d2125f821";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`;

const subdomain = "https://day-galpu-club.infura-ipfs.io";

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
});

//INTERNAL  IMPORT
import {
  NFTMarketplaceAddress,
  NFTMarketplaceABI,
  transferFundsAddress,
  transferFundsABI,
} from "./constants";

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

//---CONNECTING WITH SMART CONTRACT

const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Wenb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect, and sell NFTs";

  //------USESTAT
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const router = useRouter();

  //---CHECK IF WALLET IS CONNECTD
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // console.log(accounts[0]);
      } else {
        // setError("No Account Found");
         //setOpenError(true);
        console.log("No account");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const getBalance = await provider.getBalance(accounts[0]);
      const bal = ethers.utils.formatEther(getBalance);
      setAccountBalance(bal);
    } catch (error) {
      // setError("Something wrong while connecting to wallet");
      // setOpenError(true);
      console.log("not connected");
    }
  };

  // useEffect(() => {
  //   // checkIfWalletConnected();
  //   // connectingWithSmartContract();
  // }, []);

  //---CONNET WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(false), setError("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);

      // window.location.reload();
      connectingWithSmartContract();
    } catch (error) {
      // setError("Error while connecting to wallet");
      // setOpenError(true);
    }
  };

  //---UPLOAD TO IPFS FUNCTION
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError("Error Uploading to IPFS");
      setOpenError(true);
    }
  };

  //---CREATENFT FUNCTION
  const createNFT = async (name, price, image, description, router, website, royalties, fileSize, collectionName, currentAccount, ) => {
    console.log("CreateNFT", name, description, collectionName);
    if (!name || !description || !price || !image)
      return setError("Data Is Missing"), setOpenError(true);

    const data = JSON.stringify({ name, description, image });

    try {
      const added = await client.add(data);

      const url = `${subdomain}/ipfs/${added.path}`;

      await createSale(url, false, null, price, name, image, description, website, royalties, fileSize, currentAccount, collectionName);
      // router.push("/searchPage");
    } catch (error) {
      console.log("CreatError", error);
      setError("Error while creating NFT");
      setOpenError(true);
    }
  };

  //--- createSale FUNCTION
  const createSale = async (url, isReselling, id, formInputPrice, name, image, description, website, royalties, fileSize, currentAccount, collectionName) => {
    try {
      //console.log(url, isReselling, id, formInputPrice, name, image, description, collectionName);
      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      const priceString = price.toString();
      console.log("Price:", ethers.utils.formatEther(price));

      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingPrice();

      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });

      await transaction.wait();
      console.log(transaction.from);

      const apiData = { name, price: ethers.utils.formatEther(price), image, description, website, royalties, fileSize, seller: transaction.from, collectionName };
      console.log("APIData", apiData);
  
      const apiResponse = await axios.post("http://localhost:4000/api/v1/nfts", apiData);
      console.log(apiResponse.data);
    } catch (error) {
      setError("error while creating sale");
      setOpenError(true);
      console.log(error);
    }
  };

  //--FETCHNFTS FUNCTION
  const fetchNFTs = async () => {
    try {
      if (currentAccount) {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://polygon-mumbai.g.alchemy.com/v2/Gd_K-PgxidV-ArTJ0hwTg1wLC1jxYWSu",
        );
        console.log(provider);
        const contract = fetchContract(provider);

        const data = await contract.fetchMarketItems();
        //console.log("FetchID", data);

        const items = await Promise.all(
          data.map(
            async ({ tokenId, seller, owner, price: unformattedPrice }) => {
              const tokenURI = await contract.tokenURI(tokenId);

              const response = await fetch(tokenURI);
            const { image, name, description } = await response.json();
              const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                "ether"
              );

              return {
                price,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
                collectionName,
              };
            }
          )
        );

        console.log(items);
        return items;
      }
    } catch (error) {
      setError("Error while fetching NFTS");
      setOpenError(true);
      console.log(error);
    }
  };

  // const fetchNFTs = async () => {
  //   try {
  //     if (currentAccount) {
  //       const provider = new ethers.providers.JsonRpcProvider(
  //         "https://polygon-mumbai.g.alchemy.com/v2/Gd_K-PgxidV-ArTJ0hwTg1wLC1jxYWSu",
  //       );
  //       console.log(provider);
  //       const contract = fetchContract(provider);

  //       //console.log("data before contract.fetchMarketItems()", data);

  //       const data = await contract.fetchMarketItems();

  //       //console.log("data after contract.fetchMarketItems()", data);

  //       const items = await Promise.all(
  //         data.map(
  //           async ({ tokenId, seller, owner, price: unformattedPrice }) => {
  //             const tokenURI = await contract.tokenURI(tokenId);
  //             //console.log("TkenURI", tokenURI);

  //             // const response = await fetch(tokenURI);
  //             // const data = await response.json();
  //             // console.log("Data:", data);
  //             //  const image = data.image;
  //             // // const name = data.name;
  //             // // const description = data.description;
  //             // const price = ethers.utils.formatUnits(
  //             //   unformattedPrice.toString(),
  //             //   "ether"
  //             // );

  //             const { data } = await axios.get(tokenURI).catch(error => {
  //               console.log(error.message);
  //               console.log(error.response);
  //               console.log(error.request);
  //               throw error;
  //             });
              
  //             if (!data) {
  //               throw new Error("Failed to fetch data from token URI");
  //             }
  //             const { image, name, description } = data;
  //             //console.log("Data:", data);
  //              //const image = data.image;
  //             // const name = data.name;
  //             // const description = data.description;
  //             const price = ethers.utils.formatUnits(
  //               unformattedPrice.toString(),
  //               "ether"
  //             );

  //             return {
  //               price,
  //               tokenId: tokenId.toNumber(),
  //               seller,
  //               owner,
  //               image,
  //               name,
  //               description,
  //               tokenURI,
  //             };
  //           }
  //         )
  //       );
  //       //console.log("items after Promise.all()", items);

  //       return items;
  //     }
  //   } catch (error) {
  //     setError("Error while fetching NFTS");
  //     setOpenError(true);
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (currentAccount) {
    fetchNFTs();
    }
  }, []);

  //--FETCHING MY NFT OR LISTED NFTs
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      if (currentAccount) {
        const contract = await connectingWithSmartContract();

        const data =
          type == "fetchItemsListed"
            ? await contract.fetchItemsListed()
            : await contract.fetchMyNFTs();

        const items = await Promise.all(
          data.map(
            async ({ tokenId, seller, owner, price: unformattedPrice }) => {
              const tokenURI = await contract.tokenURI(tokenId);
              const {
                data: { image, name, description },
              } = await axios.get(tokenURI);
              const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                "ether"
              );

              return {
                price,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
              };
            }
          )
        );
        
        return items;
        
      }
    } catch (error) {
      // setError("Error while fetching listed NFTs");
      // setOpenError(true);
    }
  };

  useEffect(() => {
    fetchMyNFTsOrListedNFTs();
  }, []);

  //---BUY NFTs FUNCTION
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.seller, {
        value: price,
      });

      await transaction.wait();
      router.push("/author");
    } catch (error) {
      console.log("ERROR>>", error);
      setError("Error While buying NFT");
      setOpenError(true);
    }
  };

  //------------------------------------------------------------------

  //----TRANSFER FUNDS

  const fetchTransferFundsContract = (signerOrProvider) =>
    new ethers.Contract(
      transferFundsAddress,
      transferFundsABI,
      signerOrProvider
    );

  const connectToTransferFunds = async () => {
    try {
      const web3Modal = new Wenb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchTransferFundsContract(signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };
  //---TRANSFER FUNDS
  const [transactionCount, setTransactionCount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const transferEther = async (address, ether, message) => {
    try {
      if (currentAccount) {
        const contract = await connectToTransferFunds();
        console.log(address, ether, message);

        const unFormatedPrice = ethers.utils.parseEther(ether);
        // //FIRST METHOD TO TRANSFER FUND
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: address,
              gas: "0x5208",
              value: unFormatedPrice._hex,
            },
          ],
        });

        const transaction = await contract.addDataToBlockchain(
          address,
          unFormatedPrice,
          message
        );

        console.log(transaction);

        setLoading(true);
        transaction.wait();
        setLoading(false);

        const transactionCount = await contract.getTransactionCount();
        setTransactionCount(transactionCount.toNumber());
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //FETCH ALL TRANSACTION
  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const contract = await connectToTransferFunds();

        const avaliableTransaction = await contract.getAllTransactions();

        const readTransaction = avaliableTransaction.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        }));

        setTransactions(readTransaction);
        console.log(transactions);
      } else {
        console.log("On Ethereum");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <NFTMarketplaceContext.Provider
      value={{
        checkIfWalletConnected,
        connectWallet,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        currentAccount,
        titleData,
        setOpenError,
        openError,
        error,
        transferEther,
        getAllTransactions,
        loading,
        accountBalance,
        transactionCount,
        transactions,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.4;

// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


// contract Collection is ERC721URIStorage {
//     using Counters for Counters.Counter;
//     Counters.Counter private _collectionIds;

//     struct CollectionData {
//         string name;
//         string symbol;
//         address owner;
//         bool initialized;
//     }

//     mapping(uint256 => CollectionData) private _collections;
//     mapping(string => bool) private _symbols;

//     event CollectionCreated(uint256 indexed collectionId, address indexed owner, string name, string symbol);

//     constructor() ERC721("Collections", "COLL") {}

//     /**
//      * @dev Creates a new collection with the given name and symbol.
//      * Reverts if a collection with the same symbol already exists.
//      */
//     function createCollection(string memory name, string memory symbol) external returns (uint256) {
//         require(!_symbols[symbol], "Collection: symbol already exists");
//         _collectionIds.increment();
//         uint256 newCollectionId = _collectionIds.current();
//         _collections[newCollectionId] = CollectionData(name, symbol, msg.sender, true);
//         _symbols[symbol] = true;
//         _mint(msg.sender, newCollectionId);
//         emit CollectionCreated(newCollectionId, msg.sender, name, symbol);
//         return newCollectionId;
//     }

//     /**
//      * @dev Returns the name and symbol of the collection with the given ID.
//      * Reverts if the collection does not exist or has not been initialized.
//      */
//     function getCollection(uint256 collectionId) external view returns (string memory, string memory) {
//         require(_collections[collectionId].initialized, "Collection: collection does not exist or has not been initialized");
//         return (_collections[collectionId].name, _collections[collectionId].symbol);
//     }

//     /**
//      * @dev Returns the ID of the collection with the given symbol.
//      * Reverts if the collection does not exist or has not been initialized.
//      */
//     function getCollectionId(string memory symbol) external view returns (uint256) {
//         require(_symbols[symbol], "Collection: symbol does not exist");
//         for (uint256 i = 1; i <= _collectionIds.current(); i++) {
//             if (keccak256(bytes(_collections[i].symbol)) == keccak256(bytes(symbol))) {
//                 return i;
//             }
//         }
//         revert("Collection: symbol does not exist");
//     }
// }

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// add openzeppelin ownable contract
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Base58.sol";

contract Content_Registry is Ownable, Base58 {
    constructor() {
        // set the owner of the contract to the address that deployed it
        transferOwnership(msg.sender);
    }

    struct content_id {
        bytes32 hash;
        uint8 hash_function;
        uint8 size;
    }

    uint32 public content_count;
    mapping(uint32 => content_id) content;

    function Register_Content(string memory ipfs_cid) public onlyOwner {
        content[content_count] = cidToContentID(ipfs_cid);
        content_count++;
    }
    
    function Delete_Content(uint32 content_idx) public onlyOwner {
        delete(content[content_idx]);
    }

    function get_cids_from_content_list(uint32 from_idx, uint32 to_idx)  public view returns (string[] memory) {
        if(content_count == 0 || from_idx > content_count) return new string[](0);
        if(to_idx > content_count) to_idx = content_count;        
        string[] memory cids = new string[](to_idx - from_idx);
        for (uint32 i = from_idx; i < to_idx; i++) {
            cids[i - from_idx] = content_idx_to_cid(i);
        }
        return cids;
    }



    function cidToContentID(string memory cid) public pure returns (content_id memory) {
        // Convert the CID from base58 to bytes
        bytes memory cidBytes = Base58.decode(bytes(cid));
        // Convert the bytes to a content_id struct
        return content_id(
            bytes32(slice(cidBytes,2,34)),
            uint8(cidBytes[0]), 
            uint8(cidBytes[1])
        );
    }

    function content_idx_to_cid(uint32 content_idx) public view returns (string memory) {
        // Get the content_id struct
        content_id memory cid = content[content_idx];

        if(cid.hash == bytes32(0)) return "";

        // Convert the content_id struct to bytes
        bytes memory cidBytes = abi.encodePacked(cid.hash_function, cid.size, cid.hash);
        // Convert the bytes to a CID
        return string(Base58.encode(cidBytes));
    }

    
}

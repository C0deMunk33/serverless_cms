// node run ganache
// npx hardhat run --network localhost scripts/deploy.js
// ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
// ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST"]'
// ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'
// ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'
// ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
//ipfs daemon

// unpin all 
// ipfs pin ls --type recursive | cut -d' ' -f1 | xargs -n1
// ipfs pin rm cid
// ipfs repo gc
const hre = require("hardhat");

async function main() {
  const Content_Registry = await ethers.getContractFactory("Content_Registry");
  const content_registry = await Content_Registry.deploy();
  await content_registry.deployed();

 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

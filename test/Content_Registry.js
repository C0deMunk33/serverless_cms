
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deployment", function () {

  it("should register content", async function () {
    // deploy the contract
    const Content_Registry = await ethers.getContractFactory("Content_Registry");
    const content_registry = await Content_Registry.deploy();
    await content_registry.deployed();

    // register content
    await content_registry.Register_Content("QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR")
    // check if content is registered
    let content = await content_registry.get_cids_from_content_list(0,100)

    console.log(content)


  });

  it("should register 20 pieces of content", async function () {
    // deploy the contract"
    const Content_Registry = await ethers.getContractFactory("Content_Registry");
    const content_registry = await Content_Registry.deploy();
    await content_registry.deployed();

    // register content
    for (let i = 0; i < 20; i++) {
      await content_registry.Register_Content("QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR")
    }

    // check if content is registered
    let content = await content_registry.get_cids_from_content_list(0,100)

    console.log(content)
  })

  it("should register 20 pieces of content, then remove 10 pieces of content", async function () {
    // deploy the contract"
    const Content_Registry = await ethers.getContractFactory("Content_Registry");
    const content_registry = await Content_Registry.deploy();
    await content_registry.deployed();

    // register content
    for (let i = 0; i < 20; i++) {
      await content_registry.Register_Content("QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR")
    }

    for(let i = 0; i < 10; i++) {
      await content_registry.Delete_Content(i)
    }

    // check if content is registered
    let content = await content_registry.get_cids_from_content_list(0,100)

    console.log(content)
  })

});


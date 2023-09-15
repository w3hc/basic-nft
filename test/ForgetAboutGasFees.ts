import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Forget about gas fees NFT", function () {

  async function deployContracts() {
    const [alice, bob] = await ethers.getSigners()
    const Forget = await ethers.getContractFactory("ForgetAboutGasFees");
    const nft = await Forget.deploy();
    return { nft, alice, bob }
  }

  describe("Deployment", function () {
    it("Should have the right tokenUri", async function () {
      const { nft, alice } = await loadFixture(deployContracts);
      await nft.safeMint(alice.address);
      expect(await nft.tokenURI(0)).to.be.equal("https://bafybeiclkhgba2sluliach3jf6ju7euh24cttb6icwuubsdz4gxb4ft4zy.ipfs.w3s.link/metadata.json")
    })
  })
  describe("Interactions", function () {
    it("Should mint 1 NFT", async function () {
      const { nft, alice } = await loadFixture(deployContracts);
      await nft.safeMint(alice.address);
      expect(await nft.ownerOf(0)).to.be.equal(alice.address);
    })
    it("Should mint 100 NFTs", async function () {
      const { nft, alice } = await loadFixture(deployContracts);
      for (let i = 0 ; i < 100 ; i++) {
        const mint = await nft.safeMint(alice.address);
        const mintReceipt = await mint.wait(1);
      }
      expect(await nft.balanceOf(alice.address)).to.be.equal(100);
    })
    it("Should transfer the NFT", async function () {
      const { nft, alice, bob } = await loadFixture(deployContracts);
      await nft.safeMint(alice.address);
      expect(await nft.ownerOf(0)).to.be.equal(alice.address);
      await nft.connect(alice).transferFrom(alice.address, bob.address, 0);
      expect(await nft.ownerOf(0)).to.be.equal(bob.address);
    })
  })
})
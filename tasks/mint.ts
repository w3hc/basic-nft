import { task } from "hardhat/config"
var msg = (require("cli-color")).xterm(39).bgXterm(128)
import { ethers } from 'hardhat'
import * as store from '../store.json'

task("mint", "Mint an NFT")
.addParam("to").setAction(

    async (arg) => {
        const [signer] = await ethers.getSigners()
        const Basic = await ethers.getContractFactory('ForgetAboutGasFees')
        const addr = store.contractAddress
        const nft = new ethers.Contract(addr, Basic.interface, signer)
        const mint = await nft.safeMint(arg.to)
        const hash = mint.hash
        console.log("Minted 1 NFT for", msg(arg.to), "\n\nTx hash:", msg(hash))
    }
);

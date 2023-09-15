const color = require("cli-color")
var msg = color.xterm(39).bgXterm(128)
import fs from 'fs'

async function main() {

  const ForgetAboutGasFees = await ethers.getContractFactory("ForgetAboutGasFees")
  const basic = await ForgetAboutGasFees.deploy()

  const recordAddress = {
    "contractAddress": await basic.getAddress()
  }
  
  const content = JSON.stringify(recordAddress, null, 2)
  fs.writeFileSync('store.json', content)

  console.log('Forget about gas fees NFT contract deployed:', msg(await basic.getAddress()))
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
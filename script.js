const compiler = require("solc");
const ethers = require("ethers");
const fs = require("fs");

async function main(){

    var sourceCode = fs.readFileSync("Hello.sol", "utf8");

    var compilerInput = {
        language: "Solidity",
        sources: {
            contract: {
                content: sourceCode
            }
        },
        settings: {
            outputSelection: {
                "*": {
                    "*": ["*"]
                }
            }
        }
    };

    var compilerOutput = JSON.parse(compiler.compile(JSON.stringify(compilerInput)));

    var contractBytecode = compilerOutput.contracts.contract.Hello.evm.bytecode.object;
    var contractABI = compilerOutput.contracts.contract.Hello.abi;

    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    const signer = provider.getSigner(0);

    const accountAddress = await signer.getAddress();

    // console.log(accountAddress)

    // const helloContract = new ethers.ContractFactory(contractABI, contractBytecode, signer);
    // const deployedContract = helloContract.deploy()

    const contract = new ethers.Contract("0xb26cb44e4409bed3de8b3761393f4237bab1eca3", contractABI, provider);

    // var greeting = await contract.getGreeting();

    // console.log(greeting);

    var newGreeting = await contract.connect(signer).setGreeting("Ganache Sucks!");

    var greeting = await contract.getGreeting();

    console.log(greeting);

}

main();
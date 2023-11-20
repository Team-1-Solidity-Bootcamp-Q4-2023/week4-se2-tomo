import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
<<<<<<< HEAD

/**
 * Deploys a contract named "TokenizedBallot using the deployer account and
=======
import { ethers } from "ethers";

/**
 * Deploys a contract named "MyToken" using the deployer account and
>>>>>>> 2757995618efd55a6eb995701f2cec73926e2c10
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployTokenizedBallot: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    /*
      On localhost, the deployer account is the one that comes with Hardhat, which is already funded.
  
      When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
      should have sufficient balance to pay for the gas fees for contract creation.
  
      You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
      with a random private key in the .env file (then used on hardhat.config.ts)
      You can run the `yarn account` command to check your balance in every network.
    */
    const { deployer } = await hre.getNamedAccounts();
    const { deploy } = hre.deployments;

    // const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

    const provider = hre.ethers.provider;

    const MyToken = await hre.ethers.getContract("MyToken", deployer);

    // const proposals = PROPOSALS.map((proposal) => hre.ethers.utils.formatBytes32String(proposal));

    const lastBlock = await provider.getBlock("latest");
    const lastBlockNumber = lastBlock?.number ?? 0;
    if (lastBlockNumber === 0) {
        throw new Error("lastBlockNumber is 0");
    }

    const PriceContract = await hre.ethers.getContract("PriceContract", deployer);

    await deploy("TokenizedBallot", {
        from: deployer,
        // Contract constructor arguments
        // args: [proposals, MyToken.address, lastBlockNumber - 1],
        args: [PriceContract.address, MyToken.address, lastBlockNumber - 1],
        log: true,
        // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
        // automatically mining the contract deployment transaction. There is no effect on live networks.
        autoMine: true,
    });

    // Get the deployed contract
    // const TokenizedBallot await hre.ethers.getContract("TokenizedBallot, deployer);
};

export default deployTokenizedBallot;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags TokenizedBallot
deployTokenizedBallot.tags = ["TokenizedBallot"];
const deployMyToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const targetContract = ethers.utils.getAddress("0xa29a587a007aad8fad97660c84343355fb3f93f0");

  await deploy("TokenizedBallot", {
    from: deployer,
    // Contract constructor arguments
    args: [[ethers.utils.formatBytes32String("BTC"), ethers.utils.formatBytes32String("ETH")], targetContract, 4],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract
  // const MyToken = await hre.ethers.getContract("MyToken", deployer);
};

export default deployMyToken;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags MyToken
deployMyToken.tags = ["TokenizedBallot"];

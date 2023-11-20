import { NextApiRequest, NextApiResponse } from 'next';
import { createWalletClient, createPublicClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { http } from 'viem'

import scaffoldConfig from "~~/scaffold.config";
import { Contract, ContractName, contracts } from "~~/utils/scaffold-eth/contract";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method);
    // console.log(req.body);

    let to;

    if (req.method === 'GET') {
        to = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    } else if (req.method === 'POST') {
        // const requestData = JSON.parse(req.body);
        to = req.body.to;
    } else {
        // Return an error for other HTTP methods
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    // const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    // const transport = http(process.env.RPC_ENDPOINT_URL);
    // const client = createPublicClient({
    //     chain: scaffoldConfig.targetNetwork,
    //     transport,
    // });
    const account = privateKeyToAccount('0x' + process.env.PRIVATE_KEY as `0x${string}`);
    const client = createWalletClient({
        account,
        chain: scaffoldConfig.targetNetwork,
        // transport: http()
        transport: http(process.env.RPC_ENDPOINT_URL ?? "" as `http://${string}`)
    });

    // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    //(async () => {
    const deployedContract = contracts?.[scaffoldConfig.targetNetwork.id]?.[
        'MyToken' as ContractName
    ] as Contract<'MyToken'>;
    // console.log(deployedContract);

    const tx = await client.writeContract({
        address: deployedContract.address,
        abi: deployedContract.abi,
        functionName: 'mint',
        // args: [acc2.address, BigInt(100) * BigInt(10) ** BigInt(18)],
        args: [to, BigInt(100) * BigInt(10 ** 18)],
    });
    console.log(tx);
    res.status(200).json({ message: 'Mint Success' });

}

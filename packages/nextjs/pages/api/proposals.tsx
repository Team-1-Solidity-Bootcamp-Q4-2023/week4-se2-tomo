import { NextApiRequest, NextApiResponse } from 'next';
import { createPublicClient } from 'viem'
import { http, hexToString } from 'viem'

import scaffoldConfig from "~~/scaffold.config";
import { Contract, ContractName, contracts } from "~~/utils/scaffold-eth/contract";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method);

  // const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
  // const transport = http(process.env.RPC_ENDPOINT_URL);
  const transport = http(scaffoldConfig.targetNetwork.rpcUrls.default.http[0]);
  const client = createPublicClient({
    chain: scaffoldConfig.targetNetwork,
    transport,
  });

  const deployedContract = contracts?.[scaffoldConfig.targetNetwork.id]?.[
    'TokenizedBallot' as ContractName
  ] as Contract<'TokenizedBallot'>;

  const proposals = [];
  let i = 0n;
  while (true) {
    try {
      const [name, vc] = await client.readContract({
        address: deployedContract.address,
        abi: deployedContract.abi,
        functionName: 'proposals',
        args: [i],
      });
      console.log(`Proposal ${i}: ${hexToString(name)}, ${vc.toString()}`);
      proposals.push(hexToString(name).replace(/\u0000/g, ''));
    } catch (e) {
      break;
    }

    i++;
  }
  // const [n, vc] = await client.readContract({
  //     address: deployedContract.address,
  //     abi: deployedContract.abi,
  //     functionName: 'proposals',
  //     args: [0n],
  // });


  res.status(200).json({ message: 'Success', proposals: proposals });

}

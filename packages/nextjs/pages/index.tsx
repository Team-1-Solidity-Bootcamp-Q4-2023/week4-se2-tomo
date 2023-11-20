import WalletInfo from "../components/WalletInfo";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { useAccount } from 'wagmi'
import { Address as AddressType, createWalletClient, hexToBigInt, http, parseEther } from "viem";
import { hexToString } from 'viem'
import { Address, AddressInput, Balance, EtherInput, getParsedError } from "~~/components/scaffold-eth";
import { useState } from "react";
import { useDeployedContractInfo, useScaffoldContractRead, useScaffoldContractWrite, useNetworkColor } from "~~/hooks/scaffold-eth";
import SelectProposal from "~~/components/SelectProposal";
import RecentVotesList from "~~/components/RecentVotesList";

const Home: NextPage = () => {
  const [inputAddress, setInputAddress] = useState<AddressType>();
  const [voteAmount, setVoteAmount] = useState('0');
  const [selectedProposal, setSelectedProposal] = useState(0);
  const { address, isConnecting, isDisconnected } = useAccount();

  const { writeAsync: writeAsyncDelegate, isLoading } = useScaffoldContractWrite({
    contractName: "MyToken",
    functionName: 'delegate',
    args: [
      inputAddress
    ],
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  const { writeAsync: writeAsyncSelfDelegate } = useScaffoldContractWrite({
    contractName: "MyToken",
    functionName: 'delegate',
    args: [
      address
    ],
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { data: winnerName, isLoading: isWon } = useScaffoldContractRead({
    contractName: "TokenizedBallot",
    functionName: "winnerName",
    // args: [],
  });
  const normalizedWinnerName = (name: `0x${string}`) => {
    if (hexToString(name).replace(/\u0000/g, '').endsWith(' BTC')) {
      return hexToString(name).replace(/\u0000/g, '');
    } else {
      return (hexToBigInt(name) / BigInt(1e18)).toString();
    }
  } 
  const { data: votingPower, isLoading: isLoadingBalance } = useScaffoldContractRead({
    contractName: "TokenizedBallot",
    functionName: "votingPower",
    args: [address],
  });
  const { writeAsync: vote, isLoading: isVoting } = useScaffoldContractWrite({
    contractName: "TokenizedBallot",
    functionName: 'vote',
    args: [
      BigInt(selectedProposal),
      BigInt(parseInt(voteAmount))
    ],
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);

      fetch('/api/logvote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voter: address,
          proposal: selectedProposal,
          amount: voteAmount,
          txHash: txnReceipt.transactionHash, // TODO: check if this is valid vote
        }),
      });
    },
  });

  return (
    <>
<<<<<<< HEAD
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Tokenized Ballot Vote!</span>
            <p className="text-center text-lg">
              Would you rather have 1 BTC or this much USD?
            </p>

          </h1>
          <h2 className="text-center mb-8">
            <span className="block text-2xl mb-2">Winner:</span>
            <span className="block text-4xl font-bold">{winnerName ? normalizedWinnerName(winnerName) : '...'}</span>
          </h2>
          <p className="text-center text-lg">
            Get started by minting{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              /api/mint
            </code>
          </p>
          <p className="text-center text-lg">
            Deploy smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              TokenizedBallot.sol
            </code>{" "}
            running {" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              yarn deploy --tags TokenizedBallot
            </code>
          </p>
          <p className="text-center text-lg">
            generateTsAbis{" "}
            running {" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              yarn deploy --tags generateTsAbis
            </code>
          </p>
        </div>

        <RecentVotesList />

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <p className="text-center text-lg">
                Delegate your vote to:{" "}
              </p>
              <AddressInput
                placeholder="Destination Address"
                value={inputAddress ?? ""}
                onChange={value => setInputAddress(value)}
              />
              <button
                type="button"
                className="bg-blue-500 text-white m-2 p-2 rounded hover:bg-blue-700"
                onClick={(e) => {
                  writeAsyncDelegate();
                  e.preventDefault();
                }}
              >
                Delegate
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white m-2 p-2 rounded hover:bg-blue-700"
                onClick={(e) => {
                  writeAsyncSelfDelegate();
                  e.preventDefault();
                }}
              >
                Self-Delegate
              </button>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <p className="text-center text-lg">
                Your voting power{" "}
                <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
                  {votingPower ? votingPower.toString() : "0"}
                </code>{" "}
              </p>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="voteAmount">
                voting Amount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="voteAmount"
                type="text" 
                value={voteAmount}
                onChange={(e) => setVoteAmount(e.target.value)}
              />
              <SelectProposal apiUrl='/api/proposals' onSelectChange={setSelectedProposal}/>
              <button
                type="button"
                className="bg-blue-500 text-white m-2 p-2 rounded hover:bg-blue-700"
                onClick={(e) => {
                  vote();
                  e.preventDefault();
                }}
              >
                Vote
              </button>

            </div>
          </div>
        </div>
=======
      <div className="w-screen flex items-center justify-center flex-col flex-grow pt-10">
        <WalletInfo />
>>>>>>> 2757995618efd55a6eb995701f2cec73926e2c10
      </div>
    </>
  );
};

export default Home;

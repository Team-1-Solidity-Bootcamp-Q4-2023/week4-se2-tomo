import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { Address as AddressType, createWalletClient, http, parseEther } from "viem";
import { Address, AddressInput, Balance, EtherInput, getParsedError } from "~~/components/scaffold-eth";
import { useState } from "react";
import { useDeployedContractInfo, useScaffoldContractWrite, useNetworkColor } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const [inputAddress, setInputAddress] = useState<AddressType>();

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "MyToken",
    functionName: 'delegate',
    args: [
      inputAddress
    ],
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Tokenized Ballot Vote!</span>
          </h1>
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
                  writeAsync();
                  e.preventDefault();
                }}
              >
                Delegate
              </button>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

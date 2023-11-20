A dapp with voting tokens, and a deployable ballot which takes its proposals from a Tellor Oracle, allowing voters to record whether they prefer 1 BTC or some amount of USD (amount set by Oracle). Voters may vote multiple times in any proposal until using up all of their voting power.

MyToken is an ERC20 token which anyone (currently) can request from the faucet by posting an address to the API (server component). This contract is first deployed and then voters can use the frontend to self-delegate or delegate to another (following the erc20votes interface).

PriceContract is a contract using Tellor to record a recent BTC USD price which is automatically used by the ballot. It's using the Oracle contract on Sepolia.

TokenizedBallot can be deployed at will and takes a snapshot of eligible voters in the previous block and creates proposals based on the Oracle BTC price. The frontend allows voters to connect their wallet to view their (remaining) voting power and enter an amount to use to vote on one of the proposals for the current ballot. They can view the current tally of votes for each proposal. This data is fetches by our own backend API which uses viem to read from the contracts and transform the results for display.

The home page fetches the current winner of the ballot and displays it at the top.

Each vote from the frontend will record the transaction hash in a Postgres database using Prisma via API and the most recent votes are displayed on the home page. This database will be live for the rest of the week.

The website and database are hosted on Vercel. The dapp is made completely within the scaffold-eth repo using hardhat to deploy to Sepolia and Tailwind CSS to style NextJS (on top of React)
import { useBalance, useNetwork } from "wagmi";

export default function WalletBalance({ address }: { address: string }) {
  const { data, isError, isLoading } = useBalance({
    address,
  });
  const { chain } = useNetwork();

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <p>Your account address is {address}</p>
        <p>Connected to the network {chain?.name}</p>
        Your Balance: {data?.formatted} {data?.symbol}
      </div>
    </div>
  );
}

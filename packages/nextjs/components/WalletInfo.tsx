import ApiData from "./ApiData";
import WalletBalance from "./WalletBalance";
import { useAccount } from "wagmi";

export default function WalletInfo() {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (address)
    return (
      <div className="flex flex-col items-center">
        <WalletBalance address={address} />
        <ApiData />
      </div>
    );
  if (isConnecting)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (isDisconnected)
    return (
      <div>
        <p>Wallet disconnected. Connect wallet to continue</p>
      </div>
    );
  return (
    <div>
      <p>Connect wallet to continue</p>
    </div>
  );
}

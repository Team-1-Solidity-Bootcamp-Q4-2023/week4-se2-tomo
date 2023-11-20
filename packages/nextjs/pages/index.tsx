import WalletInfo from "../components/WalletInfo";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="w-screen flex items-center justify-center flex-col flex-grow pt-10">
        <WalletInfo />
      </div>
    </>
  );
};

export default Home;

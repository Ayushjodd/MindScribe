import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";

const ConnectWallet = () => {
  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      console.log("Connected wallet address:", publicKey.toString());
    }
  }, [publicKey]);

  return (
    <div className="py-5">
      <WalletMultiButton />
    </div>
  );
};

export default ConnectWallet;

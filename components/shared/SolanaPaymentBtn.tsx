import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction, SystemProgram, PublicKey } from "@solana/web3.js";

const MembershipPayment = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handlePayment = async () => {
    if (!publicKey) return;
    try {
      const recipientPublicKey = "something-random(changing-later)";

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipientPublicKey),
          lamports: 1_000_000_000,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      console.log("Transaction signature:", signature);

      const confirmed = await connection.confirmTransaction(
        signature,
        "confirmed"
      );
      if (confirmed) {
        console.log("Payment confirmed");
      }
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment} disabled={!publicKey}>
        Pay for Membership
      </button>
    </div>
  );
};

export default MembershipPayment;

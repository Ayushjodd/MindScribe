import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction, SystemProgram, PublicKey } from "@solana/web3.js";
import { Button } from "../ui/button";
import { SiSolana } from "react-icons/si";
import toast from "react-hot-toast";

const MembershipPayment = ({ userId, membershipType }: any) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handlePayment = async () => {
    if (!publicKey) return;
    try {
      const recipientPublicKey = "9ZwAMzYADrdhsYZyaFjVhTG58MsjdytYsdHZTKPTmWEx";

      const lamportsPrice = {
        ADVANCE: 0.05 * 1_000_000_000,
        PRO: 0.1 * 1_000_000_000,
      };
      //@ts-ignore
      const lamports = lamportsPrice[membershipType] || 1_000_000_000;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipientPublicKey),
          lamports: lamports,
        })
      );

      const loadingToast = toast.loading("Processing payment...");

      const signature = await sendTransaction(transaction, connection);
      console.log("Transaction signature:", signature);

      const confirmed = await connection.confirmTransaction(
        signature,
        "confirmed"
      );
      if (confirmed) {
        console.log("Payment confirmed");

        const response = await fetch("/api/user/membership", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            membershipType,
            paymentMethod: "solana",
            transactionId: signature,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          toast.success("Membership updated successfully!");
          console.log("Membership updated successfully:", data);
        } else {
          toast.error("Failed to update membership.");
          console.error("Failed to update membership:", response.statusText);
        }
      } else {
        toast.error("Payment confirmation failed.");
      }

      toast.dismiss(loadingToast);
    } catch (error) {
      toast.dismiss();
      toast.error("Payment failed.");
      console.error("Payment failed", error);
    }
  };

  return (
    <div>
      <Button
        className="w-full focus:ring-4 focus:ring-blue-400"
        onClick={handlePayment}
        disabled={!publicKey}
      >
        Pay via Solana <SiSolana className="ml-2" />
      </Button>
    </div>
  );
};

export default MembershipPayment;

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction, SystemProgram, PublicKey } from "@solana/web3.js";
import { Button } from "../ui/button";
import { SiSolana } from "react-icons/si";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

const MembershipPayment = ({
  userId,
  membershipType,
}: {
  userId: string | undefined;
  membershipType: string;
  onSuccess: (tierName: string) => void;
}) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const router = useRouter();

  const triggerFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handlePayment = async () => {
    if (!publicKey) return;
    try {
      const recipientPublicKey = "9ZwAMzYADrdhsYZyaFjVhTG58MsjdytYsdHZTKPTmWEx";

      const lamportsPrice = {
        ADVANCE: 0.05 * 1_000_000_000,
        PRO: 0.1 * 1_000_000_000,
      };
      //@ts-expect-error - lamportsPrice is an object with string indexes for membership types
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
          triggerFireworks();

          setTimeout(() => {
            router.push("/blogs");
          }, 3000);

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
    <Button onClick={handlePayment} disabled={!publicKey} className="w-full">
      <SiSolana className="mr-2 h-4 w-4" />
      Pay with Solana
    </Button>
  );
};

export default MembershipPayment;

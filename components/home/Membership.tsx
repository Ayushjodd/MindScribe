"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, CreditCard } from "lucide-react";
import ConnectWallet from "../shared/ConnectWalletBtn";
import MembershipPayment from "../shared/SolanaPaymentBtn";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const membershipTiers = [
  {
    name: "BASIC",
    price: "₹0/month",
    description: "Enhanced features for regular bloggers",
    features: ["All Free features"],
  },
  {
    name: "ADVANCE",
    price: "₹799/month",
    priceInSol: "0.05",
    description: "Premium features for power users",
    features: [
      "All Basic features",
      "Early access to new features",
      "Custom blog themes",
      "Analytics dashboard",
      "Monetization options",
      "24/7 priority support",
    ],
  },
  {
    name: "PRO",
    price: "₹1499/month",
    priceInSol: "0.1",
    description: "Ultimate features for professional bloggers",
    features: [
      "All Advanced features",
      "Custom domain support",
      "API access",
      "White-label options",
      "Dedicated account manager",
      "Premium analytics",
    ],
  },
];

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState("Free");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [solExchangeRate, setSolExchangeRate] = useState(0);
  const router = useRouter();
  const session = useSession();
  const userId = session?.data?.user.id;

  useEffect(() => {
    // Fetch the current SOL to INR exchange rate
    async function fetchExchangeRate() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=inr"
        );
        const data = await response.json();
        setSolExchangeRate(data.solana.inr);
      } catch (error) {
        console.error("Failed to fetch SOL/INR exchange rate:", error);
      }
    }
    fetchExchangeRate();
  }, []);

  const getSolPrice = (priceInINR: any) =>
    (priceInINR / solExchangeRate).toFixed(5);

  const handleTierSelection = (tierName: any) => {
    setSelectedTier(tierName);
    if (tierName === "BASIC") {
      router.push("/blogs");
    }
  };

  return (
    <>
      <Toaster />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <div className="min-h-screen  px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <div>
              <Button
                onClick={() => {
                  router.push("/");
                }}
                variant={"default"}
                className="gap-2 mt-5"
              >
                <FaArrowLeftLong />
                Go Back
              </Button>
            </div>
            <ConnectWallet />
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-100 dark:text-gray-100 sm:text-4xl">
                Support great writing and access all stories on MindScribe.
              </h1>
              <p className="mt-2 text-xl text-gray-600 dark:text-gray-400">
                Select the plan that best fits your needs
              </p>
            </div>

            <div className="lg:mt-6 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
              {membershipTiers.map((tier) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`flex flex-col justify-between h-full ${
                      selectedTier === tier.name ? "border-primary" : ""
                    }`}
                  >
                    <CardHeader>
                      <CardTitle>{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                        {tier.price}
                      </p>
                      <ul className="mt-4 space-y-4">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0">
                              <Check
                                className="h-6 w-6 text-green-500"
                                aria-hidden="true"
                              />
                            </div>
                            <p className="ml-3 text-base text-gray-700 dark:text-gray-300">
                              {feature}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={
                          selectedTier === tier.name ? "default" : "outline"
                        }
                        onClick={() => handleTierSelection(tier.name)}
                      >
                        {selectedTier === tier.name ? "Selected" : "Select"}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {selectedTier !== "Free" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mt-12 max-w-md mx-auto"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>
                      Choose your preferred payment option
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      defaultValue="upi"
                      onValueChange={setPaymentMethod}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi">UPI</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="solana" id="solana" />
                        <Label htmlFor="solana">Solana</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                  <CardFooter>
                    {paymentMethod === "solana" ? (
                      <div className="w-full">
                        <MembershipPayment
                          userId={userId}
                          onSuccess={handleTierSelection}
                          membershipType={selectedTier}
                        />
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          toast.error("implementing soon");
                        }}
                        className="w-full"
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay with UPI
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

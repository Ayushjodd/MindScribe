"use client";

import { useState } from "react";
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
import { Check, CreditCard, Zap } from "lucide-react";
import NavForMembership from "../shared/NavForMembership";

const membershipTiers = [
  {
    name: "Free",
    price: "₹0/month",
    description: "Basic features for casual users",
    features: [
      "Access to public blog posts",
      "Limited commenting",
      "Basic profile customization",
      "Email support",
    ],
  },
  {
    name: "Basic",
    price: "₹299/month",
    description: "Enhanced features for regular bloggers",
    features: [
      "All Free features",
      "Ad-free experience",
      "Unlimited commenting",
      "Advanced profile customization",
      "Priority email support",
    ],
  },
  {
    name: "Advanced",
    price: "₹799/month",
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
];

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState("Free");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  return (
    <>
      <NavForMembership />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 sm:text-4xl">
              Support great writing and access all stories on Medium.
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              Select the plan that best fits your needs
            </p>
          </div>

          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
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
                    <ul className="mt-6 space-y-4">
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
                      onClick={() => setSelectedTier(tier.name)}
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
                  <Button className="w-full">
                    {paymentMethod === "upi" ? (
                      <CreditCard className="mr-2 h-4 w-4" />
                    ) : (
                      <Zap className="mr-2 h-4 w-4" />
                    )}
                    Pay with {paymentMethod === "upi" ? "UPI" : "Solana"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

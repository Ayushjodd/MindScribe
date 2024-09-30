"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import NavBar from "@/components/shared/NavBar";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Component() {
  const [twitter, setTwitter] = useState("");
  const [bio, setBio] = useState("");
  const [personalWebsite, setPersonalWebsite] = useState("");
  const [Telegram, setTelegram] = useState("");
  const [linkedIn, setLinkedIn] = useState("");

  const handleSubmit = async () => {
    try {
      const profileData = {
        twitter,
        bio,
        personalWebsite,
        Telegram,
        linkedIn,
      };
      const response = await axios.post("/api/user", profileData);

      if (response.status == 200) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(`Failed to update profile: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <NavBar />

      <div className="flex items-center justify-center min-h-screen">
        <div className="container max-w-lg p-6 transition-colors duration-300 dark:bg-[#030712] dark:text-white border rounded-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter Username</Label>
              <Input
                id="twitter"
                name="twitter"
                placeholder="@username"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio Website</Label>
              <Input
                id="portfolio"
                name="portfolio"
                placeholder="https://yourwebsite.com"
                value={personalWebsite}
                onChange={(e) => setPersonalWebsite(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telegram">Telegram Username</Label>
              <Input
                id="telegram"
                name="telegram"
                placeholder="@telegram_username"
                value={Telegram}
                onChange={(e) => setTelegram(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                name="linkedin"
                placeholder="https://linkedin.com/in/username"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </div>
            <Button onClick={handleSubmit} className="w-full">
              Save Profile
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}

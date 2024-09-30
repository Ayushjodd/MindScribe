"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import NavBar from "@/components/shared/NavBar";

export default function Component() {
  const [profile, setProfile] = useState({
    twitter: "",
    bio: "",
    portfolio: "",
    telegram: "",
    linkedin: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  function handleSubmit() {}

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
                value={profile.twitter}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself"
                value={profile.bio}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio Website</Label>
              <Input
                id="portfolio"
                name="portfolio"
                placeholder="https://yourwebsite.com"
                value={profile.portfolio}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telegram">Telegram Username</Label>
              <Input
                id="telegram"
                name="telegram"
                placeholder="@telegram_username"
                value={profile.telegram}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                name="linkedin"
                placeholder="https://linkedin.com/in/username"
                value={profile.linkedin}
                onChange={handleInputChange}
              />
            </div>
            <Button className="w-full">Save Profile</Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}

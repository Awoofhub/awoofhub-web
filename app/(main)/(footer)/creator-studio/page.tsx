"use client";
import Footer from "@/components/footer/Footer";
import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

import { useState } from "react";
import { Bell } from "lucide-react";

const socials = [
  { id: 0, icon: <FaInstagram />, handle: "@awoofhub" },
  { id: 1, icon: <FaLinkedinIn />, handle: "AwoofHub" },
  { id: 2, icon: <FaXTwitter />, handle: "@awoofhub" },
  { id: 3, icon: <FaFacebookF />, handle: "@awoofhub" },
];

export default function CreatorStudioPage() {

  return (
    <main className="bg-white">
      this is the creator studio page

      <Footer />
    </main>
  );
}

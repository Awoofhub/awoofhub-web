"use client";

import { User } from "@/types/user";
import { format } from "date-fns";
import { AboutItem } from "./AboutItem";

import { FaShieldHalved } from "react-icons/fa6";
import { FiCalendar, FiFileText, FiGlobe, FiMail, FiMapPin, FiUser } from "react-icons/fi";

interface Props {
  profile: User;
}

export function About({ profile }: Props) {
  const {
    name,
    email,
    website,
    bio,
    address,
    createdAt,
    role,
  } = profile;

  const roleLabel =
  role === "user"
    ? "Individual"
    : role === "business"
    ? "Business"
    : "Admin";

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      <AboutItem field="Name" value={name} Icon={FiUser} />

      <AboutItem field="Email" value={email} Icon={FiMail} />

      <AboutItem field="Bio" value={bio} Icon={FiFileText} />

      <AboutItem field="Account Type" value={roleLabel} Icon={FaShieldHalved} />

      <AboutItem field="Website" value={website} Icon={FiGlobe} />

      <AboutItem field="Address" value={address} Icon={FiMapPin} />

      <AboutItem
        field="Joined"
        value={format(new Date(createdAt), "MMMM d, yyyy")}
        Icon={FiCalendar}
      />
    </div>
  );
}
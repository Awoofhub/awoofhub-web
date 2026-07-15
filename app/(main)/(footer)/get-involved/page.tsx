"use client";
import Footer from "@/components/footer/Footer";
import { JoinCommunityForm } from "@/components/community/JoinCommunityForm";
import Image from "next/image";
import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

const socials = [
  { id: 0, icon: <FaInstagram />, handle: "@theawoofhub" },
  { id: 1, icon: <FaLinkedinIn />, handle: "AwoofHub" },
  { id: 2, icon: <FaXTwitter />, handle: "@theawoofhub" },
  { id: 3, icon: <FaFacebookF />, handle: "@theawoofhub" },
];

const features = [
  {
    icon: <Image width={30} height={30} alt="community-icon1" src="/community-icon1.png" className="text-primary w-5 h-5 md:w-7.5 md:h-7.5" />,
    text: "Connect with fellow Awoofers and join the conversation",
  },
  {
    icon: <Image width={30} height={30} alt="community-icon2" src="/community-icon2.png" className="text-primary w-5 h-5 md:w-7.5 md:h-7.5" />,
    text: "Share ideas, request features, and help shape AwoofHub",
  },
  {
    icon: <Image width={30} height={30} alt="community-icon3" src="/community-icon3.png" className="text-primary w-5 h-5 md:w-7.5 md:h-7.5" />,
    text: "Get early access to new features and exclusive community updates",
  },
];

export default function GetInvolved() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <div className="bg-background my-5">
        <section className="px-6 lg:px-8 xl:px-12 py-4 xs:py-6 max-w-[1440px] mx-auto text-center">
          <h2 className="text-primary text-sm xs:text-base px-6 py-2 rounded-xl mb-4 lg:mb-6 font-semibold inline-flex uppercase bg-gray-50 border border-gray-100 backdrop-blur-3xl shadow-md">
            Community
          </h2>
          <h1 className="text-2xl xs:text-3xl lg:text-5xl font-semibold text-black mb-2 lg:mb-4">
            Join the <span className="text-primary">Awoof</span>Hub Community
            on WhatsApp!
          </h1>
          <p className="text-muted text-sm xs:text-lg lg:text-xl font-medium max-w-5xl mx-auto mb-8">
            This is where AwoofHub users come together. Ask questions, share
            experiences, suggest improvements, and help us build a better
            platform for everyone.
          </p>

          <div className="flex justify-center mt-6 mb-10">
            <Image
              src="/community.png"
              alt="Community illustration"
              width={800}
              height={700}
              className="w-full max-w-4xl h-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto text-left">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="shrink-0 mt-1">{f.icon}</span>
                <p className="text-muted font-medium text-sm  lg:text-lg xl:text-xl">{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Join form */}
      <div className="bg-white">
        <section className="px-4 xxs:px-6 xs:px-10 md:px-16 py-6 md:py-8 lg:py-10 max-w-[900px] xl:max-w-[1000px] mx-auto">
          <h2 className="text-[20px] xs:text-[30px] font-semibold text-black mb-6 text-center">
            Complete the form to join
          </h2>
          <JoinCommunityForm />
        </section>
      </div>

      {/* Social Media */}
      <div className="bg-background my-5">
        <section className="py-8 md:py-10 lg:py-16 px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] mx-auto">
          <h2 className="text-2xl xs:text-3xl lg:text-4xl font-semibold text-black mb-10">
            Reach out through Social Media
          </h2>
          <div className="grid grid-cols-2 xs:grid-cols-4 gap-8">
            {socials.map((s) => (
              <div key={s.id} className="flex flex-col gap-2">
                <span className="text-primary text-3xl xs:text-4xl lg:text-5xl">{s.icon}</span>
                <h4 className="text-primary font-normal text-base md:text-lg lg:text-xl">
                  {s.handle}
                </h4>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}


import Image from "next/image";
import { ChevronLeft, ChevronRight,   } from "lucide-react";
import { LuMail } from "react-icons/lu";

const jobs = [
  {
    role: "Customer Success",
    team: "Support",
    location: "Remote",
    type: "Full-Time",
    email: "career@awoofhub.ng",
  },
];

export default function CareersPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#F6F7F9]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-6 py-12 lg:grid-cols-2 lg:px-20">
          <div>
            <span className="inline-block rounded-lg bg-white px-4 py-3 text-sm font-semibold tracking-wide text-[#FF4A00] shadow-sm">
              CAREERS
            </span>
            <h1 className="mt-10 text-4xl font-bold leading-tight lg:text-5xl">
              Join <span className="text-[#FF4A00]">AwoofHub</span> &amp; make a
              difference!
            </h1>
            <p className="mt-8 max-w-[780px] text-2xl leading-9 text-gray-600">
              Join the team of great minds and help build an innovative and
              sustainable space. Explore open roles and be part of something
              worth showing up for.
            </p>
            <button className="mt-10 h-12 rounded-sm bg-[#FF4A00] px-12 text-base font-semibold text-white hover:bg-[#e04200]">
              Learn More
            </button>
          </div>

          <div className="relative mx-auto h-[400px] w-full max-w-[440px]">
            <Image
              src="/careerimg.png"
              alt="Team members smiling together"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="mx-auto max-w-[1440px] px-6 py-14 lg:px-20">
        <h2 className="text-3xl font-bold">Open Job Positions</h2>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-b border-gray-700 bg-[#F6F7F9] text-sm uppercase text-gray-700">
                <th className="w-[26%] py-4 pl-14 font-normal">Role</th>
                <th className="w-[18%] py-4 font-normal">Team</th>
                <th className="w-[18%] py-4 font-normal">Location</th>
                <th className="w-[16%] py-4 font-normal">Type</th>
                <th className="py-4 font-normal">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr
                  key={j.role}
                  className="h-[110px] border-b border-gray-200 text-xl font-medium"
                >
                  <td className="pl-14">{j.role}</td>
                  <td>{j.team}</td>
                  <td>{j.location}</td>
                  <td>{j.type}</td>
                  <td>
                    Send ur resume to
                    <br />
                    <a href={`mailto:${j.email}`} className="underline">
                      {j.email}
                    </a>
                  </td>
                </tr>
              ))}
              {/* empty placeholder rows to keep table height */}
              {Array.from({ length: Math.max(0, 3 - jobs.length) }).map(
                (_, i) => (
                  <tr key={i} className="h-[89px] border-b border-gray-200">
                    <td colSpan={5} />
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex items-center justify-between text-gray-500">
          <span className="text-lg">Showing 1/1</span>
          <div className="flex items-center gap-8">
            <button aria-label="Previous page" className="text-gray-800">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button aria-label="Next page" className="text-gray-300" disabled>
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#F6F7F9]">
        <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-[120px]">
          <div className="flex items-center gap-5">
            <LuMail className="h-9 w-9  text-white" />
            <span className="text-2xl">Email Address</span>
          </div>
          <a
            href="mailto:career@awoofhub.ng"
            className="mt-6 block text-3xl font-semibold"
          >
            Career@awoofhub.ng
          </a>
        </div>
      </section>
    </div>
  );
}
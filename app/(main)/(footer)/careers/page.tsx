import Footer from "@/components/footer/Footer";
import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const jobs = [
  {
    role: "Customer Success",
    team: "Support",
    location: "Remote",
    type: "Full-Time",
    deadline: "29th May 2026",
  },
];

export default function Careers() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="bg-background my-5">
      <section className="px-6 md:px-12 py-8 md:py-12 lg:py-16 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full flex flex-col items-center md:items-start text-center md:text-start md:w-1/2 lg:w-2/3">
            <h4 className="text-primary px-4 py-2 rounded-xl mb-4 text-lg font-semibold inline-flex uppercase bg-gray-50 border border-gray-100 shadow-md">
              Careers
            </h4>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-6">
              Join <span className="text-primary">AwoofHub</span> & make a
              difference!
            </h1>
            <p className="text-muted text-base md:text-lg lg:text-2xl font-medium mb-8">
              Join the team of great minds and help build an innovative and
              sustainable space. Explore open roles and be part of something
              worth showing up for.
            </p>
            <Link
              href="/about"
              className="w-50 flex justify-center text-lg font-baloo px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-orange-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center">
            <Image
              src="/career.png"
              alt="Careers illustration"
              width={500}
              height={500}
              className="w-[300px] md:w-[400px] h-auto"
            />
          </div>
        </div>
      </section>
      </div>

      {/* Open Job Positions */}
      <section className="px-6 md:px-12 py-12 max-w-[1440px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Open Job Positions
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 bg-[#F9F9F9] border-muted">
                <th className="py-3 px-6 text-sm font-baloo font-normal text-black uppercase tracking-widest">
                  Role
                </th>
                <th className="py-3 px-6 text-sm font-baloo font-normal text-black uppercase tracking-widest">
                  Team
                </th>
                <th className="py-3 px-6 text-sm font-baloo font-normal text-black uppercase tracking-widest">
                  Location
                </th>
                <th className="py-3 px-6 text-sm font-baloo font-normal text-black uppercase tracking-widest">
                  Type
                </th>
                <th className="py-3 px-6 text-sm font-baloo font-normal text-black uppercase tracking-widest">
                  Deadline
                </th>
                <th className="py-3 px-6 text-sm font-baloo font-normal text-black uppercase tracking-widest">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 - actual job */}
              {jobs.map((job, index) => (
                <tr key={index} className="border-b border-muted/10">
                  <td className="py-6 px-6 font-semibold text-base md:text-lg text-black">{job.role}</td>
                  <td className="py-6 px-6 font-semibold text-base md:text-lg text-black">{job.team}</td>
                  <td className="py-6 px-6 font-semibold text-base md:text-lg text-black">{job.location}</td>
                  <td className="py-6 px-6 font-semibold text-base md:text-lg text-black">{job.type}</td>
                  <td className="py-6 px-6 font-semibold text-base md:text-lg text-black">{job.deadline}</td>
                  <td className="py-6 px-6">
                    <button className="px-6 font-baloo py-2 bg-primary text-base md:text-lg text-white font-semibold rounded-sm hover:bg-orange-600 transition-colors">
                      Apply
                    </button>
                  </td>
                </tr>
              ))}

              {/* Row 2 - No open position */}
              <tr className="border-b border-muted/10">
                <td colSpan={6} className="py-6 px-6 text-center text-black font-semibold text-base md:text-lg">
                  No open position
                </td>
              </tr>

              {/* Row 3 - empty */}
              <tr className="border-b border-muted/10">
                <td colSpan={6} className="py-6 px-6">
                  &nbsp;
                </td>
              </tr>

              {/* Row 4 - empty */}
              <tr className="border-b border-muted/10">
                <td colSpan={6} className="py-6 px-6">
                  &nbsp;
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 px-2">
          <h3 className="text-base md:text-lg text-muted font-medium">
            Showing {jobs.length}/{jobs.length}
          </h3>
          <div className="flex gap-6">
            <button
              className="p-2 text-2xl font-semibold text-[#202224] hover:text-gray-600 transition-colors disabled:opacity-30"
              disabled
            >
              ‹
            </button>
            <button
              className="p-2 text-2xl font-semibold text-[#202224] hover:text-gray-600 transition-colors disabled:opacity-30"
              disabled
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <div className="bg-background my-5">
        <section className="py-12 px-6 md:px-12 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row gap-12 justify-between">
            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-1 items-center ">
                <FaLocationDot className="w-6 h-6" />
                <h5 className="text-xl">Location</h5>
              </div>
              <h5 className="font-semibold text-xl text-gray-900">
                Lagos, Nigeria
              </h5>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-1 items-center ">
                <IoCall className=" w-6 h-6" />
                <h5 className="text-xl">Call</h5>
              </div>
              <h5 className="font-semibold text-xl text-gray-900">
                +234 800 333 3330
              </h5>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-1 items-center ">
                <MdEmail className=" w-8 h-8 " />
                <h5 className="text-xl">Email Address</h5>
              </div>
              <h5 className="font-semibold text-xl text-gray-900">
                supports@awoofhub.com
              </h5>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

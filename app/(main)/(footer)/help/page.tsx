"use client";
import Footer from "@/components/footer/Footer";
import HelpAndSupportForm from "@/components/help-and-support/HelpAndSupportForm";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";


export default function HelpPage() {

  return (
    <main className="bg-background">
      <section className="text-center my-8">
        <div className="mb-8 px-4 md:px-6 lg:px-8 xl:px-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-2">
            Let’s get you sorted
          </h1>
          <p className="text-muted text-base xs:text-lg lg:text-xl font-medium max-w-4xl mx-auto">
           Whatever you need help with, tell us a little more using the form below and we’ll take it from there.
          </p>
        </div>

        <div className="px-4   max-w-4xl w-full mx-auto">
          <HelpAndSupportForm />
        </div>

        <div className="px-4 md:px-6 lg:px-8 xl:px-12 mt-20">
          <div className="my-5 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-8 justify-between">
            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-1 items-center ">
                <FaLocationDot className="w-6 h-6 xs:w-10 xs:h-10" />
                <h5 className="text-xl xs:text-2xl">Location</h5>
              </div>
              <h5 className="font-semibold text-2xl text-gray-900">
                Lagos, Nigeria
              </h5>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-1 items-center ">
                <IoCall className="w-6 h-6 xs:w-10 xs:h-10" />
                <h5 className="text-xl xs:text-2xl">Call</h5>
              </div>
              <h5 className="font-semibold text-2xl text-gray-900">
                +234 800 333 3330
              </h5>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-1 items-center ">
                <MdEmail className="w-6 h-6 xs:w-10 xs:h-10" />
                <h5 className="text-xl xs:text-2xl">Email Address</h5>
              </div>
              <h5 className="font-semibold text-2xl text-gray-900">
                supports@awoofhub.com
              </h5>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main >
  );
}
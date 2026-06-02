"use client";

import Footer from "@/components/footer/Footer";

export default function DeveloperDocumentation() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <div className="bg-background my-5">
        <section className="px-6 md:px-12 py-8 md:py-10 lg:py-16 max-w-[1440px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-black mb-4 md:mb-6">
            Developer <span className="text-primary">Documentation</span>
          </h1>
          <p className="text-muted text-base md:text-lg lg:text-xl font-medium mb-4 md:mb-6">
            This documentation covers the technical specifications and
            implementation guidelines for the AwoofHub platform, a curated deals
            discovery and ad marketplace built for students, young
            professionals, and budget-conscious consumers in Nigeria.
          </p>
          <p className="text-muted text-base md:text-lg lg:text-xl font-medium mb-4 md:mb-6">
            For questions, API access requests, or integration support, fill the
            form below to contact the AwoofHub development team and get into the
            official developer portal.
          </p>
          <p className="font-semibold text-black text-base md:text-lg lg:text-xl">
            © 2026 AwoofHub. All rights reserved. Unauthorised reproduction or
            distribution of this documentation is prohibited.
          </p>
        </section>
      </div>

      {/* Access Request Form */}
      <div className="bg-background my-5">
        <section className="px-6 md:px-12 py-8 md:py-10 lg:py-16 max-w-[1440px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-black mb-8">
            Access Request form
          </h2>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block font-baloo text-base md:text-lg font-medium text-black mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="your first and last name"
                className="w-full p-4 border border-[#D9D9D9] rounded-md text-xs md:text-sm font-montserrat outline-none focus:border-primary transition-colors placeholder:text-muted/50"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block font-baloo text-base md:text-lg font-medium text-black mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full p-4 border border-[#D9D9D9] rounded-md text-xs md:text-sm font-montserrat outline-none focus:border-primary transition-colors placeholder:text-muted/50"
              />
            </div>

            {/* Request Access Button */}
            <button className="w-full py-3 font-baloo bg-primary text-white font-semibold text-base rounded-md hover:bg-orange-600 transition-colors">
              Request Access
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

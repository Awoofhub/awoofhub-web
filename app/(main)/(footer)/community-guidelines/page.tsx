"use client";

import Footer from "@/components/footer/Footer";

const page = () => {
  return (
    <main className="bg-white">
      {/* Header */}
      <div className="bg-background my-5">
        <section className="px-4 md:px-6 lg:px-8 xl:px-12 py-6 md:py-8 lg:py-12 mx-auto">
          <div className="flex justify-center md:justify-start">
            <h2 className="text-primary px-4 py-2 text-sm xs:text-base rounded-xl mb-8 font-semibold inline-flex uppercase bg-gray-50 border  backdrop-blur-3xl border-gray-100 shadow-md">
              GUIDELINES
            </h2>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-black mb-4">
            Community <span className="text-primary">Guidelines</span>
          </h1>
          <p className="text-muted font-medium text-base md:text-lg lg:text-xl mb-4">
            Last Updated: May 7, 2026
          </p>
        </section>
      </div>

      {/* Sections */}
      <div className="space-y-8 bg-background my-5">
        <section className="px-4 md:px-6 lg:px-8 xl:px-12 pt-8 pb-16 mx-auto">
          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black">
              Why These Exist
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              AwoofHub only works if Awoofers can trust what they see. These
              guidelines explain what makes a deal postable, what gets rejected,
              and how we handle people who don't play fair — so every decision
              our team makes has a clear reason behind it
            </p>
             <p className=" mt-6 text-lg md:text-xl lg:text-2xl font-semibold text-black">
              What Makes a Good Deal
            </p>
            
            <p className="text-black text-sm md:text-base lg:text-lg font-semibold ">
              Every deal must be:
            </p>
            <ul className="list-disc list-outside pl-6 text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>Real — currently active and available, not expired or upcoming</li>
              <li>Accurate — the price, terms, and expiry date match what the deal actually offers.</li>
              <li>Verifiable — we can confirm it's legitimate (a real business, a real offer, a working link/location).</li>
              <li>In the right category — one of our categories, correctly tagged.</li>
              <li>Yours to post — you're the business, or you have a genuine reason to share it (not scraped from another platform without permission).</li>
              
            </ul>
            <p className="text-black text-sm md:text-base lg:text-lg font-semibold mb-1">
              What Gets a Deal Rejected or Removed
            </p>

            <ul className="list-disc list-outside pl-6 text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>Expired, fake, or unverifiable offers.</li>
              <li>Misleading pricing (fake "before" prices, hidden conditions not disclosed upfront).</li>
              <li>Duplicate posts of the same deal.</li>
              <li>Deals that exist mainly to collect personal data (phone numbers, emails) rather than offer real value.</li>
              <li>Affiliate links or spam disguised as a deal.</li>
              <li>Anything illegal, or promoting counterfeit goods, restricted items, or scams.</li>
              <li>Deals are removed after publishing if we later find they don't hold up — being live once doesn't mean it stays live.</li>
              
            </ul>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium ">
              If your deal is rejected, you'll get a reason. Fix the issue and repost — this isn't a one-strike system for honest mistakes.
            </p>
           <p className=" mt-6 text-lg md:text-xl lg:text-2xl font-semibold text-black">
              Community Behaviour
            </p>
            <ul className="list-disc list-outside pl-6 text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>No harassment, hate speech, or targeted abuse in comments or the WhatsApp community.</li>
              <li>No impersonating other users or businesses.</li>
              <li>No spamming comments, reviews, or the report system.</li>
              <li>Disagreements happen — keep it respectful. This is a community, not a comment-war.</li>
            </ul>
            
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              Reporting Deals or Users
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium ">
             If a deal looks fake, expired, or a user is misbehaving, report it directly on the deal or through Contact Us. Reports are reviewed by our team — false or bad-faith reporting is itself a violation.
            </p>
            
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
             Consequences
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              We handle violations in stages, not instant bans, unless it's serious (fraud, scams, illegal content):
            </p>
            <ul className="list-decimal list-outside pl-6 text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>Warning — first-time or minor issues, with an explanation.</li>
              <li>Suspension — repeated violations or one serious violation. Temporary loss of posting or commenting privileges.</li>
              <li>Permanent ban — continued violations after suspension, or severe cases like fraud or scam deals.</li>
            </ul>
             <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
             You'll always be notified of the action taken and why.
            </p>
          </div>
          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              One Last Thing
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
             These guidelines will evolve as AwoofHub grows and we see what actually happens in the community. If something feels unclear or unfair, tell us — Feature Request and Contact Us both reach the team.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default page;

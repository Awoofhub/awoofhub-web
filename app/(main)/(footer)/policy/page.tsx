import Footer from "@/components/footer/Footer";

export default function PolicyPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <div className="bg-background my-5">
        <section className="px-6 md:px-12 py-16 mx-auto">
          <h2 className="text-primary px-4 py-2 rounded-xl mb-8 font-semibold inline-flex uppercase bg-gray-50 border border-gray-100 shadow-md">
            PRIVACY POLICY
          </h2>
          <h1 className="text-3xl md:text-4xl font-semibold text-black mb-4">
            Our Privacy Policy
          </h1>
          <p className="text-muted font-medium text-base md:text-lg lg:text-xl mb-4">
            Last Updated: May 7, 2026
          </p>
          <p className="text-muted font-medium text-base md:text-lg lg:text-xl mb-4">
            This Privacy Policy explains how [Your Company Name] (“Company,”
            “we,” “our,” or “us”) collects, uses, stores, protects, and shares
            your information when you access or use our website, mobile
            application, products, and services (collectively, the “Platform”)..
          </p>
          <p className="text-muted font-medium text-base md:text-lg lg:text-xl mb-4">
            By using the Platform, you agree to the practices described in this
            Privacy Policy.
          </p>
        </section>
      </div>

      {/* Sections */}
      <div className="space-y-8 bg-background my-5">
        <section className="px-6 md:px-12 pt-8 pb-16 mx-auto">
          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black">
              1. Information We Collect
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              We may collect different categories of information depending on
              how you interact with the Platform.
            </p>

            <p className="text-muted text-sm md:text-base lg:text-lg font-semibold mb-1">
              A. Personal Information
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              Information you voluntarily provide may include:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Username and password</li>
              <li>Billing and payment information</li>
              <li>Shipping address</li>
              <li>Profile photo</li>
              <li>Business information</li>
              <li>Customer support inquiries</li>
            </ul>
            <p className="text-muted text-sm md:text-base lg:text-lg font-semibold mb-1">
              B. Automatically Collected Information
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              When you use the Platform, we may automatically collect:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>App version</li>
              <li>Usage activity</li>
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>Clickstream data</li>
              <li>Device identifiers</li>
              <li>Location data (if enabled)</li>
            </ul>
            <p className="text-muted text-sm md:text-base lg:text-lg font-semibold mb-1">
              C. Cookies and Tracking Technologies
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              We may use:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>Cookies</li>
              <li>Pixels</li>
              <li>Analytics tools</li>
              <li>Web beacons</li>
              <li>SDKs</li>
              <li>Local storage technologies</li>
            </ul>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              to improve user experience, analyze usage, and support marketing
              activities. You can manage cookie settings through your browser.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              2. How We Use Your Information
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              We may use collected information to:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>Provide and maintain the Platform</li>
              <li>Process transactions and payments</li>
              <li>Create and manage user accounts</li>
              <li>Improve products and services</li>
              <li>Personalize user experiences</li>
              <li>Send updates and notifications</li>
              <li>Provide customer support</li>
              <li>Detect fraud or unauthorized activity</li>
              <li>Analyze trends and performance</li>
              <li>Conduct research and analytics</li>
              <li>Comply with legal obligations</li>
              <li>Market products or promotions (where permitted)</li>
            </ul>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              3. Legal Basis for Processing (Where Applicable)
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              Depending on your jurisdiction, we may process information based
              on:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>Your consent</li>
              <li>Contractual necessity</li>
              <li>Legal obligations</li>
              <li>Legitimate business interests</li>
              <li>Protection of vital interests</li>
            </ul>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              4. Sharing of Information
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              We do not sell your personal information.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              However, we may share information with:
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              {" "}
              A. Service Providers
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              Third-party vendors that assist with:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>Payment processing</li>
              <li>Hosting services</li>
              <li>Analytics</li>
              <li>Customer support</li>
              <li>Marketing</li>
              <li>Cloud storage</li>
              <li>Security services</li>
            </ul>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              These providers are only permitted to use data as necessary to
              perform services for us.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              5. Payments and Subscriptions
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              If the Platform offers paid services, subscriptions, or products:
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              6. Refund Policy
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              Refund eligibility depends on the specific product or service
              purchased. Unless otherwise stated:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>
                Digital products and subscriptions are non-refundable after
                access or delivery.
              </li>
              <li>Refund requests may be reviewed on a case-by-case basis.</li>
              <li>
                Abuse of refund requests may result in account suspension.
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              7. Third-Party Services and Links
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              The Platform may contain links or integrations to third-party
              websites, services, or tools.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              We do not control or endorse third-party platforms and are not
              responsible for:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>ATheir content</li>
              <li>Policies</li>
              <li>Security</li>
              <li>Practices</li>
              <li>Availability</li>
            </ul>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              Use third-party services at your own risk.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              8. Privacy
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              Your use of the Platform is also governed by our Privacy Policy, which explains how we collect, use, store, and protect your data.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              By using the Platform, you consent to our data practices as described in the Privacy Policy.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              9. Data Security
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              We implement reasonable security measures to protect user
              information. However, no digital platform is completely secure.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              You acknowledge that:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium">
              <li>Internet transmissions may not always be secure.</li>
              <li>We cannot guarantee absolute security of your data.</li>
              <li>You use the Platform at your own risk.</li>
            </ul>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              10. Termination
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium ">
              We reserve the right to suspend, restrict, or terminate your
              access to the Platform without prior notice if:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>You violate these Terms.</li>
              <li>We suspect fraudulent or illegal activity.</li>
              <li>Your actions may harm the Platform or other users.</li>
            </ul>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              You may stop using the Platform at any time.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              Upon termination:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium">
              <li>Your rights under these Terms immediately end.</li>
              <li>
                Certain provisions may survive termination, including
                intellectual property, liability limitations, and dispute
                provisions.
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              11. Disclaimer of Warranties
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              The Platform is provided on an "AS IS" and "AS AVAILABLE" basis.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              To the fullest extent permitted by law, we disclaim all warranties
              including:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>Merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy</li>
              <li>Reliability</li>
              <li>Availability</li>
            </ul>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              We do not guarantee that:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium">
              <li>The Platform will always be uninterrupted or error-free.</li>
              <li>Defects will be corrected.</li>
              <li>
                The Platform will be free from viruses or harmful components.
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              12. Limitation of Liability
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              To the maximum extent permitted by law, the Company shall not be
              liable for:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>Indirect damages</li>
              <li>Incidental damages</li>
              <li>Special damages</li>
              <li>Consequential damages</li>
              <li>Loss of profits</li>
              <li>Data loss</li>
              <li>Business interruption</li>
            </ul>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              arising from your use of the Platform.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              Our total liability shall not exceed the amount paid by you to us
              within the preceding 12 months.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              13. Indemnification
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              You agree to defend, indemnify, and hold harmless the Company, its
              affiliates, employees, directors, and partners from claims,
              damages, liabilities, and expenses arising from:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium">
              <li>Your use of the Platform</li>
              <li>Your violation of these Terms</li>
              <li>Your infringement of third-party rights</li>
            </ul>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              14. Governing Law
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              These Terms shall be governed by and interpreted under the laws of
              [Your Country/State], without regard to conflict of law
              principles.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              Any disputes arising under these Terms shall be resolved in the
              courts located in [Your Jurisdiction].
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              15. Dispute Resolution
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Before filing legal claims, parties agree to attempt informal
              resolution by contacting the Company first.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              If disputes cannot be resolved informally, they may be resolved
              through:
            </p>
            <ul className="list-disc list-inside ttext-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>Arbitration</li>
              <li>Mediation</li>
              <li>Competent courts</li>
            </ul>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              depending on applicable law and jurisdiction.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              16. Changes to the Platform
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              We reserve the right to:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>Modify</li>
              <li>Suspend</li>
              <li>Discontinue</li>
              <li>Update</li>
            </ul>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              any part of the Platform at any time without liability.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              Features may change or become unavailable without prior notice.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              17. Force Majeure
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              We shall not be liable for delays or failure caused by events
              beyond reasonable control including:
            </p>
            <ul className="list-disc list-inside text-muted text-sm md:text-base lg:text-lg font-medium">
              <li>Natural disasters</li>
              <li>Internet outages</li>
              <li>Government actions</li>
              <li>Cyberattacks</li>
              <li>Labor disputes</li>
              <li>Power failures</li>
            </ul>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              18. Severability
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              If any provision of these Terms is found unenforceable, the
              remaining provisions shall remain in full force and effect.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              19. Entire Agreement
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              These Terms constitute the entire agreement between you and the
              Company regarding use of the Platform and supersede prior
              agreements or understandings.
            </p>
          </div>     
        </section>
      </div>
      <Footer />
    </main>
  );
}

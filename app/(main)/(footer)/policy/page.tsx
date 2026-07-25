import Footer from "@/components/footer/Footer";

export default function PolicyPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <div className="bg-background my-5">
        <section className="px-4 md:px-6 lg:px-8 xl:px-12 py-6 md:py-8 lg:py-12 mx-auto">
          <div className="flex justify-center md:justify-start">
            <h2 className="text-primary px-4 py-2 text-sm xs:text-base rounded-xl mb-8 font-semibold inline-flex uppercase bg-gray-50 border  backdrop-blur-3xl border-gray-100 shadow-md">
              PRIVACY POLICY
            </h2>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-black mb-4">
            Our Privacy Policy
          </h1>
          <p className="text-muted font-medium text-base md:text-lg lg:text-xl mb-4">
            Effective Date: July 21, 2026
          </p>
          <p className="text-muted font-medium text-base md:text-lg lg:text-xl mb-4">
            Last Updated: July 21, 2026
          </p>
        </section>
      </div>

      {/* Sections */}
      <div className="space-y-8 bg-background my-5">
        <section className="px-4 md:px-6 lg:px-8 xl:px-12 pt-8 pb-16 mx-auto">
          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black">
              1. Introduction
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              AwoofHub ("AwoofHub," "we," "us," or "our") operates the AwoofHub
              website, mobile application, and related services (collectively,
              the "Platform"), which allow users to discover, post, and claim
              deals, discounts, and promotional offers. This Privacy Policy
              explains what personal data we collect, why we collect it, how we
              use and protect it, and what rights you have over it. This Policy
              applies to all users of the Platform, including individuals
              browsing or claiming deals ("Awoofers"), individuals or businesses
              posting deals ("Merchants" or "Businesses"), and visitors to our
              website. We process personal data in accordance with the Nigeria
              Data Protection Act, 2023 (NDPA) and applicable regulations issued
              by the Nigeria Data Protection Commission (NDPC). Where we process
              data of users located outside Nigeria, we comply with applicable
              local data protection laws as well. By using the Platform, you
              agree to the collection and use of information in accordance with
              this Policy. If you do not agree, please do not use the Platform.
            </p>
          </div>
          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-6">
              2. Who We Are
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              AwoofHub is a Nigerian deal discovery platform, operating as a
              duly registered business under Nigerian law. Our registered
              offices are located in Lagos, Nigeria. For the purposes of the
              NDPA, AwoofHub acts as the Data Controller for personal data
              collected through the Platform.
            </p>
            <p className="text-black text-sm md:text-base lg:text-lg font-medium mb-1">
              Data Protection contact: Email: privacy@awoofhub.ng
            </p>
          </div>
          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-6">
              3. Information We Collect
            </p>

            <p className="text-black text-sm md:text-base lg:text-lg font-semibold mb-1">
              3.1 Information you provide directly
            </p>

            <ul className="list-disc list-outside pl-6 text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>
                Account information: Full name, phone number, email address,
                password, profile photo (optional), and username.
              </li>
              <li>
                Deal-posting information: Deal title, description, category,
                images, business name (if applicable), location, expiry date,
                and any documentation submitted to verify a deal.
              </li>
              <li>
                Business/Merchant information: Business name, contact person,
                business address, and business category.
              </li>
              <li>
                Communications: Messages you send through our Contact Us or
                support forms, feedback submitted through Feature Request, and
                any correspondence with our support team.
              </li>
              <li>
                Community participation: Content you post, such as comments,
                reactions, or reports on deals.
              </li>
            </ul>
            <p
              className="text-black
             text-sm md:text-base lg:text-lg font-semibold mb-1"
            >
              3.2 Information collected automatically
            </p>

            <ul className="list-disc list-outside pl-6 text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>
                Device and usage data: IP address, device type, operating
                system, browser type, app version, pages viewed, features used,
                and timestamps of activity.
              </li>
              <li>
                Location data: Approximate or precise location (with your
                permission), used to show deals relevant to your area.
              </li>
              <li>Cookies and similar technologies: See Section 9 below.</li>
            </ul>
            <p className="text-black text-sm md:text-base lg:text-lg font-semibold mb-1">
              3.3 Information from third parties
            </p>

            <ul className="list-disc list-outside pl-6 text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>
                If you join AwoofHub's WhatsApp community, information you share
                within that community is subject to WhatsApp's own privacy
                policy, not this one.
              </li>
              <li>
                If you sign up or log in using a third-party service (e.g.
                Google), we may receive basic profile information from that
                provider, as permitted by your settings with them.
              </li>
            </ul>
            <p className="text-black text-sm md:text-base lg:text-lg font-semibold mb-1">
              3.4 Sensitive data
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              We do not knowingly collect sensitive personal data such as health
              information, biometric data, religious beliefs, or political
              opinions, unless voluntarily provided by you and clearly necessary
              for a specific feature, in which case we will seek your explicit
              consent first.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              4. How We Use Your Information
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              We use personal data to:
            </p>
            <ul className="list-decimal list-inside text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>Create and manage your account.</li>
              <li>
                Display relevant deals based on your location and category
                preferences.
              </li>
              <li>Allow you to post, review, and claim deals.</li>
              <li>
                Verify the authenticity of deals and businesses before
                publishing them.
              </li>
              <li>
                Operate community features, including comments and the WhatsApp
                community.
              </li>
              <li>
                Respond to support requests, feature suggestions, and
                complaints.
              </li>
              <li>
                Send transactional notifications (e.g. deal approved, deal
                rejected, deal expiring, wishlist alerts).
              </li>
              <li>
                Send optional marketing or community communications, where
                you've consented.
              </li>
              <li>
                Detect, investigate, and prevent fraud, fake deals, spam, or
                abuse of the Platform.
              </li>
              <li>
                Analyse usage trends to improve the Platform's features and
                performance.
              </li>
              <li>
                Comply with legal obligations and enforce our Terms of Service
                and Community Guidelines.
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              5. Legal Basis for Processing
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              We rely on the following legal bases under the NDPA:
            </p>
            <ul className="list-disc list-outside pl-6 text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>
                Consent — for optional features such as marketing communications
                and precise location access.
              </li>
              <li>
                Performance of a contract — to provide the core Platform
                services you sign up for.
              </li>
              <li>
                Legitimate interests — to keep the Platform safe, prevent fraud,
                and improve our services, provided this doesn't override your
                rights.
              </li>
              <li>
                Legal obligation — where we're required to disclose or retain
                data by law or a competent authority.
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              6. How We Share Your Information
            </p>
            <p className="text-muted italic text-sm md:text-base lg:text-lg font-medium">
              We do not sell personal data. We may share information in these
              circumstances
            </p>
            <ul className="list-disc pl-6 list-outside text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>
                With businesses/merchants: If you claim a deal, limited
                information (such as your name or claim status) may be shared
                with the business offering that deal, solely to fulfil the deal.
              </li>
              <li>
                With service providers: Third parties who help us operate the
                Platform, such as cloud hosting providers, analytics tools, and
                email service providers, under confidentiality obligations.
              </li>
              <li>
                With WhatsApp: If you join our WhatsApp community, your phone
                number becomes visible within that community per WhatsApp's own
                functionality and policy.
              </li>
              <li>
                For legal reasons: If required by law, court order, or a valid
                request from a Nigerian regulatory or law enforcement authority.
              </li>
              <li>
                Business transfers: If AwoofHub is involved in a merger,
                acquisition, or sale of assets, personal data may transfer as
                part of that transaction, subject to this Policy or a successor
                policy.
              </li>
              <li>
                With your consent: For any other purpose we disclose to you at
                the time of collection.
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              7. Data Retention
            </p>
            <ul className="list-disc pl-6 list-outside text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>
                Account data: retained while your account is active, and for 12
                months after deletion, to handle disputes and fraud prevention.
              </li>
              <li>
                Deal and transaction records: retained for 24 months to resolve
                disputes and maintain platform integrity.
              </li>
              <li> Support communications: retained for 12 months.</li>
            </ul>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              8. Your Rights
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              Under the NDPA, you have the right to:
            </p>
            <ul className="list-disc list-outside pl-6 text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>Access the personal data we hold about you.</li>
              <li>Correct inaccurate or incomplete data.</li>
              <li>
                Request deletion of your data, subject to legal exceptions.
              </li>
              <li>
                Restrict or object to certain processing, including marketing
                communications.
              </li>
              <li>
                Data portability — request your data in a structured, commonly
                used format.
              </li>
              <li>
                Withdraw consent at any time, where processing is based on
                consent.
              </li>
              <li>
                Lodge a complaint with the Nigeria Data Protection Commission
                (NDPC) if you believe your data has been mishandled.
              </li>
            </ul>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              To exercise any of these rights, contact us at
              privacy@awoofhub.ng. We will respond within the timeframe required
              under the NDPA.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              9. Cookies and Tracking Technologies
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              We use cookies and similar technologies to keep you logged in,
              remember your preferences (location, category filters), and
              understand how the Platform is used so we can improve it. You can
              control cookies through your browser or device settings. Disabling
              certain cookies may affect Platform functionality.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              10. Data Security
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              We implement reasonable technical and organisational measures to
              protect personal data, including encrypted data transmission,
              access controls limiting who on our team can view user data,
              password hashing, and confidentiality obligations for staff and
              contractors. No method of transmission or storage is 100% secure,
              and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              11. Children's Privacy
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              The Platform is intended for users aged 18 and above. We do not knowingly collect personal data from individuals under 18. If we become aware that we have done so, we will take steps to delete that data.
            </p>
            
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
             12. International Data Transfers
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium ">
             We may use cloud hosting and infrastructure providers that store data on servers located outside Nigeria. Where this happens, we take reasonable steps to ensure such transfers meet NDPA requirements for adequate safeguards.
            </p>
           
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
             13. Third-Party Links
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              The Platform may contain links to third-party websites or services, including WhatsApp. We are not responsible for the privacy practices of these third parties and encourage you to review their policies separately.
            </p>
            
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              14. Data Breach Notification
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
              In the event of a data breach that poses a risk to your rights and freedoms, we will notify the NDPC and affected users in line with NDPA timelines and requirements.
            </p>
           
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              15. Changes to This Policy
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium">
            We may update this Privacy Policy from time to time. We'll notify users of material changes via the Platform or by email, and update the "Last Updated" date above. Continued use of the Platform after changes take effect means you accept the updated Policy.
            </p>
            
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              16. Contact Us
            </p>
            <p className="text-black text-sm md:text-base lg:text-lg font-medium mb-1">
              Email: privacy@awoofhub.ng
            </p>
            
          </div>

        </section>
      </div>
      <Footer />
    </main>
  );
}

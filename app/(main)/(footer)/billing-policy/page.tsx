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
              BILLING POLICY
            </h2>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-black mb-4">
            Billing, Subscriptions and{" "}
            <span className="text-primary">Refund Policy</span>
          </h1>
          <p className="text-muted font-medium text-base md:text-lg lg:text-xl mb-4">
            Last Updated: October 2026
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
              This Billing, Subscriptions and Refund Policy explains how
              AwoofHub handles subscription plans, premium features, payments,
              automatic renewals, cancellations, refund requests, payment errors
              and related billing support enquiries.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              This Policy applies to payments made to AwoofHub for subscriptions
              and other paid Platform features.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              We aim to handle billing matters fairly and transparently, in
              accordance with our Terms of Service, the terms disclosed when a
              service is purchased and applicable Nigerian law.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Please read this Policy together with our Terms of Service before
              purchasing a paid service.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              2. Subscription Plans and Premium Features
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              AwoofHub may offer free and paid subscription plans that provide
              access to additional Platform features or functionality.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Depending on the services available, paid features may include
              premium subscriptions, enhanced visibility, promoted offers,
              advertising placements and other commercial features.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              The applicable subscription plans, features, prices, billing
              periods and other material conditions will be displayed on the
              Platform or during the relevant purchase process.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Features included in a subscription may differ between plans. We
              encourage you to review the plan description before completing
              your purchase.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Unless expressly stated otherwise, subscription fees are payments
              for access to the features of the selected plan during the
              applicable subscription period. They are not deposits, cashback
              balances or funds held on behalf of users or third-party
              businesses.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              3. Subscription Payments and Activation
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              You must pay the applicable fee using a payment method made
              available by AwoofHub for the relevant service.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              A subscription ordinarily becomes active after successful
              confirmation of payment, unless otherwise stated during the
              purchase process.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Payment confirmation and subscription activation may occasionally
              be delayed because of payment-provider processing, technical
              issues or other circumstances beyond our immediate control.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              If your payment is successful but the relevant subscription or
              paid feature is not activated, please contact us using the details
              in Section 12.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              4. Billing Periods and Automatic Renewal
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              All AwoofHub paid subscriptions automatically renew by default at
              the end of each billing period unless the subscriber cancels
              before the next renewal charge is processed.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              By subscribing, you authorise AwoofHub to charge the applicable
              subscription fee automatically at the beginning of each renewal
              period using the payment method authorised for your subscription.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Before completing a subscription, you will be informed of the
              applicable price, billing interval, automatic-renewal arrangement
              and cancellation procedure.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              5. Cancelling a Subscription
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              You may cancel your subscription using the cancellation method
              provided by AwoofHub or, where applicable, through the third-party
              platform used to purchase the subscription.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              To prevent the next renewal charge, you should cancel before the
              next billing date and allow reasonable time for the cancellation
              to be processed. Any specific cancellation deadline will be
              disclosed where applicable.
            </p>
            <p className="text-black text-sm md:text-base lg:text-lg font-semibold">
              Once cancellation has been successfully processed:
            </p>
            <ul className="list-disc list-outside pl-6 text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>Future subscription renewals will stop.</li>
              <li>
                You may ordinarily continue to access your premium features
                until the end of your current paid subscription period.
              </li>
              <li>
                Your subscription does not ordinarily end immediately merely
                because you have cancelled.
              </li>
              <li>
                Your subscription will expire at the end of the paid period and
                will not renew, provided cancellation was completed in time to
                prevent the next charge.
              </li>
            </ul>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Please retain any cancellation confirmation you receive.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              If you are charged after successfully cancelling before the
              applicable renewal deadline, please contact us so that we can
              investigate.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              6. Refund Requests and Eligibility
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Refund requests are assessed individually, taking into account the
              circumstances of the transaction, the service purchased, the
              applicable purchase terms and legal requirements.
            </p>
            <p className="text-black text-sm md:text-base lg:text-lg font-semibold">
              You may contact us to request a refund or billing review if:
            </p>
            <ul className="list-disc list-outside pl-6 text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>You believe you were charged incorrectly.</li>
              <li>You were charged more than once for the same transaction.</li>
              <li>
                A payment was taken but the applicable subscription or paid
                feature was not activated.
              </li>
              <li>
                You were charged after successfully cancelling before the
                applicable renewal deadline.
              </li>
              <li>You believe a payment was made without your authorisation.</li>
              <li>
                You experienced another billing error or circumstance that may
                entitle you to a refund under applicable law or the terms of
                your purchase.
              </li>
            </ul>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Submitting a refund request does not automatically guarantee that
              a refund will be approved.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              However, nothing in this Policy excludes or restricts any refund,
              cancellation or other remedy that you are legally entitled to
              receive.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              7. Subscription Periods Already Started
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Unless required by applicable law or expressly stated in the terms
              applicable to the relevant offer, cancelling a subscription does
              not automatically entitle you to a refund for a subscription
              period that has already begun.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Cancellation ordinarily prevents future renewal charges while
              allowing you to retain access until the current paid subscription
              period expires.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Any approved refund will be handled in accordance with the
              applicable purchase terms, payment arrangements and legal
              requirements.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              8. Failed Payments, Duplicate Charges and Billing Errors
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Payments may occasionally fail, remain pending, be processed more
              than once or be debited without the corresponding service being
              activated.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              If you experience a payment problem, please contact us and provide
              the transaction details reasonably necessary for us to
              investigate.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Where a payment has been duplicated, incorrectly processed or
              taken without the corresponding paid service being provided, we
              will review the circumstances and determine the appropriate remedy
              in accordance with applicable law and the relevant purchase terms.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              A pending transaction or temporary debit may also be subject to
              the processing and reversal procedures of your bank or payment
              provider.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Where necessary, you may be asked to contact your bank or payment
              provider to confirm the status of a transaction or obtain further
              assistance.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              9. Third-Party Purchases and Seller Transactions
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              AwoofHub may display offers, promotions or listings relating to
              products or services supplied by third-party businesses.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              If you purchase a product or service directly from a third-party
              seller, that seller is ordinarily responsible for the transaction,
              including delivery, product quality, returns and refunds, subject
              to applicable law and any terms governing the transaction.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              AwoofHub subscription fees and other payments made directly to
              AwoofHub are separate from payments made to third-party sellers.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              If your concern relates to a misleading offer, inaccurate listing
              or other issue involving content published on AwoofHub, you may
              report it to us at info@awoofhub.ng.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Nothing in this section excludes any responsibility or legal
              obligation that applies to AwoofHub under applicable law.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              10. Unauthorised Payments
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              If you believe that a payment was made without your
              authorisation, contact us promptly at info@awoofhub.ng.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              You should also contact your bank or payment provider where
              appropriate to report the transaction and follow its security
              procedures.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              We may investigate the transaction and take reasonable steps to
              protect the relevant account or prevent further unauthorised
              activity.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Do not send your password, payment PIN, full card number or other
              sensitive payment credentials when contacting us.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              11. Refund Processing and Resolution
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              We will review the information provided with your request and may
              ask for additional details where reasonably necessary.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              If a refund is approved, we will arrange for it to be processed
              through the applicable payment method or payment provider where
              possible.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              The time required for the refunded funds to appear in your account
              may depend on the payment provider, bank or financial institution
              involved.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              If we cannot approve your request, we may explain the reason where
              appropriate.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              If you disagree with the outcome, you may contact us with
              additional relevant information or pursue any remedy available to
              you under applicable law.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Nothing in this Policy prevents you from exercising a legal right
              or seeking assistance from a relevant consumer-protection
              authority or other competent body.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              12. How to Request Billing Support or a Refund
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              To request a refund, report a billing issue or obtain assistance
              with a subscription, email:
            </p>
            <p className="text-black text-sm md:text-base lg:text-lg font-medium mb-1">
              Email: info@awoofhub.ng
            </p>
            <p className="text-black text-sm md:text-base lg:text-lg font-semibold">
              Please include the following information where available:
            </p>
            <ul className="list-disc list-outside pl-6 text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              <li>The email address associated with your AwoofHub account.</li>
              <li>The date of the transaction.</li>
              <li>The amount charged and currency.</li>
              <li>Your payment or transaction reference.</li>
              <li>The subscription plan or paid service involved.</li>
              <li>A brief explanation of the issue.</li>
              <li>Relevant receipts, screenshots or cancellation confirmations.</li>
            </ul>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Please do not include your password, payment PIN, full card number
              or other sensitive payment credentials.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              We will review your enquiry and respond as reasonably practicable.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              13. Changes to This Policy
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              We may update this Policy to reflect changes to our payment
              systems, subscription plans, services or legal obligations.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              The updated version will be published on the Platform with a
              revised “Last Updated” date.
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              Where an update materially affects an existing paid arrangement,
              we will provide any notice or other rights required by applicable
              law or the relevant purchase terms.
            </p>
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mt-4">
              14. Contact Information
            </p>
            <p className="text-black text-sm md:text-base lg:text-lg font-medium mb-1">
              AwoofHub Technology Limited
            </p>
            <p className="text-black text-sm md:text-base lg:text-lg font-medium mb-1">
              Website: AwoofHub.ng
            </p>
            <p className="text-black text-sm md:text-base lg:text-lg font-medium mb-1">
              Email: info@awoofhub.ng
            </p>
            <p className="text-muted text-sm md:text-base lg:text-lg font-medium mb-1">
              For further information about the general rules governing your use
              of AwoofHub, please read our Terms of Service.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default page;
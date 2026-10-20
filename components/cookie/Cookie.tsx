'use client';

import CookieConsent from "react-cookie-consent";

export function Cookie() {
    return (
        <CookieConsent
            location="bottom"
            buttonText="Accept"
            cookieName="myAwesomeCookieName2"
            expires={30}
            disableStyles={true}
            containerClasses="fixed bottom-0 left-2 right-2 z-50 flex flex-col sm:flex-row items-center justify-between bg-[#102224] px-6 py-5 shadow-2xl rounded-2xl text-white mb-[100px] md:mb-[30px]"
            contentClasses="text-sm mb-4 sm:mb-0 pr-4"
            buttonClasses="bg-white text-[#102224] font-semibold px-6 py-2.5 rounded-xl text-sm shadow hover:bg-gray-100 transition cursor-pointer whitespace-nowrap"
        >
            We use cookies to improve your experience and analyze site use.{" "}
            <a href="/privacy" className="underline font-medium text-white ml-1">
                Privacy policy
            </a>
        </CookieConsent>
    );
};
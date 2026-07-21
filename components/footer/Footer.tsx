import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";

const footerLinks = {
  quickLinks: [
    { label: "FAQs", href: "/faq" },
    { label: "Help & Support", href: "/help" },
    { label: "Policy & Privacy", href: "/policy" },
  ],
  community: [
    { label: "Join Community", href: "/join-community" },
    { label: "Contribute on GitHub", href: "/community-discussions" },
    { label: "Feature Requests", href: "/feature-requests" },
    { label: "Beta Testing", href: "/community-discussions" },
    { label: "Community Discussions", href: "/community-discussions" },
    { label: "Developer Documentation", href: "/developer-documentation" },
  ],
  pricing: [
    { label: "Pricing Plan", href: "/pricing" },
    { label: "Promote your Offer", href: "/promote-your-offer" },
    { label: "Why Premium", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const SocialIcons = () => (
  <div className="flex gap-6">
    <a
      href="https://x.com/theawoofhub"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-1 hover:text-gray-300 transition-colors"
    >
      <FaTwitter className="w-5 h-5" />
      <span className="text-[10px] font-baloo">X (twitter)</span>
    </a>
    <a
      href="https://www.instagram.com/theawoofhub/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-1 hover:text-gray-300 transition-colors"
    >
      <RiInstagramFill className="w-5 h-5" />
      <span className="text-[10px] font-baloo">Instagram</span>
    </a>
    <a
      href="https://www.linkedin.com/company/awoofhub/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-1 hover:text-gray-300 transition-colors"
    >
      <FaLinkedinIn className="w-5 h-5" />
      <span className="text-[10px] font-baloo">LinkedIn</span>
    </a>
    <a
      href="https://www.tiktok.com/@theawoofhub"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-1 hover:text-gray-300 transition-colors"
    >
      <FaTiktok className="w-5 h-5" />
      <span className="text-[10px] font-baloo">TikTok</span>
    </a>
  </div>
);

const Newsletter = () => (
  <div>
    <h3 className="text-xl font-semibold mb-2 font-baloo">
      Subscribe to our Newsletter!
    </h3>
    <p className="text-sm mb-4 font-baloo">
      Get the latest awoofs delivered to your inbox
    </p>
    <div className="relative w-full mb-3">
      <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-6 h-6" />
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full pl-12 pr-4 py-4 rounded-xl text-white text-sm font-baloo outline-none bg-black border border-white placeholder:text-gray-400"
      />
    </div>
    <button className="w-full px-4 py-2 bg-white text-black font-semibold text-sm rounded-sm hover:bg-gray-100 transition-colors font-baloo">
      Subscribe
    </button>
  </div>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-10 px-6 md:px-12 lg:px-10 font-baloo">
      <div className="max-w-[1440px] mx-auto mb-[60px] lg:mb-[0]">

        {/* ── DESKTOP LAYOUT (lg+): single row — brand | links | newsletter ── */}
        <div className="hidden lg:grid lg:grid-cols-14 gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-3">
            <Image
              src="/LogoWhite.png"
              alt="Logo"
              width={500}
              height={500}
              priority
              className="w-40 h-auto"
            />
            <p className="text-sm mt-2 mb-6 max-w-xs font-baloo">
              The marketplace where deals find customers
            </p>
            <SocialIcons />
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4 font-baloo">Quick Link</h3>
            <ul className="space-y-4 text-sm text-white">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label} className="font-baloo">
                  <Link href={link.href} className="hover:text-gray-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4 font-baloo">Community</h3>
            <ul className="space-y-4 text-sm text-white">
              {footerLinks.community.map((link) => (
                <li key={link.label} className="font-baloo">
                  <Link href={link.href} className="hover:text-gray-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4 font-baloo">Pricing</h3>
            <ul className="space-y-4 text-sm text-white">
              {footerLinks.pricing.map((link) => (
                <li key={link.label} className="font-baloo">
                  <Link href={link.href} className="hover:text-gray-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="font-bold mb-4 font-baloo">Company</h3>
            <ul className="space-y-4 text-sm text-white">
              {footerLinks.company.map((link) => (
                <li key={link.label} className="font-baloo">
                  <Link href={link.href} className="hover:text-gray-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <Newsletter />
          </div>
        </div>

        {/* ── TABLET ONLY LAYOUT (md to lg): two-section grid ── */}
        <div className="hidden md:block lg:hidden">
          {/* Section 1: Nav links — 4 cols on tablet */}
          <div className="grid grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold mb-4 font-baloo">Quick Link</h3>
              <ul className="space-y-4 text-sm text-white">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.label} className="font-baloo">
                    <Link href={link.href} className="hover:text-gray-300 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 font-baloo">Community</h3>
              <ul className="space-y-4 text-sm text-white">
                {footerLinks.community.map((link) => (
                  <li key={link.label} className="font-baloo">
                    <Link href={link.href} className="hover:text-gray-300 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 font-baloo">Pricing</h3>
              <ul className="space-y-4 text-sm text-white">
                {footerLinks.pricing.map((link) => (
                  <li key={link.label} className="font-baloo">
                    <Link href={link.href} className="hover:text-gray-300 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 font-baloo">Company</h3>
              <ul className="space-y-4 text-sm text-white">
                {footerLinks.company.map((link) => (
                  <li key={link.label} className="font-baloo">
                    <Link href={link.href} className="hover:text-gray-300 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2: Brand + Newsletter — side-by-side on tablet */}
          <div className="grid grid-cols-2 gap-10 mb-12">
            <div>
              <Image
                src="/LogoWhite.png"
                alt="Logo"
                width={500}
                height={500}
                priority
                className="w-40 h-auto"
              />
              <p className="text-sm mt-2 mb-6 max-w-xs font-baloo">
                The marketplace where deals find customers
              </p>
              <SocialIcons />
            </div>

            <Newsletter />
          </div>
        </div>

        {/* ── MOBILE ONLY LAYOUT (below md): single column, desktop section order ── */}
        <div className="block md:hidden">
          {/* Brand */}
          <div className="mb-10">
            <Image
              src="/LogoWhite.png"
              alt="Logo"
              width={500}
              height={500}
              priority
              className="w-40 h-auto"
            />
            <p className="text-sm mt-2 mb-6 max-w-xs font-baloo">
              The marketplace where deals find customers
            </p>
            <SocialIcons />
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4 font-baloo">Quick Link</h3>
            <ul className="space-y-4 text-sm text-white">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label} className="font-baloo">
                  <Link href={link.href} className="hover:text-gray-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4 font-baloo">Community</h3>
            <ul className="space-y-4 text-sm text-white">
              {footerLinks.community.map((link) => (
                <li key={link.label} className="font-baloo">
                  <Link href={link.href} className="hover:text-gray-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4 font-baloo">Pricing</h3>
            <ul className="space-y-4 text-sm text-white">
              {footerLinks.pricing.map((link) => (
                <li key={link.label} className="font-baloo">
                  <Link href={link.href} className="hover:text-gray-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="mb-10">
            <h3 className="font-bold mb-4 font-baloo">Company</h3>
            <ul className="space-y-4 text-sm text-white">
              {footerLinks.company.map((link) => (
                <li key={link.label} className="font-baloo">
                  <Link href={link.href} className="hover:text-gray-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="mb-10">
            <Newsletter />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-muted pt-8 text-center">
          <p className="text-sm text-[#D5DBE3] font-baloo">
            &copy;{currentYear} AwoofHub. All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

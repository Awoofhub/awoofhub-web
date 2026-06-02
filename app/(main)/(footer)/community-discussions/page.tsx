import Footer from "@/components/footer/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

const socials = [
  { id: 0, icon: <FaInstagram />, handle: "@awoofhub" },
  { id: 1, icon: <FaLinkedinIn />, handle: "AwoofHub" },
  { id: 2, icon: <FaXTwitter />, handle: "@awoofhub" },
  { id: 3, icon: <FaFacebookF />, handle: "@awoofhub" },
];

export default function CommunityDiscussions() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <div className="bg-background my-5">
        <section className="px-6 md:px-12 py-6 md:py-8 max-w-[1440px] mx-auto text-center">
          <h2 className="text-primary px-6 py-2 rounded-xl mb-8 font-semibold inline-flex uppercase bg-gray-50 border border-gray-100 shadow-md">
            For Devs & Products
          </h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-6">
            Join the <span className="text-primary">Builders</span> Community!
          </h1>
          <p className="text-muted text-base md:text-lg lg:text-xl font-medium max-w-6xl mx-auto mb-8">
            This isn't another discussion forum, it's where developers and
            product makers turn ideas into working product together. Join and
            connect with the network of builders to create solutions that
            matter. Access resources, learn, contribute, collaborate and move
            your skills and ideas forward!
          </p>

          {/* Quick Links */}
          <div className="flex flex-col flex-wrap md:flex-row items-center text-center justify-center gap-4 lg:gap-6 mb-12">
            <Link
              href="/contribute-github"
              className="px-6 py-2 border border-primary font-baloo text-black font-semibold rounded-xl bg-[#F2F2F2] hover:bg-orange-50 transition-colors text-base lg:text-lg"
            >
              Contribute on GitHub
            </Link>
            <Link
              href="/feature-requests"
              className="px-6 py-2 border border-primary font-baloo text-black font-semibold rounded-xl bg-[#F2F2F2] hover:bg-orange-50 transition-colors text-base lg:text-lg"
            >
              Feature Request
            </Link>
            <Link
              href="/developer-documentation"
              className="px-6 py-2 border border-primary font-baloo text-black font-semibold rounded-xl bg-[#F2F2F2] hover:bg-orange-50 transition-colors text-base lg:text-lg"
            >
              Developers DOCS
            </Link>
            <Link
              href="/beta-testing"
              className="px-6 py-2 border border-primary text-black font-baloo font-semibold rounded-xl bg-[#F2F2F2] hover:bg-orange-50 transition-colors text-base lg:text-lg"
            >
              Beta Testing
            </Link>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <Image
              src="/builders.png"
              alt="Builders community illustration"
              width={500}
              height={400}
              className="w-full max-w-xl h-auto"
            />
          </div>
        </section>
      </div>

      {/* Contribute on GitHub */}
      <div className="bg-background my-5">
        <section className="px-6 md:px-12 py-10 md:py-12 lg:py-16 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="w-full md:w-1/2 flex justify-center md:justify-between">
              <Image
                src="/github-contribute.png"
                alt="Contribute on GitHub"
                width={400}
                height={400}
                className="w-[250px] md:w-[350px] lg:w-[400px] h-auto"
              />
            </div>
            <div className="flex flex-col text-center items-center md:text-start md:items-start w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-4">
                Contribute on GitHub
              </h2>
              <p className="text-muted text-base lg:text-xl font-medium mb-4">
                AwoofHub is growing, and you can be part of the journey.
                Contribute to our codebase on GitHub to help improve features,
                fix bugs, and shape the future of how people discover deals.
              </p>
              <p className="text-muted text-base lg:text-xl font-medium mb-6">
                Whether you are a developer, designer, or just curious, your
                ideas and contributions are always welcome
              </p>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-primary text-base lg:text-lg font-baloo text-white font-semibold rounded-md hover:bg-orange-600 transition-colors"
              >
                Contribute on GitHub
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Feature Request */}
      <div className="bg-background my-5">
        <section className="px-6 md:px-12 py-10 md:py-12 lg:py-16 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/feature-request.png"
                alt="Feature Request"
                width={400}
                height={400}
                className="w-[250px] md:w-[350px] lg:w-[400px] h-auto"
              />
            </div>
            <div className="flex flex-col text-center items-center md:text-start md:items-start w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-4">
                Feature Request
              </h2>
              <p className="text-muted text-base lg:text-xl font-medium mb-4">
                Get early access to what we are building next on AwoofHub. As a
                beta tester, you will explore new features before anyone else,
                share feedback that directly shapes the platform, and help us
                deliver a smoother deal discovery experience.
              </p>
              <p className="text-muted text-base lg:text-xl font-medium mb-6">
                Spots are limited, join the inner circle and build with us.
              </p>
              <Link
                href="/feature-requests"
                className="inline-block px-6 py-2 text-base lg:text-lg font-baloo bg-primary text-white font-semibold rounded-md hover:bg-orange-600 transition-colors"
              >
                Request a Feature
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Developers Documentation */}
      <div className="bg-background my-5">
        <section className="px-6 md:px-12 py-10 md:py-12 lg:py-16 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="w-full md:w-1/2 flex justify-center md:justify-between">
              <Image
                src="/dev-docs.png"
                alt="Developers Documentation"
                width={400}
                height={400}
                className="w-[250px] md:w-[350px] lg:w-[400px] h-auto"
              />
            </div>
            <div className="flex flex-col text-center items-center md:text-start md:items-start w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-4">
                Developers Documentation
              </h2>
              <p className="text-muted text-base lg:text-xl font-medium mb-6">
                This documentation covers the technical specifications and
                implementation guidelines for the AwoofHub platform, a curated
                deals discovery and ad marketplace built for students, young
                professionals, and budget-conscious consumers in Nigeria.
              </p>
              <Link
                href="/developer-documentation"
                className="inline-block px-6 py-2 text-base lg:text-lg font-baloo bg-primary text-white font-semibold rounded-md hover:bg-orange-600 transition-colors"
              >
                Get Access
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Beta Testing */}
      <div className="bg-background my-5">
        <section className="px-6 md:px-12 py-10 md:py-12 lg:py-16 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/beta-testing.png"
                alt="Beta Testing"
                width={400}
                height={400}
                className="w-[250px] md:w-[350px] lg:w-[400px] h-auto"
              />
            </div>
            <div className="flex flex-col text-center items-center md:text-start md:items-start w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-4">
                Beta Testing
              </h2>
              <p className="text-muted text-base lg:text-xl font-medium mb-4">
                Get early access to what we are building next on AwoofHub. As a
                beta tester, you will explore new features before anyone else,
                share feedback that directly shapes the platform, and help us
                deliver a smoother deal discovery experience.
              </p>
              <p className="text-muted text-base lg:text-xl font-medium mb-6">
                Spots are limited, join the inner circle and build with us.
              </p>
              <Link
                href="/beta-testing"
                className="inline-block px-6 py-2 text-base lg:text-lg font-baloo bg-primary text-white font-semibold rounded-md hover:bg-orange-600 transition-colors"
              >
                Join Beta Testers
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Social Media */}
      <div className="bg-background my-5">
        <section className="py-8 md:py-10 lg:py-16 px-6 md:px-12 max-w-[1440px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-black mb-10">
            Connect with us:
          </h2>
          <div className="flex flex-wrap gap-16">
            {socials.map((s) => (
              <div key={s.id} className="flex flex-col gap-2">
                <span className="text-primary text-3xl">{s.icon}</span>
                <h4 className="text-primary font-normal text-lg">{s.handle}</h4>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

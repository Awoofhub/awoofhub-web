import Footer from "@/components/footer/Footer";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";


const features = [
  {
    icon: "/feature1.png",
    title: "One Place for Every Offer",
    description:
      "Deals are organised into categories such as; Coupons, Discounts, Freebies, etc. This makes discovering offers fast and effortless.",
  },
  {
    icon: "/feature2.png",
    title: "Built for Everyone",
    description:
      "Customers, businesses, students, deals finder, entrepreneurs, affiliation marketer etc.",
  },
  {
    icon: "/feature3.png",
    title: "Get More for Less",
    description:
      "AwoofHub makes saving money simple, transparent, and accessible.",
  },
  {
    icon: "/feature4.png",
    title: "Promote your Offer",
    description:
      "Put your service, product, or skill in front of the right audience. AwoofHub gives you the tools to get noticed and drive real interest.",
  },
];

const team = [
  { name: "Moses Martins", role: "Software Engineer", image: "/team.png" },
  { name: "Shema M.", role: "Product Manager", image: "/team.png" },
  { name: "Deborah O. Overseer", role: "Product Designer", image: "/team.png" },
  { name: "Moses Martins", role: "Frontend Engineer", image: "/team.png" },
  { name: "Moses Martins", role: "Customer Success Lead", image: "/team.png" },
  { name: "Moses Martins", role: "Project Manager", image: "/team.png" },
  { name: "Moses Martins", role: "Marketing Head", image: "/team.png" },
  { name: "Moses Martins", role: "Startup Sommelier", image: "/team.png" },
];

const stats = [
  { value: "5000+", label: "Active Users" },
  { value: "150+", label: "Ongoing Deals" },
  { value: "700+", label: "Happy Community" },
  { value: "15", label: "Team Members" },
];

export default function AboutUs() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="bg-background my-5">
        <section className="relative text-center py-12 px-6 md:px-12 max-w-[1440px] mx-auto">
          {/* Star decorations */}
          <Image
            className="absolute top-20 left-1/4"
            alt="star"
            src="/star.png"
            width={25}
            height={25}
          />
          <Image
            className="absolute top-42 right-1/10"
            alt="star"
            src="/star.png"
            width={25}
            height={25}
          />
          <Image
            className="absolute bottom-20 left-1/6"
            alt="star"
            src="/star.png"
            width={25}
            height={25}
          />
          <Image
            className="absolute bottom-14 right-3/8"
            alt="star"
            src="/star.png"
            width={25}
            height={25}
          />
          <h2 className="text-primary px-12 py-2 rounded-xl mb-8 font-semibold inline-flex uppercase bg-gray-50 border border-gray-100 shadow-md">
            About Us
          </h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-6">
            The marketplace where <span className="text-primary">deals</span>{" "}
            find customers.
          </h1>
          <p className="text-muted max-w-6xl mt-10 mx-auto text-base md:text-xl font-medium mb-8">
            AwoofHub is a modern digital marketplace built to connect people
            with the best offers happening around them. Instead of searching
            endlessly for discounts, coupons, and promo codes across multiple
            platforms, AwoofHub brings them all together in one place. Our
            platform helps everyday shoppers discover exclusive deals on food,
            fashion, electronics, services, travel, entertainment, and more.
            From limited time flash discounts to cashback offers and free
            trials.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-sm text-sm font-medium hover:bg-gray-200 transition-colors">
            Watch Video
            <FaPlay className="text-primary" />
          </button>
        </section>
      </div>

      {/* What makes AwoofHub */}
      <div className="bg-background my-5">
        <section className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto text-center">
          <div className="flex flex-col gap-1 items-center justify-center ">
            <h2 className="text-2xl md:text-3xl font-semibold">
              What makes AwoofHub?
            </h2>
            <Image src="/line.png" alt="line" width={200} height={200} />
          </div>
          <p className="text-muted max-w-6xl mx-auto mb-12 text-lg md:text-xl font-medium mt-4">
            We focus on deals that matter to real people in real time. Users can
            easily explore discounts, coupons, and special promotions available
            around them.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="border border-gray-100 bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={100}
                  height={150}
                  className="mb-4 mx-auto min-h-[150px] min-w-[100px] object-contain"
                />
                <p className="font-bold text-black text-lg md:text-xl mb-2 text-center">
                  {feature.title}
                </p>
                <h5 className="text-black font-normal text-base md:text-lg text-center">
                  {feature.description}
                </h5>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Our Mission */}
      <div className="bg-background my-5">
        <section className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/mission.png"
                alt="Our Mission"
                width={300}
                height={300}
                className="w-[250px] md:w-[350px] h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl md:text-3xl font-semibold">
                  Our Mission
                </h2>
                <Image src="/line.png" alt="line" width={200} height={200} />
              </div>
              <p className="text-muted text-lg mt-4 md:text-xl font-medium">
                Our mission is simple.
              </p>
              <p className="text-muted text-lg md:text-xl font-medium">
                Help people discover real deals while helping businesses reach
                the right customers. We believe great offers should not be
                hidden. Businesses deserve visibility for their promotions, and
                customers deserve an easy way to find value in the things they
                already buy.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Our Vision */}
      <div className="bg-background my-5">
        <section className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/vision.png"
                alt="Our Vision"
                width={400}
                height={400}
                className="w-[300px] md:w-[400px] h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl md:text-3xl font-semibold">
                  Our Vision
                </h2>
                <Image src="/line.png" alt="line" width={200} height={200} />
              </div>
              <p className="text-muted text-lg mt-4 md:text-xl font-medium">
                We are building a future where everyday shopping feels like
                Black Friday. A world where finding value is effortless and
                every great deal reaches the right audience.
              </p>
            </div>
          </div>
        </section>
      </div>

  {/* Meet the Team */}
<div className="bg-background my-5">
  <section className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto text-center">
    <div className="flex flex-col items-center gap-1">
      <h2 className="text-2xl md:text-3xl font-semibold">Meet the team</h2>
      <Image src="/line.png" alt="line" width={200} height={200} />
    </div>
    <p className="text-muted mt-4 font-medium mb-12 text-lg md:text-xl">
      Meet the great minds working behind the scene of AwoofHub.
    </p>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
      {team.map((member, index) => (
        <div key={index} className="relative pb-12">
          <Image
            src={member.image}
            alt={member.name}
            width={300}
            height={300}
            className="w-full object-cover rounded-xl"
          />
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
            <Image
              src="/teamBanner.png"
              alt="banner"
              width={300}
              height={80}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 px-2 py-1 flex flex-col justify-center">
              <h5 className="font-semibold text-sm md:text-lg text-white truncate">
                {member.name}
              </h5>
              <h5 className="text-xs md:text-sm uppercase text-white font-normal truncate">
                {member.role}
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
</div>

      {/* Stats & Join Community */}
      <div className="bg-background my-5">
        <section className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-10 w-full md:w-2/5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="aspect-square border border-gray-50 bg-[#FAFAFA] shadow-sm flex flex-col items-center justify-center text-center p-6"
                >
                  <p className="text-2xl md:text-3xl font-medium text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Join Community */}
            <div className="w-full md:ms-30 md:w-3/5">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl md:text-4xl font-semibold">
                  Join our community
                </h2>
                <Image src="/line.png" alt="line" width={200} height={200} />
              </div>
              <p className="text-muted max-w-xl  font-medium text-lg md:text-xl my-6">
                Thousands of people use AwoofHub to discover deals every day.
                Browse active offers, publish deal and start saving today.
              </p>
              <Link
                href="/offers"
                className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-md hover:bg-orange-600 transition-colors"
              >
                Browse Active Offers
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Contact Info */}
      <div className="bg-background my-5">
        <section className="py-12 px-6 md:px-12 max-w-[1440px] mx-auto">
          <div className="flex flex-col sm:flex-row gap-8 justify-between">
            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-1 items-center ">
                <FaLocationDot className="w-6 h-6" />
                <h5 className="text-xl">Location</h5>
              </div>
              <h5 className="font-semibold text-xl text-gray-900">Lagos, Nigeria</h5>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-1 items-center ">
                <IoCall className=" w-6 h-6" />
                <h5 className="text-xl">Call</h5>
              </div>
              <h5 className="font-semibold text-xl text-gray-900">+234 800 333 3330</h5>
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

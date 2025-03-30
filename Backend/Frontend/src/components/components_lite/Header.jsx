import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { motion } from "framer-motion";

const floatingLogos = [
  {
    src: "/images/google.png",
    alt: "Google",
  },
  {
    src: "/images/facebook.png",
    alt: "Facebook",
  },
  {
    src: "/images/amazon.png",
    alt: "Amazon",
  },
  {
    src: "/images/twitter.png",
    alt: "Twitter",
  },
  {
    src: "/images/linkedin.png",
    alt: "LinkedIn",
  },
  {
    src: "/images/microsoft.png",
    alt: "Microsoft",
  },
  {
    src: "/images/youtube.png",
    alt: "YouTube",
  },
  {
    src: "/images/apple.png",
    alt: "Apple",
  },
  {
    src: "/images/meta.png",
    alt: "Meta",
  },
  {
    src: "/images/netflix.png",
    alt: "Netflix",
  },
];

const Header = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Floating Background Logos */}
      {floatingLogos.map((logo, index) => (
        <motion.img
          key={index}
          src={logo.src}
          alt={logo.alt}
          className="absolute opacity-20 w-12 h-12"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [
              Math.random() * -200,
              Math.random() * 200,
              Math.random() * -200,
            ],
            y: [
              Math.random() * -200,
              Math.random() * 200,
              Math.random() * -200,
            ],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3, // Faster animation (3-8 sec)
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="text-center relative z-10">
        <div className="flex flex-col gap-5 my-10">
          <span className="px-4 mx-auto flex justify-center items-center py-2 gap-2 rounded-full bg-gray-200 text-red-600 font-medium">
            <span className="text-[#614232]">
              <PiBuildingOfficeFill />
            </span>
            No.1 Job Hunt Website
          </span>

          <h2 className="text-4xl font-bold text-white py-4">
            Search Apply & <br />
            Get your <span className="text-[#FF6B6B]">Dream Job</span>
          </h2>
          <p>
            Start your hunt for the best, life-changing career opportunities
            from here in your <br />
            selected areas conveniently and get hired quickly.
          </p>
          <div className="flex w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center gap-4 mx-auto">
            <input
              type="text"
              placeholder="Find Your Dream Job"
              className="outline-none border-none w-full"
            />
            <Button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:from-cyan-500 hover:to-blue-600">
              <Search className="h-5 w-5 mr-2" />
              Search Jobs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { motion } from "framer-motion";

const floatingLogos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    alt: "Google",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    alt: "Facebook",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    alt: "Amazon",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
    alt: "Twitter",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7e/LinkedIn_Logo.svg",
    alt: "LinkedIn",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    alt: "Microsoft",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/64/YouTube_icon_dark.svg",
    alt: "YouTube",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Apple_logo_black.svg",
    alt: "Apple",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/db/Meta_Logo.svg",
    alt: "Meta",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Netflix-Logo-PMS.png",
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

          <h2 className="text-5xl font-bold text-gray-800 py-4">
            Search Apply & <br />
            Get your <span className="text-[#6B3AC2]">Dream Job</span>
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
            <Button className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:from-indigo-600 hover:to-purple-500">
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

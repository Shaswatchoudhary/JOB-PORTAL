import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mern Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];

const Categories = () => {
  // Plugin for autoplay
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  // Visual indicator for active slide
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center text-blue-600 mb-1"
        >
          Explore Job Categories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-600 max-w-2xl mx-auto"
        >
          Discover opportunities across various tech domains
        </motion.p>
      </div>

      <Carousel
        className="w-full max-w-4xl mx-auto"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        onSlideChange={(index) => setActiveIndex(index)}
      >
        <CarouselContent className="-ml-4">
          {Category.map((category, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:basis-1/3 lg:basis-1/4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  opacity: index === activeIndex ? 1 : 0.8,
                  scale: index === activeIndex ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Button
                  className="w-full h-full min-h-[60px] bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl font-medium"
                  variant="outline"
                >
                  {category}
                </Button>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex justify-center mt-6">
          <CarouselPrevious className="mr-4 bg-white border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-400 static transform-none" />
          <CarouselNext className="ml-4 bg-white border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-400 static transform-none" />
        </div>
      </Carousel>
    </div>
  );
};

export default Categories;

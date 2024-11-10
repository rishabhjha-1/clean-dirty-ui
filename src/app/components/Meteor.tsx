import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const generateRandomPosition = () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
});

const generateRandomDelay = () => Math.random() * 3;

const MeteorBackground = () => {
  const [meteorPositions, setMeteorPositions] = useState<{ left: string; top: string }[]>([]);

  useEffect(() => {
    const positions = [...Array(20)].map(() => generateRandomPosition());
    setMeteorPositions(positions);
  }, []); // Runs only on the client

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]">
      {meteorPositions.map((position, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-24 bg-gradient-to-r dark:from-white from-black to-transparent rounded-full"
          style={position}
          animate={{
            x: -2000,
            y: 1000,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5,
            delay: generateRandomDelay(),
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
};

export default MeteorBackground;

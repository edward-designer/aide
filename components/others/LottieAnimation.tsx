"use client";

import { useState } from "react";
import Lottie from "react-lottie-player";

const LottieAnimation = ({ children }: { children: object }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}
    >
      <Lottie
        loop={isHover}
        animationData={children}
        play={isHover}
        className="w-[50%] mx-auto mb-9"
      />
    </div>
  );
};

export default LottieAnimation;

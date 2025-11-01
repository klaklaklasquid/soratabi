import { useState, useRef, useCallback } from "react";
import gsap from "gsap";

export function useHamburgerAnimation() {
  const [isOpen, setIsOpen] = useState(false);

  const barTop = useRef(null);
  const barBottom = useRef(null);

  const animateBars = useCallback(() => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = !prevIsOpen;

      const top = barTop.current;
      const bottom = barBottom.current;

      if (!top || !bottom) return newIsOpen;

      if (!prevIsOpen) {
        gsap.to(top, {
          duration: 0.3,
          y: 6,
          rotation: 45,
          ease: "power2.inOut",
        });

        gsap.to(bottom, {
          duration: 0.3,
          y: -6,
          rotation: -45,
          ease: "power2.inOut",
        });
      } else {
        gsap.to([top, bottom], {
          duration: 0.3,
          y: 0,
          rotation: 0,
          ease: "power2.inOut",
        });
      }
      return newIsOpen;
    });
  }, []);

  return {
    isOpen,
    barTop,
    barBottom,
    toggleAnimation: animateBars,
  };
}

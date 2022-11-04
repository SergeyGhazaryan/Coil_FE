import { Dispatch, SetStateAction } from "react";

export const windowsWidth = (
  setIsMobile: Dispatch<SetStateAction<boolean>>
) => {
  const windowSize = window?.innerWidth;
  const closeHamburgerMenu = () => {
    setIsMobile(windowSize > 1135);
  };
  closeHamburgerMenu();
  window.addEventListener("resize", closeHamburgerMenu);
  return () => window.removeEventListener("resize", closeHamburgerMenu);
};

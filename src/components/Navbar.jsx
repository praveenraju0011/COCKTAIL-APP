import React from "react";
import { navLinks } from "../../Constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
  useGSAP(() => {
    const gsapControl = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });
    gsapControl.fromTo(
      "nav",
      { background: "transparent" },
      {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backgroundFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
      }
    );
  });
  return (
    <nav>
      <div>
        <a href="#home" className="flex items-center gap-2">
          <p className="flex flex-col text-2xl sm:flex-col  md:flex-col lg:flex-row justify-between lg:gap-6 items-center">
            <span>T A N J I R O</span>
            <span class="katana-fire"> {`@:]||||═══════>>>`} </span>{" "}
          </p>
        </a>
        <ul>
          {navLinks.map((item, index) => {
            return (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

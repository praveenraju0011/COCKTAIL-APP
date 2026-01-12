import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Ironman = () => {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);

  useGSAP(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    video.pause();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "+=2500",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    video.onloadedmetadata = () => {
      tl.to(video, {
        currentTime: video.duration,
        ease: "none",
        onComplete: () => {
          const goTo = document.querySelector("#cocktails");
          if (goTo) {
            goTo.scrollIntoView({ behavior: "smooth" });
          }
        },
      });
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="/videos/IronMan.mp4"
        muted
        playsInline
        preload="auto"
      />
    </section>
  );
};

export default Ironman;

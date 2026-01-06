import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const titleChars = new SplitText(".title", { type: "chars, words" });
    const subTitleChars = new SplitText(".subtitle", { type: "lines" });

    titleChars.chars.forEach((char) => char.classList.add("char"));

    gsap.from(titleChars.chars, {
      yPercent: 100,
      duration: 1.5,
      stagger: 0.06,
      ease: "expo.out",
    });
    gsap.from(subTitleChars.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 2,
      stagger: 0.3,
      delay: 1,
      ease: "bounce",
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".left-leaf", { y: 200 },0)
      .to(".right-leaf", { y: -200 },0);

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    const video = videoRef.current;

    if (!video) return;

    video.pause();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    video.onloadedmetadata = () => {
      tl.to(video, { currentTime: video.duration });
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="hero-left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="hero-right-leaf"
          className="right-leaf"
        />
        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View cocktails</a>
            </div>
          </div>
        </div>
      </section>
      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        ></video>
      </div>
    </>
  );
};

export default Hero;

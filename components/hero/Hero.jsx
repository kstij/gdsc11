import React, { useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import dynamic from "next/dynamic";
const Animator = dynamic(
  import("react-scroll-motion").then((it) => it.Animator),
  { ssr: false }
);
import {
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  MoveIn,
  Sticky,
  Zoom
} from "react-scroll-motion";
import {
  HeroAvatarWrapper,
  HeroBackgroundContainer,
  HeroBackgroundTextSpan,
  HeroSectionContainer,
  HeroTextSpan,
  LogoContainer,
  MouseContainer,
  MouseScroll
} from "./Hero.styled.js";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";
import Avatar from "../avatar/Avatar";
import { devices } from "@/constants/theme.js";
import MobileHero from "./MobileHero.jsx";
import Image from "next/image.js";

const Hero = () => {
  const heroTextElements = useMemo(
    () => [
      { text: "Web", id: "web", color: "#EA4335", x: 55, y: 20, delay: 0.1 },
      {
        text: "Tensorflow",
        id: "tensorflow",
        color: "#FBBC04",
        x: 38,
        y: 79,
        delay: 0.4
      },
      {
        text: "Kotlin",
        id: "android",
        color: "#0F9D58",
        x: 20,
        y: 20,
        delay: 1.2
      },
      {
        text: "Flutter",
        id: "flutter",
        color: "#4285F4",
        x: 80,
        y: 80,
        delay: 2.3
      }
    ],
    []
  );

  const heroAvatarElements = useMemo(
    () => [
      {
        url: "https://i.postimg.cc/nznP0213/IMG-0935-1-1.jpg",
        borderColor: "#EA4335",
        id: "a1",
        x: 35,
        y: 20,
        delay: 0.9
      },
      {
        url: "https://i.postimg.cc/nznP0213/IMG-0935-1-1.jpg",
        borderColor: "#FBBC04",
        id: "a2",
        x: 60,
        y: 65,
        delay: 1.5
      },
      {
        url: "https://i.postimg.cc/GtwJXmrd/teesha-png.jpg",
        borderColor: "#0F9D58",
        id: "a3",
        x: 18,
        y: 65,
        delay: 0.3
      },
      {
        url: "https://i.postimg.cc/nznP0213/IMG-0935-1-1.jpg",
        borderColor: "#4285F4",
        id: "a4",
        x: 74,
        y: 20,
        delay: 0.3
      }
    ],
    []
  );

  const [isTextHighlighted, setIsTextHighlighted] = useState(false);
  const [isAvatarHighlighted, setIsAvatarHighlighted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const updatedXArrows = useXarrow();
  const handleUpdateXArrows = debounce(updatedXArrows, 100);
  const refsById = useMemo(() => {
    const refs = {};
    heroTextElements.forEach((item) => {
      refs[item.id] = React.createRef(null);
    });
    heroAvatarElements.forEach((item) => {
      refs[item.id] = React.createRef(null);
    });
    return refs;
  }, [heroAvatarElements, heroTextElements]);

  useEffect(() => {
    if (refsById != null) {
      handleUpdateXArrows();
    }
  }, [refsById, handleUpdateXArrows]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(devices.lg);
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <HeroSectionContainer>
      {!isMobile ? (
        <ScrollContainer snap="none">
          <ScrollPage>
            <Animator animation={batch(Fade(0, 1), Sticky(), Zoom(8, 1))}>
              <LogoContainer>
                <Image
                  src="/logos/gdsc-logo.svg"
                  alt="GDSC Logo"
                  priority
                  fill
                />
                <MouseContainer>
                  <MouseScroll
                    animate={{
                      y: [0, 24, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                </MouseContainer>
              </LogoContainer>
            </Animator>
          </ScrollPage>
          <ScrollPage>
            <Animator animation={batch(Fade(), Sticky(), MoveIn())}>
              <HeroBackgroundContainer>
                <div className="mainText">
                  <HeroTextSpan
                    color="#EA4335"
                    onMouseEnter={() => setIsTextHighlighted(true)}
                    onMouseLeave={() => setIsTextHighlighted(false)}
                  >
                    Learn.
                  </HeroTextSpan>
                  <HeroTextSpan
                    color="#4285F4"
                    onMouseEnter={() => setIsAvatarHighlighted(true)}
                    onMouseLeave={() => setIsAvatarHighlighted(false)}
                  >
                    Connect.
                  </HeroTextSpan>
                  <HeroTextSpan color="#0F9D58">Grow.</HeroTextSpan>
                </div>
                <Xwrapper>
                  {heroTextElements.map((element, index) => (
                    <HeroBackgroundTextSpan
                      isHighlighted={isTextHighlighted}
                      top={element.y}
                      left={element.x}
                      key={index}
                      color={element.color}
                      id={element.id}
                      ref={refsById[element.id]}
                      delay={element.delay}
                    >
                      {element.text}
                    </HeroBackgroundTextSpan>
                  ))}
                  {heroAvatarElements.map((element, index) => (
                    <HeroAvatarWrapper
                      isHighlighted={isAvatarHighlighted}
                      top={element.y}
                      left={element.x}
                      key={index}
                      id={element.id}
                      ref={refsById[element.id]}
                      delay={element.delay}
                    >
                      <Avatar
                        size="lg"
                        url={element.url}
                        borderColor={element.borderColor}
                        blur={true}
                        priority={true}
                      />
                    </HeroAvatarWrapper>
                  ))}
                  <Xarrow
                    start={refsById["a1"]}
                    end={refsById["a2"]}
                    showHead={false}
                    showTail={false}
                    startAnchor={"middle"}
                    endAnchor={"middle"}
                    headShape={"circle"}
                    tailShape={"circle"}
                    tailSize={3}
                    headSize={3}
                    curveness={0}
                    strokeWidth={2}
                    zIndex={-2}
                    headColor={isTextHighlighted ? "#EA4335" : "#F1F1F1"}
                    tailColor={isTextHighlighted ? "#EA4335" : "#F1F1F1"}
                    lineColor={isAvatarHighlighted ? "#4285F4" : "#F1F1F1"}
                  />
                  <Xarrow
                    start={refsById["a2"]}
                    end={refsById["a4"]}
                    showHead={false}
                    showTail={false}
                    startAnchor={"middle"}
                    endAnchor={"middle"}
                    headShape={"circle"}
                    tailShape={"circle"}
                    tailSize={3}
                    headSize={3}
                    curveness={0}
                    strokeWidth={2}
                    zIndex={-2}
                    headColor={isTextHighlighted ? "#EA4335" : "#F1F1F1"}
                    tailColor={isTextHighlighted ? "#EA4335" : "#F1F1F1"}
                    lineColor={isAvatarHighlighted ? "#4285F4" : "#F1F1F1"}
                  />
                  <Xarrow
                    start={refsById["a1"]}
                    end={refsById["a3"]}
                    showHead={false}
                    showTail={false}
                    startAnchor={"middle"}
                    endAnchor={"middle"}
                    headShape={"circle"}
                    tailShape={"circle"}
                    tailSize={3}
                    headSize={3}
                    curveness={0}
                    strokeWidth={2}
                    zIndex={-2}
                    headColor={isTextHighlighted ? "#EA4335" : "#F1F1F1"}
                    tailColor={isTextHighlighted ? "#EA4335" : "#F1F1F1"}
                    lineColor={isAvatarHighlighted ? "#4285F4" : "#F1F1F1"}
                  />

                  <Xarrow
                    start="flutter"
                    end="web"
                    showHead={true}
                    showTail={true}
                    startAnchor={"top"}
                    endAnchor={"right"}
                    headShape={"circle"}
                    tailShape={"circle"}
                    tailSize={3}
                    headSize={3}
                    curveness={0}
                    zIndex={-2}
                    strokeWidth={2}
                    headColor={isTextHighlighted ? "#EA4335" : "#F1F1F1"}
                    tailColor={isTextHighlighted ? "#EA4335" : "#F1F1F1"}
                    lineColor={isTextHighlighted ? "#EA4335" : "#F1F1F1"}
                  />

                  <Xarrow
                    start="tensorflow"
                    end="web"
                    showHead={true}
                    showTail={true}
                    startAnchor={"right"}
                    endAnchor={"left"}
                    headShape={"circle"}
                    tailShape={"circle"}
                    tailSize={3}
                    headSize={3}
                    curveness={0}
                    zIndex={-2}
                    strokeWidth={2}
                    headColor={isTextHighlighted ? "#EA4335" : "#F1F1F1"}
                    tailColor={isTextHighlighted ? "#EA4335" : "#F1F1F1"}
                    lineColor={isTextHighlighted ? "#EA4335" : "#F1F1F1"}
                  />

                  <Xarrow
                    start="tensorflow"
                    end="android"
                    showHead={true}
                    showTail={true}
                    startAnchor={"left"}
                    endAnchor={"bottom"}
                    headShape={"circle"}
                    tailShape={"circle"}
                    tailSize={3}
                    headSize={3}
                    curveness={0}
                    zIndex={-2}
                    strokeWidth={2}
                    headColor={isTextHighlighted ? "#EA4335" : "#F1F1F1"}
                    tailColor={isTextHighlighted ? "#EA4335" : "#F1F1F1"}
                    lineColor={isTextHighlighted ? "#EA4335" : "#F1F1F1"}
                  />
                </Xwrapper>
              </HeroBackgroundContainer>
            </Animator>
          </ScrollPage>
        </ScrollContainer>
      ) : (
        <MobileHero />
      )}
    </HeroSectionContainer>
  );
};

export default Hero;

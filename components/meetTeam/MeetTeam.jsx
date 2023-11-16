import { useEffect, useState } from "react";
import Link from "next/link";

import {
  MainContainer,
  LeftContainer,
  RightContainer,
  MeetButton
} from "./MeetTeam.styled";
import Avatar from "../avatar/Avatar";
import Typography from "../display/typography/Typography";
import { devices } from "@/constants/theme";

function MeetTeam() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(devices.sm);
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
    <MainContainer>
      <LeftContainer>
        <Avatar
          size={isMobile ? "lg" : "xl"}
          borderColor={"#4285F4"}
          url={
            "https://i.postimg.cc/nznP0213/IMG-0935-1-1.jpg"
          }
          className="first"
          blur={true}
          borderWidth={"3px"}
        />
        <Avatar
          size={isMobile ? "lg" : "xl"}
          borderColor={"#0F9D58"}
          url={
            "https://i.postimg.cc/nznP0213/IMG-0935-1-1.jpg"
          }
          className="second"
          blur={true}
          borderWidth={"3px"}
        />
        <Avatar
          size={isMobile ? "lg" : "xl"}
          borderColor={"#EA4335"}
          url={
            "https://i.postimg.cc/nznP0213/IMG-0935-1-1.jpg"
          }
          className="third"
          blur={true}
          borderWidth={"3px"}
        />
      </LeftContainer>
      <RightContainer>
        <Typography variant="h1">
          Discover the great minds behind GDSC.
        </Typography>
        <Link href="/team" style={{ textDecoration: "none" }}>
          <MeetButton>Meet our team</MeetButton>
        </Link>
      </RightContainer>
    </MainContainer>
  );
}

export default MeetTeam;

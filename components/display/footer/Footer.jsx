import Link from "next/link";
import Image from "next/image";

import {
  FooterContainer,
  FooterGithub,
  FooterMeta,
  FooterSocialIcons,
  FooterSocials,
  LogoContainer,
  LogoWrapper
} from "./Footer.styled";
import Typography from "../typography/Typography";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <FooterContainer>
      <LogoWrapper>
        <LogoContainer>
          <Link href="/">
            <Image
              src={"/logos/gdscmu-logo.svg"}
              alt={"GDSC Logo"}
              fill="responsive"
              sizes="500px"
            />
          </Link>
        </LogoContainer>
        <Typography
          variant="bodySmall"
          subdued
          style={{ paddingLeft: "0.5em" }}
        >
          Marwadi University, Rajkot - 360003
          <br />
          Email : gdscmu@gmail.com
        </Typography>
      </LogoWrapper>
      <FooterSocials>
        <Typography variant="body" subdued style={{ textAlign: "center" }}>
          Follow us on Social Media
        </Typography>
        <FooterSocialIcons>
          <Link
            href="https://www.linkedin.com/company/gdscmu"
            target="_blank"
            style={{ color: "gray" }}
          >
            <LinkedInIcon
              style={{ marginBottom: "-5px" }}
              sx={{ fontSize: 25 }}
            />
          </Link>
          <Link
            href="https://www.instagram.com/gdscmu/"
            target="_blank"
            style={{ color: "gray" }}
          >
            <InstagramIcon
              style={{ marginBottom: "-5px" }}
              sx={{ fontSize: 25 }}
            />
          </Link>
          <Link
            href="https://twitter.com/gdscmu"
            target="_blank"
            style={{ color: "gray" }}
          >
            <TwitterIcon
              style={{ marginBottom: "-5px" }}
              sx={{ fontSize: 25 }}
            />
          </Link>
        </FooterSocialIcons>
      </FooterSocials>
      <FooterMeta>
        <Typography
          variant="bodySmall"
          subdued
          style={{ whiteSpace: "normal", width: "90%" }}
        >
          Made with ❤️ by Kshitij Varma
        </Typography>
        <FooterGithub
          href="https://github.com/GDSC-MVJCE/gdscmvjce-website"
          target="_blank"
        >
          <GitHubIcon sx={{ fontSize: 25 }} />
          <Typography variant="bodySmall" style={{ color: "inherit" }}>
            View source code
          </Typography>
        </FooterGithub>
      </FooterMeta>
    </FooterContainer>
  );
};

export default Footer;

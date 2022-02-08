import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdminNavbarLinks from "./AdminNavbarLinks";

interface Props {
  secondary: boolean;
  fixed: boolean;
  onOpen: () => void;
}

export function AdminNavbarTS(props: Props) {
  const [scrolled, setScrolled] = useState(false);
  const { fixed, secondary, onOpen } = props;

  const [mainText, setMainText] = useState('');
  const [secondaryMargin, setSecondaryMargin] = useState('');

  const [navbarBackdrop, setNavbarBackdrop] = useState('');
  const [navbarBg, setNavbarBg] = useState('');
  const [navbarBorder, setNavbarBorder] = useState('');
  const [navbarFilter, setNavbarFilter] = useState('');
  const [navbarPosition, setNavbarPosition] = useState<'absolute' | 'fixed'>('absolute');
  const [navbarShadow, setNavbarShadow] = useState('');
  const [paddingX, setPaddingX] = useState('');

  const mainTextDefault = useColorModeValue("gray.700", "gray.200");
  const secondaryMarginDefault = "0px";
  const navbarBackdropDefault = "blur(21px)";
  const navbarBgDefault = "none";
  const navbarBorderDefault = "transparent";
  const navbarFilterDefault = "none";
  const navbarPositionDefault = "absolute";
  const navbarShadowDefault = "none";
  const paddingXDefault = "15px";

  const navbarBgFixedScrolled = useColorModeValue("linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)", "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)");
  const navbarBorderFixedScrolled = useColorModeValue("#FFFFFF", "rgba(255, 255, 255, 0.31)");
  const navbarFilterFixedScrolled = useColorModeValue("none", "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))");
  const navbarPositionFixedScrolled = "fixed";
  const navbarShadowFixedScrolled = useColorModeValue("0px 7px 23px rgba(0, 0, 0, 0.05)", "none");

  const navbarBackdropSecondary = "none";
  const mainTextSecondary = "white";
  const secondaryMarginSecondary = "22px";
  const paddingXSecondary = "30px";

  useEffect(() => {
    setNavbarPosition(fixed && scrolled ? navbarPositionFixedScrolled : navbarPositionDefault)
    setNavbarShadow(fixed && scrolled ? navbarShadowFixedScrolled : navbarShadowDefault);
    setNavbarBg(fixed && scrolled ? navbarBgFixedScrolled : navbarBgDefault);
    setNavbarBorder(fixed && scrolled ? navbarBorderFixedScrolled : navbarBorderDefault);
    setNavbarFilter(fixed && scrolled ? navbarFilterFixedScrolled : navbarFilterDefault);
  }, [fixed, scrolled, navbarBgFixedScrolled, navbarBorderFixedScrolled, navbarFilterFixedScrolled, navbarShadowFixedScrolled]);

  useEffect(() => {
    setMainText(secondary ? mainTextSecondary : mainTextDefault);
    setNavbarBackdrop(secondary ? navbarBackdropSecondary : navbarBackdropDefault);
    setSecondaryMargin(secondary ? secondaryMarginSecondary : secondaryMarginDefault);
    setPaddingX(secondary ? paddingXSecondary : paddingXDefault);
  }, [secondary, mainTextDefault]);


  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);
  return (
    <Flex
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      borderRadius="16px"
      display="flex"
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      right="30px"
      px={{
        sm: paddingX,
        md: "30px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top="18px"
      w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 275px)" }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
      >
        <Box mb={{ sm: "8px", md: "0px" }}>
          <Text color={mainText} fontSize='xl' fontWeight='800'>Dashboard</Text>
        </Box>
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <AdminNavbarLinks
            onOpen={onOpen}
            logoText='Menu'
            secondary={secondary}
            fixed={fixed}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

import { Button, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { IconBox } from "components/Icons/IconBox";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SidebarVariant } from "types/types";

interface Props {
  path: string;
  label: string;
  icon: JSX.Element;
  sidebarVariant: SidebarVariant;
}

export const CustomNavLink = (props: Props) => {
  const { path, label, icon, sidebarVariant } = props;

  const variantChange = "0.2s linear";

  const location = useLocation();
  const isActive = location.pathname.includes(path);

  const [activeBg, setActiveBg] = useState('');
  const [inactiveBg, setInactiveBg] = useState('');
  const [activeColor, setActiveColor] = useState('');
  const [inactiveColor, setInctiveColor] = useState('');
  const [sidebarActiveShadow, setSidebarActiveShadow] = useState('');

  const transparentActiveBg = useColorModeValue("white", "gray.700");
  const transparentInactiveBg = useColorModeValue("white", "gray.700");
  const transparentActiveColor = useColorModeValue("gray.700", "white");
  const transparentInactiveColor = useColorModeValue("gray.400", "gray.400");
  const transparentSidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";

  const opaqueActiveBg = "transparent";
  const opaqueInactiveBg = useColorModeValue("gray.100", "gray.600");
  const opaqueActiveColor = useColorModeValue("gray.700", "white");
  const opaqueInactiveColor = useColorModeValue("gray.400", "gray.400");
  const opaqueSidebarActiveShadow = "none";

  useEffect(() => {
    if (sidebarVariant === "opaque") {
      setActiveBg(opaqueActiveBg);
      setInactiveBg(opaqueInactiveBg);
      setActiveColor(opaqueActiveColor);
      setInctiveColor(opaqueInactiveColor);
      setSidebarActiveShadow(opaqueSidebarActiveShadow);
    } else {
      setActiveBg(transparentActiveBg);
      setInactiveBg(transparentInactiveBg);
      setActiveColor(transparentActiveColor);
      setInctiveColor(transparentInactiveColor);
      setSidebarActiveShadow(transparentSidebarActiveShadow);
    }
  }, [
    sidebarVariant,
    transparentActiveBg,
    transparentInactiveBg,
    transparentActiveColor,
    transparentInactiveColor,
    opaqueInactiveBg,
    opaqueActiveColor,
    opaqueInactiveColor
  ]);

  return (
    <NavLink to={path}>
      <Button
        boxSize="initial"
        justifyContent="flex-start"
        alignItems="center"
        boxShadow={isActive ? sidebarActiveShadow : undefined}
        bg={isActive ? activeBg : 'transparent'}
        transition={variantChange}
        mb={{ xl: "12px" }}
        mx={{ xl: "auto" }}
        ps={{ sm: "10px", xl: "16px" }}
        py="12px" borderRadius="15px"
        // _hover="none"
        w="100%"
        _active={{ bg: "inherit", transform: "none", borderColor: "transparent" }}
        _focus={{ boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)" }}>
        <Flex>
          <IconBox
            bg={isActive ? "teal.300" : inactiveBg}
            color={isActive ? 'white' : 'teal.300'}
            h="30px" w="30px" me="12px"
            transition={variantChange}>
            <Icon>{icon}</Icon>
          </IconBox>
          <Text color={isActive ? activeColor : inactiveColor} my="auto">{label}</Text>
        </Flex>
      </Button>
    </NavLink>
  )
}

import { BellIcon } from "@chakra-ui/icons";
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from "@chakra-ui/react";
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
import { ItemContent } from "components/Menu/ItemContent";
import { SidebarResponsive } from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function HeaderLinks(props) {
  const { onOpen, secondary } = props;

  const [navbarIconColor, setNavbarIconColor] = useState('');
  const [mainTextColor, setMainTextColor] = useState('');

  const mainTextColorDefault = useColorModeValue("gray.300", "gray.200");
  const navbarIconColorDefault = useColorModeValue("gray.500", "gray.200");

  useState(() => {
    setNavbarIconColor(secondary ? "white" : navbarIconColorDefault);
    setMainTextColor(secondary ? "white" : mainTextColorDefault);
  })
  
  return (
    <Flex pe={{ sm: "0px", md: "16px" }} w={{ sm: "100%", md: "auto" }} alignItems="center" flexDirection="row">
      <NavLink to="#">
        <Button ms="0px" px="0px" me={{ sm: "2px", md: "16px" }} color={mainTextColor} variant="transparent-with-icon" leftIcon={<ProfileIcon color={navbarIconColor} w="22px" h="22px" me="0px" />}>
          <Text display={{ sm: "none", md: "flex" }}>Sign Out</Text>
        </Button>
      </NavLink>
      <SidebarResponsive />
      <SettingsIcon cursor="pointer" ms={{ base: "16px", xl: "0px" }} me="16px" onClick={onOpen} color={navbarIconColor} w="18px" h="18px" />
      <Menu>
        <MenuButton>
          <BellIcon color={navbarIconColor} w="18px" h="18px" />
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent time="13 minutes ago" info="New mapping available!" boldInfo="payment service"/>
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent time="2 days ago" info="New mapping available!" boldInfo="payment service" />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent time="3 days ago" info="New mapping available!" boldInfo="statistics service" />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  logoText: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};

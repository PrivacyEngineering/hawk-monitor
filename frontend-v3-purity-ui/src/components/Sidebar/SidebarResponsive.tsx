import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Link, Stack, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { DocumentIcon, HomeIcon } from "components/Icons/Icons";
import { Separator } from "components/Separator/Separator";
import { CustomNavLink } from "./CustomNavLink";

const Brand = () => {
  return (
    <Box pt={"35px"} mb="8px">
      <Link href={`${process.env.PUBLIC_URL}/#/`} target="_blank" display="flex" lineHeight="100%" mb="30px" fontWeight="bold" justifyContent="center" alignItems="center" fontSize="11px">
        <Text fontSize="md" mt="3px">HAWK</Text>
      </Link>
      <Separator></Separator>
    </Box>
  )
};

export function SidebarResponsive() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hamburgerColor = useColorModeValue("gray.500", "gray.200");

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <HamburgerIcon color={hamburgerColor} w="18px" h="18px" onClick={onOpen} />
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent w="250px" maxW="250px" ms={{ sm: "16px" }} my={{ sm: "16px" }} borderRadius="16px">
          <DrawerCloseButton _focus={{ boxShadow: "none" }} _hover={{ boxShadow: "none" }} />
          <DrawerBody maxW="250px" px="1rem">
            <Box maxW="100%" h="100vh">
              <Brand />
              <Stack direction="column" mb="40px">
                <Box>
                  <CustomNavLink path='fields' label='Fields' icon={<DocumentIcon />} sidebarVariant={'opaque'} />
                  <CustomNavLink path='mappings' label='Mappings' icon={<HomeIcon />} sidebarVariant={'opaque'} />
                </Box>
              </Stack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

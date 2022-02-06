import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, Flex, Switch, Text, useColorMode, } from "@chakra-ui/react";
import { Separator } from "components/Separator/Separator";
import { useState } from "react";

interface Props {
  isChecked: boolean,
  isOpen: boolean,
  onClose: () => void,
  onOpaque: () => void,
  onSwitch: (value: boolean) => void,
  onTransparent: () => void,
};

export default function Configurator(props: Props) {
  const { isChecked, isOpen, onClose, onOpaque, onSwitch, onTransparent } = props;
  
  const [switched, setSwitched] = useState(isChecked);
  const handleSwitch = () => {
    onSwitch(!switched);
    setSwitched(s => !s);
  }

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <DrawerContent>
        <DrawerHeader pt="24px" px="24px">
          <DrawerCloseButton />
          <Text fontSize="xl" fontWeight="bold" mt="16px">UI Configurator</Text>
          <Text fontSize="md" mb="16px">See your dashboard options</Text>
          <Separator />
        </DrawerHeader>
        <DrawerBody w="340px" ps="24px" pe="40px">
          <Flex flexDirection="column">
            <Box>
              <Text fontSize="md" fontWeight="600">Sidenav Type</Text>
              <Text fontSize="sm" mb="16px">Choose between different Sidenav types</Text>
              <Flex>
                <Button w="50%" p="8px 32px" me="8px" colorScheme="teal" borderColor="teal.300" color="teal.300" variant="outline" fontSize="xs" onClick={onTransparent}>Transparent</Button>
                <Button type="submit" bg="teal.300" w="50%" p="8px 32px" mb={5} color="white" fontSize="xs" onClick={onOpaque}>Opaque</Button>
              </Flex>
            </Box>
            <Box justifyContent="space-between" display="flex" mb="16px">
              <Text fontSize="md" fontWeight="600" mb="4px">Navbar Fixed</Text>
              <Switch colorScheme="teal" isChecked={switched} onChange={handleSwitch} />
            </Box>
            <Flex justifyContent="space-between" alignItems="center" mb="24px">
              <Text fontSize="md" fontWeight="600" mb="4px">Dark/Light</Text>
              <Button onClick={toggleColorMode}>Toggle {colorMode === "light" ? "Dark" : "Light"}</Button>
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

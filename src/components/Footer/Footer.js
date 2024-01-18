import { Flex, Link, List, ListItem } from "@chakra-ui/react";

export default function Footer(props) {
  return (
    <Flex
      flexDirection={{ base: "column", xl: "row", }}
      alignItems={{ base: "center", xl: "start", }}
      justifyContent="space-between"
      px="30px"
      pb="20px"
    >
      <List display="flex">
        <ListItem me={{ base: "20px", md: "44px", }}>
          <Link color="gray.400" href="https://github.com/PrivacyEngineering/">TUB PrivacyEngineering</Link>
        </ListItem>
        <ListItem me={{ base: "20px", md: "44px", }}>
          <Link color="gray.400" href="https://github.com/PrivacyEngineering/hawk-monitor.git">Github</Link>
        </ListItem>
      </List>
    </Flex>
  );
}

import { Box, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Separator } from "../Separator/Separator";

interface Props {
  logoText: string;
  sidebarVariant: string;
}

export const SidebarTS = (props: Props) => {
  // to check for active links and opened collapses
  let location = useLocation();

  const { logoText, sidebarVariant } = props;
  const [sidebarBg, setSidebarBg] = useState('');
  const [sidebarRadius, setSidebarRadius] = useState('');
  const [sidebarMargins, setSidebarMargins] = useState('');

  const opaqueSidebarBg = useColorModeValue("white", "gray.700");
  useEffect(() => {
    if (sidebarVariant === "opaque") {
      setSidebarBg(opaqueSidebarBg);
      setSidebarRadius("16px");
      setSidebarMargins("16px 0px 16px 16px");
    } else {
      setSidebarBg('none');
      setSidebarRadius('0px');
      setSidebarMargins('0px');
    }
  }, [sidebarVariant]);

  return (
    <Box display={{ sm: "none", xl: "block" }} position="fixed">
      <Box bg={sidebarBg} transition="0.2s linear" w="260px" maxW="260px" ms={{ sm: "16px" }} my={{ sm: "16px" }} h="calc(100vh - 32px)" ps="20px" pe="20px" m={sidebarMargins} borderRadius={sidebarRadius} >
        <Box pt="25px" mb="12px">
          <Link href={process.env.PUBLIC_URL} target="_blank" display="flex" lineHeight="100%" mb="30px" fontWeight="bold" justifyContent="center" alignItems="center" fontSize="11px">
            <Text fontSize="md" mt="3px">{logoText}</Text>
          </Link>
          <Separator />
        </Box>
        <Stack direction="column" mb="40px">
          {/* <Box>{createLinks(routes)}</Box> */}
        </Stack>
      </Box>
    </Box>
  )
}

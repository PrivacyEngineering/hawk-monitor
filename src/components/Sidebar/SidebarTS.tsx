import { Box, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { DocumentIcon } from "components/Icons/Icons";
import { useEffect, useState } from "react";
import { SidebarVariant } from "types/types";
import { Separator } from "../Separator/Separator";
import { CustomNavLink } from "./CustomNavLink";

interface Props {
  logoText: string;
  sidebarVariant: SidebarVariant;
}

export const SidebarTS = (props: Props) => {
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
  }, [
    sidebarVariant,
    opaqueSidebarBg
  ]);

  return (
    <Box display={{ base: "none", xl: "block" }} position="fixed">
      <Box bg={sidebarBg} transition="0.2s linear" w="260px" maxW="260px" ms={{ sm: "16px" }} my={{ sm: "16px" }} h="calc(100vh - 32px)" ps="20px" pe="20px" m={sidebarMargins} borderRadius={sidebarRadius} >
        <Box pt="25px" mb="12px">
          <Link href={process.env.PUBLIC_URL} target="_blank" display="flex" lineHeight="100%" mb="30px" fontWeight="bold" justifyContent="center" alignItems="center" fontSize="11px">
            <Text fontSize="md" mt="3px">{logoText}</Text>
          </Link>
          <Separator />
        </Box>
        <Stack direction="column" mb="40px">
          <CustomNavLink path='legalBases' label='Legal Bases' icon={<DocumentIcon />} sidebarVariant={sidebarVariant} />
          <CustomNavLink path='fields' label='Fields' icon={<DocumentIcon />} sidebarVariant={sidebarVariant} />
          <CustomNavLink path='mappings' label='Mappings' icon={<DocumentIcon />} sidebarVariant={sidebarVariant} />
          <CustomNavLink path='dlp/jobs' label='DLP Jobs' icon={<DocumentIcon />} sidebarVariant={sidebarVariant} />
        </Stack>
      </Box>
    </Box>
  )
}

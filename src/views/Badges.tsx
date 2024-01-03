import { Badge, BadgeProps, useColorModeValue } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import { LegalBaseExtended } from "types";

export const PersonalBadge = () => {
  const textColor = useColorModeValue('white', 'gray.100');
  return <Badge bg="gray.500" color={textColor} fontSize="14px" p="3px 10px" borderRadius="8px">Personal</Badge>
}

export const SpecialBadge = () => {
  const textColor = useColorModeValue('white', 'gray.100');
  return <Badge bg="red.500" color={textColor} fontSize="14px" p="3px 10px" borderRadius="8px">Special</Badge>
}

export const InfoTypeBadge = (props: { infoType: string } & BadgeProps) => {
  const { infoType } = props;
  const textColor = useColorModeValue('white', 'gray.100');

  return <Badge bg="green.500" color={textColor} fontSize="14px" p="3px 10px" borderRadius="8px">{infoType}</Badge>
}

export const GdprBadge = (props: { reference: string } & BadgeProps) => {
  const { reference } = props;
  const textColor = useColorModeValue('white', 'gray.100');

  const legalBases = useSelector<RootState, LegalBaseExtended[]>(state => state.legalBases);
  const legalBaseExtended = legalBases.find(x => x.reference === reference)!;
  return <Badge bg="blue.500" color={textColor} fontSize="14px" p="3px 10px" borderRadius="8px" textTransform={"none"}>{legalBaseExtended.regulation} Art. {legalBaseExtended.article} {" " + legalBaseExtended.paragraph.toLowerCase()}</Badge>
}

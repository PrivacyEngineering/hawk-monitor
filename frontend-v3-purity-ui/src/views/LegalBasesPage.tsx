import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { Card } from "components/StyledComponent";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { LegalBaseExtended } from "../types"

export const LegalBasesPage = () => {
  const legalBases = useSelector<RootState, LegalBaseExtended[]>(state => state.legalBases);
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card>
        <Flex direction={"column"} pb="12px">
          <Text color={textColor} fontSize="xl" fontWeight="bold" pb="6px">Legal bases</Text>
          <Text color={textColor}>Legislation that refers to the reasons of personal data disclosure</Text>
        </Flex>

        <Table>
          <Thead>
            <Tr>
              {['Regulation', 'Article', 'Paragraph', 'Description']
                .map((item, index) =>
                  <Th color="gray.400" key={index}>{item}</Th>
                )}
            </Tr>
          </Thead>
          <Tbody>
            {legalBases
              .sort((a, b) => a.article.localeCompare(b.article))
              .map((item, index) =>
                <Tr key={index}>
                  <Td><b>{item.regulation}</b></Td>
                  <Td>Article {item.article}</Td>
                  <Td>{item.paragraph}</Td>
                  <Td>{item.description}</Td>
                </Tr>
              )}
          </Tbody>
        </Table>
      </Card>
    </Flex>
  )
}

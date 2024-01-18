import { Code, Flex, List, ListIcon, ListItem, Table, Tbody, Td, Text, Th, Thead, Tr, VStack, useColorModeValue } from "@chakra-ui/react";
import { fetchDlpFindingsByField, fetchDlpResults } from "actions/dlp";
import { Card } from "components/StyledComponent";
import { useThunkDispatch } from "index";
import React, { useEffect } from "react";
import { FaBox, FaColumns } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "reducers";
import { DlpFinding } from "types/dlp";
import { InfoTypeBadge } from "views/Badges";


export function DlpFindings(props: React.ComponentProps<any>) {
  const params = useParams<{ id: string, fieldId: string }>();
  const idFromParams = params.id;
  const fieldIdFromParams = params.fieldId;
  
  const dispatch = useThunkDispatch();

  useEffect(() => { 
    idFromParams && fetchDlpResults(dispatch, idFromParams);
    fieldIdFromParams && fetchDlpFindingsByField(dispatch, fieldIdFromParams);
  }, [dispatch, fieldIdFromParams, idFromParams])
  const findings = useSelector<RootState, DlpFinding[] | null>(state => idFromParams ? (state.dlpResults[idFromParams]?.findings) : fieldIdFromParams ? (state.dlpFindingsByField[fieldIdFromParams]) : null);


  const textColor = useColorModeValue("gray.700", "white");


  return (
    <>
        <Flex direction="column" pt={{base: "60px", md: "75px"}}>
            <Card>
                <Flex direction={"column"}>
                    <Text fontSize="xl" color={textColor} fontWeight="bold">DLP Findings</Text>
                    <Text color={textColor}>
                      for { idFromParams ? `DLP Result ${idFromParams}` : (fieldIdFromParams ? `Field ${fieldIdFromParams}` : null)}</Text>
                    <Text color={textColor}>
                      
                    </Text>
                </Flex>
                <Flex direction={"column"} width={"100%"}>
                  <VStack spacing='24px' alignItems={"flex-start"}>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th color="gray.400">Info type</Th>
                          <Th color="gray.400">Likelihood</Th>
                          <Th color="gray.400">Occurences</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          findings &&
                          findings.map(finding => (
                            <Tr key={finding.id}>
                              <Td>
                                <InfoTypeBadge infoType={finding.infoType}></InfoTypeBadge>
                              </Td>
                              <Td>{finding.likelihood * 100}%</Td>
                              <Td>
                                <List spacing={3}>
                                  {finding.occurrences.map((occurence, index) => (
                                    <ListItem key={index} fontSize="sm">
                                      <ListIcon as={occurence.type === 'container' ? FaBox : FaColumns} color="yellow.500"/>
                                        in <Code color="yellow.600">{ occurence.type } { occurence.container }</Code> as
                                      <Code>{ occurence.column }</Code>
                                    </ListItem>
                                  ))}
                                </List>
                              </Td>
                            </Tr>
                          ))
                        }
                      </Tbody>
                    </Table>
                  </VStack>
                </Flex>
            </Card>
        </Flex>
    </>
  )
}
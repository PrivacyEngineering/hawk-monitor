import { Flex, Table, Thead, Text, Tr, VStack, useColorModeValue, Tbody, Td, Th, Button } from '@chakra-ui/react';
import { fetchDlpJobs } from 'actions/dlp';
import { Card, CardBody, CardHeader } from "components/StyledComponent";
import { useThunkDispatch } from 'index';
import React, { useEffect } from 'react';
import { BsFolder } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'reducers';
import { DlpJob } from 'types/dlp';

export function DlpJobs(props: React.ComponentProps<any>) {
  const { ...other } = props;

  const navigate = useNavigate();  
  const dispatch = useThunkDispatch();

  useEffect(() => { fetchDlpJobs(dispatch) }, [dispatch]);

  const textColor = useColorModeValue("gray.700", "white");
  const dlpJobs = useSelector<RootState, DlpJob[]>(state => state.dlpJobs);

  return (
      <Flex direction="column" pt={{ base: "60px", md: "75px" }}>
        <Card>
          <CardHeader>
            <Flex direction={"column"} pb="12px">
              <Text fontSize="xl" color={textColor} fontWeight="bold" pb="6px">DLP Jobs</Text>
              <Text color={textColor}>DLP Jobs are cool</Text>
              <Text color={textColor}>yeah text</Text>
            </Flex>
          </CardHeader>

          <CardBody>
            <Flex direction={"column"} width={"100%"}>
              <VStack spacing='24px' alignItems={"flex-start"}>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                  {
                    dlpJobs.map(job => (
                      <Tr key={job.id}>
                        <Td>{job.id}</Td>
                        <Td>{job.status}</Td>
                        <Td>
                          {
                            !!job.results.length &&
                            <Button color='teal.400' size="sm" leftIcon={<BsFolder/>} onClick={() => navigate("/dlp/findings/" + job.results[0])}>Show Findings</Button>
                          }
                        </Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            </VStack>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
    )
}
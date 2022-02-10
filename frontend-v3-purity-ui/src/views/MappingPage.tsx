import { Button, Flex, Grid, GridItem, Select, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, VStack } from "@chakra-ui/react";
import { Card, CardBody, CardHeader } from "components/StyledComponent";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useThunkDispatch } from "..";
import { RootState } from "../reducers";
import { AnyMapping, Field, MappingFieldReference } from "../types";
import { UPDATE_MAPPING_REQUEST, UPDATE_MAPPING_SUCCESS } from "../types/actions/Types";
import { ColInput } from "./ColInput";

export const MappingPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const fields = useSelector<RootState, Field[]>(state => state.fields);
  const mapping = useSelector<RootState, AnyMapping | undefined>(state => state.mappings.find(m => m.id === id)) as AnyMapping;

  const dispatch = useThunkDispatch();
  const navigate = useNavigate();

  const [fieldRefs, setFieldRefs] = useState(mapping.fields || []);
  const deleteFieldRef = (fieldRef: MappingFieldReference) => setFieldRefs([...fieldRefs.filter(x => x !== fieldRef)]);
  const addFieldRef = (fieldId: string) => setFieldRefs([...fieldRefs, { id: fieldId, path: { type: '', value: '' } }]);

  const textColor = useColorModeValue("gray.700", "white");

  const handleSave = () => {
    const mappingToDispatch = { ...mapping, fields: fieldRefs };
    dispatch({ type: UPDATE_MAPPING_REQUEST, mapping: mappingToDispatch });
    // TODO: actual API call
    dispatch({ type: UPDATE_MAPPING_SUCCESS, mapping: mappingToDispatch });
    navigate('/mappings', { replace: true })
  }

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card>
          <CardHeader>
            <Flex direction={"column"}>
              <Text fontSize="xl" color={textColor} fontWeight="bold">Mapping #{mapping.id}</Text>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction={"column"} width={"100%"}>

              <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                <GridItem colSpan={1}>
                  <ColInput label="Service name" mutedText="e.g. my-service" value={mapping.service} isDisabled />
                </GridItem>
                <GridItem colSpan={1}>
                  <ColInput label="Protocol" mutedText="e.g. HTTP" value={mapping.endpoint.protocol} isDisabled />
                </GridItem>
                <GridItem colSpan={1}>
                  <ColInput label="Method" mutedText="e.g. POST" value={mapping.endpoint.method} isDisabled />
                </GridItem>
                <GridItem colSpan={3}>
                  <ColInput label="Path" mutedText="e.g. /api/endpoint" value={mapping.endpoint.path} isDisabled />
                </GridItem>
              </Grid>

              <VStack pt={{ base: "60px", md: "40px" }} spacing='12px' alignItems="flex-start">
                <Text fontSize="lg" color={textColor} fontWeight="bold">Attached fields</Text>
                <Table color={textColor}>
                  <Thead>
                    <Tr>{['ID', 'Path type', 'Path value', 'Actions'].map((item, index) => <Th color="gray.400" key={index}>{item}</Th>)}</Tr>
                  </Thead>
                  <Tbody>
                    {fieldRefs.sort((a, b) => a.id.localeCompare(b.id)).map((item, index) =>
                      <Tr key={index}>
                        <Td><b>{item.id}</b></Td>
                        <Td><ColInput value={item.path.type}></ColInput></Td>
                        <Td><ColInput value={item.path.value}></ColInput></Td>
                        <Td>
                          <Button colorScheme='red' onClick={() => deleteFieldRef(item)}>Delete</Button>
                        </Td>
                      </Tr>)}
                  </Tbody>
                </Table>

                <Select minWidth={"200px"} maxWidth={"300px"} placeholder='Add field' onChange={(e) => addFieldRef(e.target.value)}>
                  {fields.filter(f => !fieldRefs.map(fieldRef => fieldRef.id).includes(f.id)).map(f =>
                    <option key={f.id}>{f.id}</option>)}
                </Select>
                <Button width={"fit-content"} colorScheme='teal' onClick={() => handleSave()}>Save</Button>
              </VStack>
            </Flex>
          </CardBody>

        </Card>
      </Flex>
    </>
  )
}

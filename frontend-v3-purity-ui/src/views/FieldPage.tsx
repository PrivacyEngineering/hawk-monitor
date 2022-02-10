import { Button, Checkbox, Flex, FormControl, FormLabel, Input, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { Card } from "components/StyledComponent";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useThunkDispatch } from "..";
import { RootState } from "../reducers";
import { Field } from "../types";
import { CREATE_FIELD_REQUEST, CREATE_FIELD_SUCCESS, UPDATE_FIELD_REQUEST, UPDATE_FIELD_SUCCESS } from "../types/actions/Types";

export const FieldPage = () => {
  const params = useParams<{ id: string }>();
  const idFromParams = params.id;

  const field = useSelector<RootState, Field | undefined>(state => state.fields.find(f => f.id === idFromParams));
  const dispatch = useThunkDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState(field?.id || '');
  const [description, setDescription] = useState(field?.description || '');
  const [personalData, setPersonalData] = useState(field?.personalData || false);
  const [specialCategoryPersonalData, setSpecialCategoryPersonalData] = useState(field?.specialCategoryPersonalData || false);

  const handleSave = () => {
    const fieldToDispatch = { id, description, personalData, specialCategoryPersonalData };
    dispatch({ type: field ? UPDATE_FIELD_REQUEST : CREATE_FIELD_REQUEST, field: fieldToDispatch });
    // TODO: actual API call
    dispatch({ type: field ? UPDATE_FIELD_SUCCESS : CREATE_FIELD_SUCCESS, field: fieldToDispatch });
    navigate('/fields', { replace: true })
  }

  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card>
        <Flex direction="column" pb="12px">
          <Text fontSize="xl" color={textColor} fontWeight="bold" pb="6px">{field ? `Field ${id}` : `New field ${id}`}</Text>
        </Flex>

        <Flex direction="column" >
          <VStack spacing='12px' alignItems="flex-start">

            <FormControl maxWidth="300px">
              <FormLabel>ID</FormLabel>
              <Input value={id} onChange={e => setId(e.target.value)} isDisabled={Boolean(field)} />
            </FormControl>

            <FormControl maxWidth="500px">
              <FormLabel>Description</FormLabel>
              <Input value={description} onChange={e => setDescription(e.target.value)} />
            </FormControl>

            <FormControl>
              {/* <FormLabel>Description</FormLabel> */}
              <Checkbox colorScheme="teal" isChecked={personalData} onChange={e => setPersonalData(e.target.checked)}>Personal data</Checkbox>
            </FormControl>

            <FormControl>
              {/* <FormLabel>Description</FormLabel> */}
              <Checkbox colorScheme="teal" isChecked={specialCategoryPersonalData} onChange={e => setSpecialCategoryPersonalData(e.target.checked)}>Special category personal data</Checkbox>
            </FormControl>

            <Button width="fit-content" colorScheme='teal' onClick={handleSave}>Save</Button>
          </VStack>
        </Flex>
      </Card>
    </Flex>
  )
}
import { Button, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, VStack } from "@chakra-ui/react";
import { Card, CardBody, CardHeader } from "components/StyledComponent";
import { useState } from "react";
import { BsCheckSquareFill, BsFillTrashFill, BsPencilFill, BsPlusLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useThunkDispatch } from "..";
import { RootState } from "../reducers";
import { Field, NormalizedState } from "../types"
import { DELETE_FIELD_REQUEST, DELETE_FIELD_SUCCESS } from "../types/actions/Types";
import { Link } from "react-router-dom";

export const FieldsPage = () => {
  const fields = useSelector<RootState, Field[]>(state => state.fields);
  const fieldsBeingDeleted = useSelector<RootState, NormalizedState<boolean | undefined>>(state => state.fieldsBeingDeleted);
  const dispatch = useThunkDispatch();
  const navigate = useNavigate();

  const [fieldToDelete, setFieldToDelete] = useState<Field>();
  const handleModalShow = (field: Field) => setFieldToDelete(field);
  const handleModalClose = () => setFieldToDelete(undefined);

  const handleDelete = (fieldToDelete: Field) => {
    if (!fieldsBeingDeleted[fieldToDelete.id]) {
      dispatch({ type: DELETE_FIELD_REQUEST, field: fieldToDelete });
      // TODO: wrap in actual API calls
      dispatch({ type: DELETE_FIELD_SUCCESS, field: fieldToDelete });
    }
    handleModalClose();
  }

  const textColor = useColorModeValue("gray.700", "white");

  return (
    <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card>
          <CardHeader>
            <Flex direction={"column"} pb="12px">
              <Text fontSize="xl" color={textColor} fontWeight="bold" pb="6px">Fields</Text>
              <Text color={textColor}>Fields are meta-structures to enable hassle-free assignment of privacy categories to endpoints.</Text>
              <Text color={textColor}>Assign fields to endpoints and save yourself thinking about data privacy categories for good!</Text>
            </Flex>
          </CardHeader>

          <CardBody>
            <Flex direction={"column"} width={"100%"}>

              <VStack spacing='24px' alignItems={"flex-start"}>
                <Table>
                  <Thead>
                    <Tr>{['ID', 'Description', 'Personal data', 'Special categories personal data', 'Actions'].map((item, index) =>
                      <Th color="gray.400" key={index}>{item}</Th>)}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {fields.sort((a, b) => a.id.localeCompare(b.id)).map((field, index) =>
                      <Tr key={index}>
                        <Td><b>{field.id}</b></Td>
                        <Td>{field.description}</Td>
                        <Td>{field.personalData ? <BsCheckSquareFill /> : '-'}</Td>
                        <Td>{field.specialCategoryPersonalData ? <BsCheckSquareFill /> : '-'}</Td>
                        <Td>
                          <Button color='teal.400' size="sm" onClick={() => navigate(`/fields/${field.id}`, { replace: true })} leftIcon={<BsPencilFill />}>Edit</Button>{' '}
                          {fieldsBeingDeleted[field.id] ?
                            <Button color='red.400' size="sm" disabled leftIcon={<BsFillTrashFill />}>Removing...</Button> :
                            <Button color='red.400' size="sm" onClick={() => handleModalShow(field)} leftIcon={<BsFillTrashFill />}> Remove</Button>}
                        </Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
                <Link to={'new'}>
                  <Button width={"fit-content"} color="teal.400" leftIcon={<BsPlusLg />}>Create Field</Button>
                </Link>
              </VStack>
            </Flex>
          </CardBody>
        </Card>
      </Flex>

      {fieldToDelete &&
        <Modal isOpen={Boolean(fieldToDelete)} onClose={handleModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure to delete the field <b>{fieldToDelete.id}</b>?</ModalBody>
            <ModalFooter>
              <Button color='red.400' mr={3} onClick={() => handleDelete(fieldToDelete)}>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    </>
  )
}

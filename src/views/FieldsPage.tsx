import { Button, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, VStack, Checkbox } from "@chakra-ui/react";
import { Card, CardBody, CardHeader } from "components/StyledComponent";
import {Fragment, useState} from "react";
import { BsFillTrashFill, BsPencilFill, BsPlusLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useThunkDispatch } from "..";
import { RootState } from "../reducers";
import { Field, NormalizedState } from "../types"
import { Link } from "react-router-dom";
import { GdprBadge, PersonalBadge, SpecialBadge } from "./Badges";
import { removeField } from "../actions/fields";

export const FieldsPage = () => {
  const fields = useSelector<RootState, Field[]>(state => state.fields);
  const fieldsBeingDeleted = useSelector<RootState, NormalizedState<boolean | undefined>>(state => state.fieldsBeingDeleted);
  const dispatch = useThunkDispatch();
  const navigate = useNavigate();

  const [fieldToDelete, setFieldToDelete] = useState<Field>();
  const handleModalShow = (field: Field) => setFieldToDelete(field);
  const handleModalClose = () => setFieldToDelete(undefined);

  const handleDelete = (fieldToDelete: Field) => {
    if (!fieldsBeingDeleted[fieldToDelete.name]) {
      removeField(dispatch, fieldToDelete);
    }
    handleModalClose();
  }

  const textColor = useColorModeValue("gray.700", "white");

  return (
    <>
      <Flex direction="column" pt={{ base: "60px", md: "75px" }}>
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
                    <Tr>
                      <Th color="gray.400">ID</Th>
                      <Th color="gray.400">Description</Th>
                      <Th color="gray.400">Consequences<br />of non-disclosure</Th>
                      <Th color="gray.400">Data<br />category</Th>
                      <Th color="gray.400">Contralctual<br />regulation?</Th>
                      <Th color="gray.400">Legal<br />requirement?</Th>
                      <Th color="gray.400">Legal bases</Th>
                      <Th color="gray.400">Obligation<br />to provide?</Th>
                      <Th color="gray.400">Actions</Th>
                      {/* {['ID', 'Description', 'Consequences of non-disclosure ', 'Data category', 'Contractual regulation?', 'Legal requirement?', 'Legal bases', 'Obligation to provide?', 'Actions'].map((item, index) =>
                        <Th color="gray.400" key={index}>{item}</Th>
                      )} */}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {fields.sort((a, b) => a.name.localeCompare(b.name)).map((field, index) =>
                      <Tr key={index}>
                        <Td><b>{field.name}</b></Td>
                        <Td>{field.description}</Td>
                        <Td>{field.consequences || '-'}</Td>
                        <Td>{field.specialCategoryPersonalData ? <SpecialBadge /> : field.personalData ? <PersonalBadge /> : '-'}</Td>
                        <Td><Checkbox colorScheme="teal" isChecked={field.contractualRegulation} /></Td>
                        <Td><Checkbox colorScheme="teal" isChecked={field.legalRequirement} /></Td>
                        <Td>{field.legalBases != null && field.legalBases.length > 0 ? field.legalBases
                          .map(legalBase => <Fragment key={legalBase.reference}><GdprBadge reference={legalBase.reference} />{" "}</Fragment>) : '-'}</Td>
                        <Td><Checkbox colorScheme="teal" isChecked={field.obligationToProvide} /></Td>
                        <Td>
                          <Button color='teal.400' size="sm" onClick={() => navigate(`/fields/${field.name}`)} leftIcon={<BsPencilFill />}>Edit</Button>{' '}
                          {fieldsBeingDeleted[field.name] ?
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
            <ModalBody>Are you sure to delete the field <b>{fieldToDelete.name}</b>?</ModalBody>
            <ModalFooter>
              <Button color='red.400' mr={3} onClick={() => handleDelete(fieldToDelete)}>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    </>
  )
}

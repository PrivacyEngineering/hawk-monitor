import {
    Box,
    Button,
    Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody,
    Td,
    Text, Th, Thead,
    Tr,
    useColorModeValue
} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import {Card, CardBody, CardHeader} from "components/StyledComponent";
import {RootState} from "reducers";
import {AnyMapping, Field, Mapping, MappingFieldReference, TableRowProps} from "types";
import {GenericTable} from "./GenericTable";
import {BsFillTrashFill, BsPencilFill, BsPlusLg} from "react-icons/bs";
import {PersonalBadge, SpecialBadge} from "./Badges";
import {useThunkDispatch} from "../index";
import {fetchUnmappedEndpoints, removeMapping} from "../actions/mappings";

export const MappingsPage = () => {
    const dispatch = useThunkDispatch();
    useEffect(() => fetchUnmappedEndpoints(dispatch), [dispatch])
    const mappingsBeingDeleted = useSelector<RootState, Array<boolean>>(state => state.mappingsBeingDeleted);
    const mappings = useSelector<RootState, AnyMapping[]>(state => state.mappings) as Mapping[];
    const mappingsSortedById = mappings.sort((a, b) => a.id - b.id);
    const unmappedEndpoints = useSelector<RootState, String[]>(state => state.unmappedEndpoints) as String[];

    const textColor = useColorModeValue("gray.700", "white");
    const scrollbarColor = useColorModeValue("rgb(230,230,230)", "lightgray");

    const [mappingToDelete, setMappingToDelete] = useState<Mapping>();
    const handleModalShow = (mapping: Mapping) => setMappingToDelete(mapping);
    const handleModalClose = () => setMappingToDelete(undefined);


    const handleDelete = (mappingToDelete: Mapping) => {
        if (!mappingsBeingDeleted[mappingToDelete.id]) {
            removeMapping(dispatch, mappingToDelete);
        }
        handleModalClose();
    }

    return (
        <>
            <Flex direction="column" pt={{base: "60px", md: "75px"}}>
                <Card mx={{sm: 0}}>
                    <CardHeader>
                        <Flex direction={"column"} pb="6px">
                            <Text fontSize="xl" color={textColor} fontWeight="bold"
                                  pb="6px">Mapped Endpoints</Text>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Box overflowX="auto" width="100%" css={{
                            '&::-webkit-scrollbar': {width: '2px'},
                            '&::-webkit-scrollbar-thumb': {background: scrollbarColor, borderRadius: '10px'}
                        }}>
                            <Table color={textColor}>
                                <Thead>
                                    <Tr>
                                        <Th color="gray.400">ID</Th>
                                        <Th color="gray.400">Endpoint ID</Th>
                                        <Th color="gray.400">Fields</Th>
                                        <Th color="gray.400">Data Categories</Th>
                                        <Th color="gray.400">Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {mappingsSortedById.map((item, index) =>
                                        <tr key={index}>
                                            <Td><Text fontSize="md" color={textColor}>{item.id}</Text></Td>
                                            <Td>{item.endpointId}</Td>
                                            <Td>{item.fields.length ? item.fields.map(f => f.field).join(', ') : '-'}</Td>
                                            <Td><InferredDataCategories fieldRefs={item.fields}/></Td>
                                            <Td>
                                                <Link to={"update/" + item.id.toString()}>
                                                    <Button color='teal.400' size="sm" leftIcon={<BsPencilFill/>}>Edit
                                                        fields</Button>{' '}
                                                </Link>
                                                {mappingsBeingDeleted[item.id] ?
                                                    <Button color='red.400' size="sm" disabled
                                                            leftIcon={<BsFillTrashFill/>}>Removing...</Button> :
                                                    <Button color='red.400' size="sm" disabled={item.fields.length > 0}
                                                            onClick={() => handleModalShow(item)}
                                                            leftIcon={<BsFillTrashFill/>}> Remove</Button>}
                                            </Td>
                                        </tr>
                                    )}
                                </Tbody>
                            </Table>
                        </Box>
                    </CardBody>
                </Card>
                <Card mt="22px">
                    <GenericTable<String>
                        columnLabels={['Endpoint ID', 'Actions']}
                        descriptionLine1="The following API endpoints were detected in your system, but mappings for them are not yet created."
                        descriptionLine2="Please add the missing mappings here and retroactively map your system's API endpoint calls to particular privacy-related data categories."
                        header="Unmapped Endpoints"
                        items={unmappedEndpoints}
                        row={UnmappedEndpointsTableRow}/>
                </Card>
            </Flex>

            {mappingToDelete &&
                <Modal isOpen={Boolean(mappingToDelete)} onClose={handleModalClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Confirmation</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>Are you sure to delete the mapping <b>{mappingToDelete.id}</b>?</ModalBody>
                        <ModalFooter>
                            <Button color='red.400' mr={3} onClick={() => handleDelete(mappingToDelete)}>Delete</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            }
        </>
    );
}

const InferredDataCategories = (props: { fieldRefs: MappingFieldReference[] }) => {
    const {fieldRefs} = props;
    const fields = useSelector<RootState, Field[]>(state => state.fields);
    const [personal, setPersonal] = useState(false);
    const [special, setSpecial] = useState(false);

    useEffect(() => {
        const mappedFields = fields.filter(f => fieldRefs.some(ref => ref.field === f.name));
        setPersonal(mappedFields.map(f => f.personalData).reduce((res, cur) => res || cur, false));
        setSpecial(mappedFields.map(f => f.specialCategoryPersonalData).reduce((res, cur) => res || cur, false));
    }, [fieldRefs, fields]);

    return (
        <>
            {special ? <SpecialBadge/> : personal ? <PersonalBadge/> : '-'}
        </>
    )
}

const UnmappedEndpointsTableRow = (props: TableRowProps<String>) => {
    const {item} = props;

    return (
        <Tr>
            <Td>{item}</Td>
            <Td>
                <Link to={{pathname: "new/", search: "endpoint=" + encodeURI(item.toString())}}>
                    <Button color='teal.400' size="sm" leftIcon={<BsPlusLg/>}>Attach fields</Button>{' '}
                </Link>
            </Td>
        </Tr>
    )
}

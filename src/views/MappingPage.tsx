import {
    Box,
    Button,
    Flex,
    Grid,
    Select,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import {Card} from "components/StyledComponent";
import {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useThunkDispatch} from "..";
import {RootState} from "../reducers";
import {AnyMapping, Field, MappingFieldReference, TableRowPropsWithIndex} from "../types";
import {UPDATE_MAPPING_REQUEST, UPDATE_MAPPING_SUCCESS} from "../types/actions/Types";
import {ColInput} from "./ColInput";

export const MappingPage = () => {
    const params = useParams<{ id: string }>();
    const id = params.id;
    const fields = useSelector<RootState, Field[]>(state => state.fields);
    const mapping = useSelector<RootState, AnyMapping | undefined>(state => state.mappings.find(m => m.id === id)) as AnyMapping;

    const dispatch = useThunkDispatch();
    const navigate = useNavigate();

    const [fieldRefs, setFieldRefs] = useState(mapping.fields || []);
    const deleteFieldRef = (fieldRef: MappingFieldReference) => setFieldRefs([...fieldRefs.filter(x => x !== fieldRef)]);
    const addFieldRef = (fieldId: string) => setFieldRefs([...fieldRefs, {
        id: fieldId,
        path: {phase: 'X', namespace: 'X', type: 'X', value: 'X'}
    }]);

    const textColor = useColorModeValue("gray.700", "white");

    const handleSave = () => {
        const mappingToDispatch = {...mapping, fields: fieldRefs};
        dispatch({type: UPDATE_MAPPING_REQUEST, mapping: mappingToDispatch});
        // TODO: actual API call
        dispatch({type: UPDATE_MAPPING_SUCCESS, mapping: mappingToDispatch});
        navigate('/mappings')
    }

    return (
        <Flex direction="column" pt={{base: "60px", md: "75px"}}>
            <Card>
                <Flex direction={"column"}>
                    <Text fontSize="xl" color={textColor} fontWeight="bold">Mapping #{mapping.id}</Text>
                </Flex>
                <Flex direction={"column"} width={"100%"}>
                    <Grid templateColumns='repeat(12, 1fr)' gap={4}>
                        <Box gridColumn={{base: "span 12", sm: "span 6", md: "span 12"}}>
                            <ColInput label="Endpoint ID" mutedText="" value={mapping.endpointId} isDisabled/>
                        </Box>
                    </Grid>

                    <VStack pt={{base: "60px", md: "40px"}} spacing='12px' alignItems="flex-start">
                        <Text fontSize="lg" color={textColor} fontWeight="bold">Attached fields</Text>
                        <Table color={textColor}>
                            <Thead>
                                <Tr>{['ID', 'Field', 'Phase', 'Namespace', 'Format', 'Path', 'Actions'].map((item, index) => <Th
                                    color="gray.400" key={index}>{item}</Th>)}</Tr>
                            </Thead>
                            <Tbody>
                                {fieldRefs.sort((a, b) => a.id.localeCompare(b.id)).map((item, index) =>
                                    <Tr key={index}>
                                        <Td><b>{index}</b></Td>
                                        <Td><b>{item.id}</b></Td>
                                        <MappingFieldInput index={index} item={item}/>
                                        <Td>
                                            <Button colorScheme='red'
                                                    onClick={() => deleteFieldRef(item)}>Delete</Button>
                                        </Td>
                                    </Tr>)}
                            </Tbody>
                        </Table>

                        <Select minWidth={"200px"} maxWidth={"300px"} placeholder='Add field'
                                onChange={(e) => addFieldRef(e.target.value)}>
                            {fields.map(f =>
                                <option key={f.id}>{f.id}</option>)}
                        </Select>
                        <Button width={"fit-content"} colorScheme='teal' onClick={() => handleSave()}>Save</Button>
                    </VStack>
                </Flex>

            </Card>
        </Flex>
    )
}

const MappingFieldInput = (props: TableRowPropsWithIndex<MappingFieldReference>) => {
    const {index, item} = props;

    const usageFields = [
        {
            phase: "REQUEST",
            namespace: "body",
            format: "json",
            path: "$.id"
        },
        {
            phase: "REQUEST",
            namespace: "body",
            format: "json",
            path: "$.name"
        },
        {
            phase: "RESPONSE",
            namespace: "body",
            format: "json",
            path: "$.id"
        },
        {
            phase: "RESPONSE",
            namespace: "body",
            format: "json",
            path: "$.name"
        }
    ];
    const manual = () => {
        if (usageFields.length === 0) return true;
        return !(item.path.type === 'X' && item.path.value === 'X' && item.path.namespace === 'X' && item.path.phase === 'X');
    }
    const applyUsageFieldSelect = (usageField: string) => {
        console.log("select " + index + " - " + usageField);
        let usage = usageFields.find(u => (u.phase + " - " + u.namespace + " - " + u.format + " - " + u.path) === usageField)
        if (usage != null) {
            item.path.phase = usage.phase;
            item.path.namespace = usage.namespace;
            item.path.type = usage.format;
            item.path.value = usage.path;
        }
    }

    return (
        <>
            <Td colSpan={4} hidden={manual()}>
                <Select
                        onChange={((e) => applyUsageFieldSelect(e.target.value))}>
                    {usageFields.map((f, i) => <option
                        key={i}>{f.phase} - {f.namespace} - {f.format} - {f.path}</option>
                    )}
                </Select>
            </Td>
            <Td hidden={!manual()}><ColInput value={item.path.phase}></ColInput></Td>
            <Td hidden={!manual()}><ColInput value={item.path.namespace}></ColInput></Td>
            <Td hidden={!manual()}><ColInput value={item.path.type}></ColInput></Td>
            <Td hidden={!manual()}><ColInput value={item.path.value}></ColInput></Td>
        </>
    )
}

import {
    Button,
    Flex,
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
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useThunkDispatch} from "..";
import {RootState} from "../reducers";
import {AnyMapping, Field, GroupedUsageField, Mapping, MappingFieldReference} from "../types";
import {ColInput} from "./ColInput";
import {createMapping, fetchMappingFieldSuggestions, fetchMappings, updateMapping} from "../actions/mappings";

export const MappingPage = () => {
    // const { search } = useLocation();
    const [searchParams] = useSearchParams();
    const params = useParams<{ id: string }>();
    const id = Number(params.id);
    const dispatch = useThunkDispatch();
    const navigate = useNavigate();
    const endpoint = searchParams.get("endpoint") || undefined;
    const fields = useSelector<RootState, Field[]>(state => state.fields);
    const mapping = useSelector<RootState, Mapping | AnyMapping>(state => state.mappings.find(m => m.id === id) || {
        endpointId: endpoint,
        fields: []
    } as AnyMapping);
    const suggestionsRequested = useSelector<RootState, boolean>(state => state.requestedFieldSuggestions.get(mapping.endpointId) || false);
    useEffect(() => {
        if(!suggestionsRequested) {
            fetchMappingFieldSuggestions(dispatch, mapping.endpointId);
        }
    }, [dispatch, mapping, suggestionsRequested]);
    const fieldSuggestions = useSelector<RootState, GroupedUsageField[]>(state => state.mappingFieldSuggestions.get(mapping.endpointId) || []);

    const [fieldRefs, setFieldRefs] = useState(mapping !== undefined ? mapping.fields || [] : []);
    const deleteFieldRef = (fieldRef: MappingFieldReference) => setFieldRefs([...fieldRefs.filter(x => x !== fieldRef)]);
    const addFieldRef = (fieldId: string) => {
        let firstSuggestion = fieldSuggestions[0] || {phase: '', namespace: '', format: '', path: ''};
        setFieldRefs([...fieldRefs, {
            field: fieldId,
            phase: firstSuggestion.phase,
            namespace: firstSuggestion.namespace,
            format: firstSuggestion.format,
            path: firstSuggestion.path
        }]);
    }
    const [manualField, setManualField] = useState(new Array<boolean>());
    const isManual = (index: number) => {
        let field = fieldRefs[index];
        if (fieldSuggestions.find(suggestion => suggestionSelected(suggestion, field)) === undefined) return true;
        return manualField[index] || fieldSuggestions.length === 0;
    };
    const selectedSuggestionIndex = (field: MappingFieldReference) => {
        return fieldSuggestions.findIndex(suggestion => suggestionSelected(suggestion, field));
    }
    const suggestionSelected = (suggestion: GroupedUsageField, field: MappingFieldReference) => {
        return suggestion.phase === field.phase
            && suggestion.namespace === field.namespace
            && suggestion.format === field.format
            && suggestion.path === field.path;
    }
    const switchManualField = (index: number) => {
        let copiedManualFieldRefs = [...manualField];
        let currentValue = copiedManualFieldRefs[index];
        if (currentValue) {
            let field = fieldRefs[index];
            if (fieldSuggestions.find(suggestion => suggestionSelected(suggestion, field)) === undefined) {
                selectSuggestion(index, 0);
            }
        }

        copiedManualFieldRefs[index] = !copiedManualFieldRefs[index];
        setManualField(copiedManualFieldRefs);
    }
    const selectSuggestion = (fieldIndex: number, suggestionIndex: number) => {
        let suggestion = fieldSuggestions[suggestionIndex];
        let copiedFieldRefs = [...fieldRefs];
        copiedFieldRefs[fieldIndex] = {
            id: copiedFieldRefs[fieldIndex].id,
            field: copiedFieldRefs[fieldIndex].field,
            phase: suggestion.phase,
            namespace: suggestion.namespace,
            format: suggestion.format,
            path: suggestion.path
        };
        setFieldRefs(copiedFieldRefs);
    };
    const setPhase = (index: number, value: string) => {
        let copiedFieldRefs = [...fieldRefs];
        copiedFieldRefs[index].phase = value;
        setFieldRefs(copiedFieldRefs);
    }
    const setNamespace = (index: number, value: string) => {
        let copiedFieldRefs = [...fieldRefs];
        copiedFieldRefs[index].namespace = value;
        setFieldRefs(copiedFieldRefs);
    }
    const setFormat = (index: number, value: string) => {
        let copiedFieldRefs = [...fieldRefs];
        copiedFieldRefs[index].format = value;
        setFieldRefs(copiedFieldRefs);
    }
    const setPath = (index: number, value: string) => {
        let copiedFieldRefs = [...fieldRefs];
        copiedFieldRefs[index].path = value;
        setFieldRefs(copiedFieldRefs);
    }

    const textColor = useColorModeValue("gray.700", "white");

    const checkSave = () => {
        return fieldRefs.find(field => fieldRefs.filter(field2 =>
            field.field === field2.field &&
            field.phase === field2.phase &&
            field.namespace === field2.namespace &&
            field.format === field2.format &&
            field.path === field2.path
        ).length > 1) === undefined;
    }

    const handleSave = () => {
        if (endpoint !== undefined) {
            createMapping(dispatch, {endpointId: endpoint, fields: fieldRefs}, () => fetchMappings(dispatch));
        } else {
            updateMapping(dispatch, {...mapping as Mapping, fields: fieldRefs});
        }
        navigate('/mappings')
    }

    return (
        <Flex direction="column" pt={{base: "60px", md: "75px"}}>
            <Card>
                <Flex direction={"column"}>
                    <Text fontSize="xl" color={textColor} fontWeight="bold">Mapping {mapping.endpointId}</Text>
                </Flex>
                <Flex direction={"column"} width={"100%"}>
                    <VStack pt={{base: "60px", md: "40px"}} spacing='12px' alignItems="flex-start">
                        <Text fontSize="lg" color={textColor} fontWeight="bold">Attached fields</Text>
                        <Table color={textColor}>
                            <Thead>
                                <Tr>{['ID', 'Field', 'Phase', 'Namespace', 'Format', 'Path', 'Actions'].map((item, index) =>
                                    <Th
                                        color="gray.400" key={index}>{item}</Th>)}</Tr>
                            </Thead>
                            <Tbody>
                                {fieldRefs.sort((a, b) => a.field.localeCompare(b.field)).map((item, index) =>
                                    <Tr key={index}>
                                        <Td><b>{item.id}</b></Td>
                                        <Td><b>{item.field}</b></Td>
                                        {isManual(index) ?
                                            <>
                                                <Td><ColInput value={item.phase}
                                                              onChange={value => setPhase(index, value.toString())}/></Td>
                                                <Td><ColInput value={item.namespace}
                                                              onChange={value => setNamespace(index, value.toString())}/></Td>
                                                <Td><ColInput value={item.format}
                                                              onChange={value => setFormat(index, value.toString())}/></Td>
                                                <Td><ColInput value={item.path}
                                                              onChange={value => setPath(index, value.toString())}/></Td>
                                            </> :
                                            <Td colSpan={4}>
                                                <Select width="100%" position="relative" whiteSpace="nowrap"
                                                        value={selectedSuggestionIndex(item)}
                                                        onChange={(e) => selectSuggestion(index, Number(e.target.value))}>
                                                    {fieldSuggestions.map((suggestion, index) =>
                                                        <option key={index}
                                                                value={index}>{suggestion.phase} - {suggestion.namespace} - {suggestion.format} - {suggestion.path}</option>)}
                                                </Select>
                                            </Td>
                                        }
                                        <Td>
                                            {fieldSuggestions.length !== 0 ?
                                                (<><Button colorScheme='blue'
                                                           onClick={() => switchManualField(index)}>{isManual(index) ? 'Automatic' : 'Manual'}</Button>{' '}</>)
                                                : <></>
                                            }
                                            <Button colorScheme='red'
                                                    onClick={() => deleteFieldRef(item)}>Delete</Button>
                                        </Td>
                                    </Tr>)}
                            </Tbody>
                        </Table>

                        <Select value="Add field" minWidth={"200px"} maxWidth={"300px"}
                                onChange={(e) => {
                                    if (e.target.value !== "Add field") addFieldRef(e.target.value);
                                }}>
                            <option>Add field</option>
                            {fields.map(f =>
                                <option key={f.name}>{f.name}</option>)}
                        </Select>
                        <Button width={"fit-content"} colorScheme='teal' disabled={!checkSave()}
                                onClick={() => handleSave()}>Save</Button>
                    </VStack>
                </Flex>

            </Card>
        </Flex>
    )
}

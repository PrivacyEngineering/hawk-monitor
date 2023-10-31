import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
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
import {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useThunkDispatch} from "..";
import {RootState} from "../reducers";
import {AnyMapping, Field, GroupedUsageField, Mapping, MappingFieldReference, MappingStorage, Purpose} from "../types";
import {ColInput} from "./ColInput";
import {createMapping, fetchMappingFieldSuggestions, fetchMappings, updateMapping} from "../actions/mappings";
import purposes from '../assets/purposes.json';


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
        fields: [],
        purposes: [],
        legitimateInterests: [],
        recipients: [],
        storage: [],
    } as AnyMapping);
    const suggestionsRequested = useSelector<RootState, boolean>(state => state.requestedFieldSuggestions.get(mapping.endpointId) || false);
    useEffect(() => {
        if(!suggestionsRequested) {
            fetchMappingFieldSuggestions(dispatch, mapping.endpointId);
        }
    }, [dispatch, mapping, suggestionsRequested]);
    const fieldSuggestions = useSelector<RootState, GroupedUsageField[]>(state => state.mappingFieldSuggestions.get(mapping.endpointId) || []);


    const purposeItems = useMemo(() => {
        return purposes.map(purpose => {
            return {
                label: purpose["@id"].split("#")[1],
                value: purpose["http://www.w3.org/2004/02/skos/core#definition"]?.at(0)?.["@value"],
                domain: purpose["https://w3id.org/dpv#hasDomain"]?.at(0)?.["@id"]
            }
        }).filter(purpose => purpose.value !== undefined && !purpose.domain);
    }, [])


    const [fieldRefs, setFieldRefs] = useState<MappingFieldReference[]>([]);
    const [purposeRefs, setPurposeRefs] = useState<Purpose[]>([]);

    useEffect(() => {
        setFieldRefs(mapping !== undefined ? mapping.fields || [] : []);
        setPurposeRefs(mapping !== undefined ? mapping.purposes || [] : []);
        setLegitimateInterests(mapping !== undefined ? mapping.legitimateInterests || [] : []);
        setRecipients(mapping !== undefined ? mapping.recipients || [] : []);
        setStorage(mapping !== undefined ? mapping.storage || [] : []);
    }, [mapping]);

    const [legitimateInterests, setLegitimateInterests] = useState<string[]>([]);
    const [recipients, setRecipients] = useState<string[]>([]);
    const [storage, setStorage] = useState<MappingStorage[]>([]);



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
            createMapping(dispatch, {endpointId: endpoint, fields: fieldRefs, purposes: purposeRefs, legitimateInterests, recipients, storage}, () => fetchMappings(dispatch));
        } else {
            updateMapping(dispatch, {...mapping as Mapping, fields: fieldRefs, purposes: purposeRefs, legitimateInterests, recipients, storage });
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
                        <Text fontSize="lg" color={textColor} fontWeight="bold">Storage</Text>
                        <Table color={textColor}>
                            <Thead>
                                <Tr>{['Description', 'TTL', 'Actions'].map((item, index) =>
                                    <Th color="gray.400" key={index}>{item}</Th>)}
                                </Tr>
                            </Thead>
                            <Tbody>
                                { storage.map((item, index) =>
                                    <Tr key={index}>
                                        <Td>
                                            <FormControl maxWidth="300px">
                                                <Input value={item.description} onChange={e => setStorage(storage.map((v, i) => i !== index ? v : {...v,  description: e.target.value }))} />
                                            </FormControl>
                                        </Td>
                                        <Td>
                                            <FormControl maxWidth="300px">
                                                <Input value={item.ttl} onChange={e => setStorage(storage.map((v, i) => i !== index ? v : {...v,  ttl: e.target.value }))} />
                                            </FormControl>
                                        </Td>
                                        <Td>
                                            <Button colorScheme='red'
                                                    onClick={() => setStorage(storage.filter((_, i) => i !== index))}>Delete</Button>
                                        </Td>
                                    </Tr>)
                                }
                                
                            </Tbody>
                        </Table>
                        <Button width={"fit-content"} colorScheme='teal'
                                onClick={() => setStorage([...storage, { description: '', ttl: ''}])}>Add storage</Button>
                    </VStack>
                </Flex>
                <Flex direction={"column"} width={"100%"}>
                    <VStack pt={{base: "60px", md: "40px"}} spacing='12px' alignItems="flex-start">
                        <Text fontSize="lg" color={textColor} fontWeight="bold">Recipients</Text>
                        <Table color={textColor}>
                            <Thead>
                                <Tr>{['Recipients', 'Actions'].map((item, index) =>
                                    <Th color="gray.400" key={index}>{item}</Th>)}
                                </Tr>
                            </Thead>
                            <Tbody>
                                { recipients.map((item, index) =>
                                    <Tr key={index}>
                                        <Td>
                                            <FormControl maxWidth="300px">
                                                <Input value={item} onChange={e => setRecipients(recipients.map((v, i) => i !== index ? v : e.target.value))} />
                                            </FormControl>
                                        </Td>
                                        <Td>
                                            <Button colorScheme='red'
                                                    onClick={() => setRecipients(recipients.filter(r => r !== item))}>Delete</Button>
                                        </Td>
                                    </Tr>)
                                }
                                
                            </Tbody>
                        </Table>
                        <Button width={"fit-content"} colorScheme='teal'
                                onClick={() => setRecipients([...recipients, ''])}>Add recipient</Button>
                    </VStack>
                </Flex>

                <Flex direction={"column"} width={"100%"}>
                    <VStack pt={{base: "60px", md: "40px"}} spacing='12px' alignItems="flex-start">
                        <Text fontSize="lg" color={textColor} fontWeight="bold">Legitimate Interests</Text>
                        <Table color={textColor}>
                            <Thead>
                                <Tr>{['Legitimate Interests', 'Actions'].map((item, index) =>
                                    <Th color="gray.400" key={index}>{item}</Th>)}
                                </Tr>
                            </Thead>
                            <Tbody>
                                { legitimateInterests.map((item, index) =>
                                    <Tr key={index}>
                                        <Td>
                                            <FormControl maxWidth="300px">
                                                <Input value={item} onChange={e => setLegitimateInterests(legitimateInterests.map((v, i) => i !== index ? v : e.target.value))} />
                                            </FormControl>
                                        </Td>
                                        <Td>
                                            <Button colorScheme='red'
                                                    onClick={() => setLegitimateInterests(legitimateInterests.filter((_,i)=> i !== index))}>Delete</Button>
                                        </Td>
                                    </Tr>)
                                }
                                
                            </Tbody>
                        </Table>
                        <Button width={"fit-content"} colorScheme='teal'
                                onClick={() => setLegitimateInterests([...legitimateInterests, ''])}>Add legitimate interest</Button>
                    </VStack>
                </Flex>
                <Flex direction={"column"} width={"100%"}>
                    <VStack pt={{base: "60px", md: "40px"}} spacing='12px' alignItems="flex-start">
                        <Text fontSize="lg" color={textColor} fontWeight="bold">Purposes</Text>
                        <Table color={textColor}>
                            <Thead>
                                <Tr>{['Purpose', 'Description', 'Actions'].map((item, index) =>
                                    <Th color="gray.400" key={index}>{item}</Th>)}
                                </Tr>
                            </Thead>
                            <Tbody>
                                { purposeRefs.map((item, index) =>
                                    <Tr key={index}>
                                        <Td>
                                            <FormControl maxWidth="300px">
                                                <Select value={item.purpose} onChange={(e => setPurposeRefs(purposeRefs.map((v, i) => i !== index ? v: {...v, purpose: e.target.value})))}>
                                                    {purposeItems.map((item, index) =>
                                                        <option key={index} value={item.label}>{item.label}</option>)}
                                                </Select>
                                            </FormControl>
                                        </Td>
                                        <Td>
                                            <FormControl maxWidth="300px">
                                                <Input value={item.description} onChange={e => setPurposeRefs(purposeRefs.map((v, i) => i !== index ? v : {...v,  description: e.target.value }))} />
                                            </FormControl>
                                        </Td>
                                        <Td>
                                            <Button colorScheme='red'
                                                    onClick={() => setPurposeRefs(purposeRefs.filter(r => r.purpose !== item.purpose))}>Delete</Button>
                                        </Td>
                                    </Tr>)
                                }
                                
                            </Tbody>
                        </Table>
                        <Button width={"fit-content"} colorScheme='teal'
                                onClick={() => setPurposeRefs([...purposeRefs, { purpose: '', description: ''}])}>Add purpose field</Button>
                    </VStack>
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

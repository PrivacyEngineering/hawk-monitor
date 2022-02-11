import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, HStack, Input, Radio, RadioGroup, Select, Stack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { Card } from "components/StyledComponent";
import { createRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useThunkDispatch } from "..";
import { RootState } from "../reducers";
import { Field, LegalBaseExtended } from "../types";
import { CREATE_FIELD_REQUEST, CREATE_FIELD_SUCCESS, UPDATE_FIELD_REQUEST, UPDATE_FIELD_SUCCESS } from "../types/actions/Types";
import { GdprBadge } from "./Badges";

export const FieldPage = () => {
  const params = useParams<{ id: string }>();
  const idFromParams = params.id;

  const field = useSelector<RootState, Field | undefined>(state => state.fields.find(f => f.id === idFromParams));
  const allLegalBases = useSelector<RootState, LegalBaseExtended[]>(state => state.legalBases);
  const dispatch = useThunkDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState(field?.id || '');
  const [consequences, setConsequences] = useState(field?.consequences || '');
  const [contractualRegulation, setContractualRegulation] = useState(field?.contractualRegulation || false);
  const [description, setDescription] = useState(field?.description || '');
  const [legalBases, setLegalBases] = useState(field?.legalBases || []);
  const [legalRequirement, setLegalRequirement] = useState(field?.legalRequirement || false);
  const [obligationToProvide, setObligationToProvide] = useState(field?.obligationToProvide || false);
  const [personalData, setPersonalData] = useState(field?.personalData || false);
  const [specialCategoryPersonalData, setSpecialCategoryPersonalData] = useState(field?.specialCategoryPersonalData || false);

  const [legalBasesToAttach, setLegalBasesToAttach] = useState(allLegalBases.filter(alb => !legalBases.find(lb => lb.requirement === alb.requirement)));
  useEffect(() => {
    setLegalBasesToAttach(allLegalBases.filter(alb => !legalBases.find(lb => lb.requirement === alb.requirement)));
  }, [allLegalBases, legalBases]);

  const handleDataCategoryChange = (nextValue: string) => {
    setPersonalData(nextValue === 'personal' || nextValue === 'special');
    setSpecialCategoryPersonalData(nextValue === 'special');
  }

  const addLegalBaseSelectRef = createRef<HTMLSelectElement>();
  const addLegalBase = (requirement: string) => {
    const legalBaseExtended = allLegalBases.find(x => x.requirement === requirement)!;
    const legalBase = ({ requirement: legalBaseExtended.requirement, description: legalBaseExtended.description });
    setLegalBases(s => [...s, legalBase]);
    addLegalBaseSelectRef.current!.value = '';
  }

  const removeLegalBase = (requirement: string) => {
    setLegalBases(s => s.filter(x => x.requirement !== requirement));
  }

  const handleSave = () => {
    const fieldToDispatch = { id, consequences, contractualRegulation, description, legalBases, legalRequirement, obligationToProvide, personalData, specialCategoryPersonalData };
    dispatch({ type: field ? UPDATE_FIELD_REQUEST : CREATE_FIELD_REQUEST, field: fieldToDispatch });
    // TODO: actual API call
    dispatch({ type: field ? UPDATE_FIELD_SUCCESS : CREATE_FIELD_SUCCESS, field: fieldToDispatch });
    navigate('/fields')
  }

  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card>
        <Flex direction="column" pb="12px">
          <Text fontSize="xl" color={textColor} fontWeight="bold" pb="6px">{field ? `Field ${id}` : `New field ${id}`}</Text>
        </Flex>

        <Flex direction="column" >
          <VStack spacing='18px' alignItems="flex-start">

            <FormControl maxWidth="300px">
              <FormLabel>ID</FormLabel>
              <Input value={id} onChange={e => setId(e.target.value)} isDisabled={Boolean(field)} />
            </FormControl>

            <FormControl maxWidth="500px">
              <FormLabel>Description</FormLabel>
              <Input value={description} onChange={e => setDescription(e.target.value)} />
            </FormControl>

            <FormControl maxWidth="500px">
              <FormLabel>Consequences in the case of non-disclosure</FormLabel>
              <Input value={consequences} onChange={e => setConsequences(e.target.value)} />
              <FormHelperText>e.g. If the data is not disclosed, the shipment cannot be delivered.</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Data category</FormLabel>
              <RadioGroup value={specialCategoryPersonalData ? 'special' : personalData ? 'personal' : '-'} onChange={handleDataCategoryChange}>
                <Stack direction='row'>
                  <Radio colorScheme='teal' value='-'>Not personal</Radio>
                  <Radio colorScheme='teal' value='personal'>Personal</Radio>
                  <Radio colorScheme='teal' value='special'>Personal data of special categories</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Is there a contractual regulation to collect these data?</FormLabel>
              <RadioGroup value={String(contractualRegulation ? 'yes' : 'no')} onChange={nextValue => setContractualRegulation(nextValue === 'yes')}>
                <Stack direction='row'>
                  <Radio colorScheme='teal' value='no'>No</Radio>
                  <Radio colorScheme='teal' value='yes'>Yes</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Is there a legal requirement to collect these data?</FormLabel>
              <RadioGroup value={String(legalRequirement ? 'yes' : 'no')} onChange={nextValue => setLegalRequirement(nextValue === 'yes')}>
                <Stack direction='row'>
                  <Radio colorScheme='teal' value='no'>No</Radio>
                  <Radio colorScheme='teal' value='yes'>Yes</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Is there an obligation for the data subject to provide these data?</FormLabel>
              <RadioGroup value={String(obligationToProvide ? 'yes' : 'no')} onChange={nextValue => setObligationToProvide(nextValue === 'yes')}>
                <Stack direction='row'>
                  <Radio colorScheme='teal' value='no'>No</Radio>
                  <Radio colorScheme='teal' value='yes'>Yes</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Legal bases</FormLabel>
              {legalBases?.length > 0 ?
                <>
                  <HStack>
                    {legalBases
                      .sort((a, b) => a.requirement.localeCompare(b.requirement))
                      .map(legalBase =>
                        <Box key={legalBase.requirement} onClick={() => removeLegalBase(legalBase.requirement)} cursor={'pointer'}>
                          <GdprBadge requirement={legalBase.requirement} />
                        </Box>
                      )}
                  </HStack>
                  <FormHelperText>(click to delete)</FormHelperText>
                </> : 'No legal bases attached'}
            </FormControl>

            <Select
              ref={addLegalBaseSelectRef}
              isDisabled={legalBasesToAttach.length === 0}
              minWidth="200px"
              maxWidth="300px"
              placeholder={legalBasesToAttach.length > 0 ? 'Add legal base' : 'All legal bases attached'}
              onChange={e => addLegalBase(e.target.value)}
            >
              {legalBasesToAttach.map(x => <option key={x.requirement} value={x.requirement}>{x.regulation} Article {x.article} Par. {x.paragraph}</option>)}
            </Select>

            <Button width="fit-content" colorScheme='teal' onClick={handleSave}>Save</Button>
          </VStack>
        </Flex>
      </Card >
    </Flex >
  )
}
import { Button, Flex, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Card } from "components/StyledComponent";
import { RootState } from "reducers";
import { AnyMapping, Field, Mapping, MappingFieldReference, TableRowProps } from "types";
import { GenericTable } from "./GenericTable";
import { BsPencilFill, BsPlusLg } from "react-icons/bs";
import { PersonalBadge, SpecialBadge } from "./Badges";

export const MappingsPage = () => {
  const mappings = useSelector<RootState, AnyMapping[]>(state => state.mappings) as Mapping[];
  const mappingsSortedById = mappings.sort((a, b) => a.id.localeCompare(b.id));
  const existingMappings = mappingsSortedById.filter(m => m.fields !== undefined);
  const unmappedEndpoints = mappingsSortedById.filter(m => m.fields === undefined);

  return (
    <Flex direction="column" pt={{ base: "60px", md: "75px" }}>
      <Card mx={{sm: 0}}>
        <GenericTable<Mapping>
          columnLabels={['ID', 'Endpoint ID', 'Attached Fields', 'Inferred data category', 'Actions']}
          descriptionLine1="Mappings are used to trace processing of privacy-related data in your system. Please keep them up to date."
          header="Existing Mappings"
          items={existingMappings}
          row={ExistingMappingsTableRow} />
      </Card>
      <Card mt="22px">
        <GenericTable<AnyMapping>
          columnLabels={['ID', 'Endpoint ID', 'Actions']}
          descriptionLine1="The following API endpoints were detected in your system, but mappings for them are not yet created."
          descriptionLine2="Please add the missing mappings here and retroactively map your system's API endpoint calls to particular privacy-related data categories."
          header="Unmapped Endpoints"
          items={unmappedEndpoints}
          row={UnmappedEndpointsTableRow} />
      </Card>
    </Flex>
  );
}

const ExistingMappingsTableRow = (props: TableRowProps<Mapping>) => {
  const { item } = props;
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <tr>
      <Td><Text fontSize="md" color={textColor}>{item.id}</Text></Td>
      <Td>{item.endpointId}</Td>
      <Td>{item.fields.length ? item.fields.map(f => f.id).join(', ') : '-'}</Td>
      <Td><InferredDataCategories fieldRefs={item.fields} /></Td>
      <Td>
        <Link to={item.id}>
          <Button color='teal.400' size="sm" leftIcon={<BsPencilFill />}>Edit fields</Button>{' '}
        </Link>
      </Td>
    </tr>
  )
}

const InferredDataCategories = (props: { fieldRefs: MappingFieldReference[] }) => {
  const { fieldRefs } = props;
  const fields = useSelector<RootState, Field[]>(state => state.fields);
  const [personal, setPersonal] = useState(false);
  const [special, setSpecial] = useState(false);

  useEffect(() => {
    const mappedFields = fields.filter(f => fieldRefs.some(ref => ref.id === f.id));
    setPersonal(mappedFields.map(f => f.personalData).reduce((res, cur) => res || cur, false));
    setSpecial(mappedFields.map(f => f.specialCategoryPersonalData).reduce((res, cur) => res || cur, false));
  }, [fieldRefs, fields]);

  return (
    <>
      {special ? <SpecialBadge /> : personal ? <PersonalBadge /> : '-'}
    </>
  )
}

const UnmappedEndpointsTableRow = (props: TableRowProps<AnyMapping>) => {
  const { item } = props;

  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>{item.endpointId}</Td>
      <Td>
        <Link to={item.id}>
          <Button color='teal.400' size="sm" leftIcon={<BsPlusLg />}>Attach fields</Button>{' '}
        </Link>
      </Td>
    </Tr>
  )
}

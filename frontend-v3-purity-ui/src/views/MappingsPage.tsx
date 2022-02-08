import { Badge, Box, Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Card, CardBody, CardHeader } from "components/StyledComponent";
import { RootState } from "reducers";
import { AnyMapping, Field, Mapping, MappingFieldReference, TableRowProps } from "types";

export const MappingsPage = () => {
  const mappings = useSelector<RootState, AnyMapping[]>(state => state.mappings) as Mapping[];
  const mappingsSortedById = mappings.sort((a, b) => a.id.localeCompare(b.id));
  const existingMappings = mappingsSortedById.filter(m => m.fields !== undefined);
  const unmappedEndpoints = mappingsSortedById.filter(m => m.fields === undefined);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card>
        <GenericTable<Mapping>
          columnLabels={['ID', 'Service', 'Protocol', 'Method', 'Endpoint', 'Attached Fields', 'Inferred data categories', 'Actions']}
          descriptionLine1="Mappings are used to trace processing of privacy-related data in your system. Please keep them up to date."
          header="Existing Mappings"
          items={existingMappings}
          row={ExistingMappingsTableRow} />
      </Card>
      <Card mt="22px">
        <GenericTable<AnyMapping>
          columnLabels={['ID', 'Service', 'Protocol', 'Method', 'Endpoint', 'Actions']}
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
      <Td><Text fontSize="md" color={textColor} fontWeight="bold">{item.service}</Text></Td>
      <Td>{item.endpoint.protocol}</Td>
      <Td>{item.endpoint.method}</Td>
      <Td>{item.endpoint.path}</Td>
      <Td>{item.fields.length ? item.fields.map(f => f.id).join(', ') : '-'}</Td>
      <Td><InferredDataCategories fieldRefs={item.fields} /></Td>
      <Td><Link to={item.id}><TableButton label="Edit fields" /></Link></Td>
    </tr>
  )
}

const InferredDataCategories = (props: { fieldRefs: MappingFieldReference[] }) => {
  const { fieldRefs } = props;
  const fields = useSelector<RootState, Field[]>(state => state.fields);
  const [personal, setPersonal] = useState(false);
  const [special, setSpecial] = useState(false);

  const PersonalBadge = () => <Badge bg="gray.500" color="white" fontSize={"14px"} p="3px 10px" borderRadius="8px">Personal</Badge>;
  const SpecialBadge = () => <Badge bg="red.500" color="white" fontSize={"14px"} p="3px 10px" borderRadius="8px">Special</Badge>;

  useEffect(() => {
    const mappedFields = fields.filter(f => fieldRefs.some(ref => ref.id === f.id));
    setPersonal(mappedFields.map(f => f.personalData).reduce((res, cur) => res || cur, false));
    setSpecial(mappedFields.map(f => f.specialCategoryPersonalData).reduce((res, cur) => res || cur, false));
  }, [fieldRefs, fields]);

  return (
    <>
      {personal && <PersonalBadge />}
      {personal && special && " "}
      {special && <SpecialBadge />}
      {!personal && !special && '-'}
    </>
  )
}


const UnmappedEndpointsTableRow = (props: TableRowProps<AnyMapping>) => {
  const { item } = props;

  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td><b>{item.service}</b></Td>
      <Td>{item.endpoint.protocol}</Td>
      <Td>{item.endpoint.method}</Td>
      <Td>{item.endpoint.path}</Td>
      <Td><Link to={item.id}><TableButton label="Attach fields" /></Link></Td>
    </Tr>
  )
}

const TableButton = (props: { label: string }) => <Button size="sm"><Text fontSize="md" color="gray.400" cursor="pointer">{props.label}</Text></Button>;

interface GenericTableProps<T> {
  columnLabels: string[];
  descriptionLine1?: string;
  descriptionLine2?: string;
  header: string;
  items: T[];
  row: React.FC<TableRowProps<T>>;
}

const GenericTable = <T,>(props: GenericTableProps<T>) => {
  const { columnLabels, descriptionLine1, descriptionLine2, header, items, row: Row } = props;

  const textColor = useColorModeValue("gray.700", "white");
  const scrollbarColor = useColorModeValue("rgb(230,230,230)", "lightgray");

  return (
    <>
      <CardHeader p="8px 6px">
        <Flex direction={"column"} pb="6px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">{header}</Text>
          {descriptionLine1 && <Text color={textColor}>{descriptionLine1}</Text>}
          {descriptionLine2 && <Text color={textColor}>{descriptionLine2}</Text>}
        </Flex>
      </CardHeader>
      <CardBody>
        <Box overflowX="auto" width="100%" css={{ '&::-webkit-scrollbar': { width: '2px' }, '&::-webkit-scrollbar-thumb': { background: scrollbarColor, borderRadius: '10px' } }}>
          <Table color={textColor}>
            <Thead><Tr>{columnLabels.map((item, index) => <Th color="gray.400" key={index}>{item}</Th>)}</Tr></Thead>
            <Tbody>{items.map((item, index) => <Row item={item} key={index} />)}</Tbody>
          </Table>
        </Box>
      </CardBody>
    </>
  )
}

import { Badge, Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import { AnyMapping, Field, Mapping, MappingFieldReference, TableRowProps } from "types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MappingsPage2 = () => {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <ExistingMappings />
      <UnmappedEndpoints />
    </Flex>
  );
}

const ExistingMappings = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const mappings = useSelector<RootState, AnyMapping[]>(state => state.mappings) as Mapping[];
  const labels = ['ID', 'Service', 'Protocol', 'Method', 'Endpoint', 'Attached Fields', 'Inferred data categories', 'Actions'];
  const existingMappings = mappings.filter(m => m.fields !== undefined).sort((a, b) => a.id.localeCompare(b.id));


  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="6px 0px 22px 0px">
        <Text fontSize="xl" color={textColor} fontWeight="bold">Existing Mappings</Text>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              <Th color="gray.400">ID</Th>
              <Th color="gray.400">Service</Th>
              <Th color="gray.400">Protocol</Th>
              <Th color="gray.400">Method</Th>
              <Th color="gray.400">Endpoint</Th>
              <Th color="gray.400">Attached fields</Th>
              <Th color="gray.400">Inferred data categories</Th>
              <Th color="gray.400">Actions</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {existingMappings.map((item, index) => <ExistingMappingsTableRow key={index} item={item} />)}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  )
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
      <Td>
        <Link to={item.id} state={{ ...item }}>
          <Button size="sm" bg="transparent">
            <Text fontSize="md" color="gray.400" fontWeight="bold" cursor="pointer">Edit fields</Text>
          </Button>
        </Link>
      </Td>
    </tr>
  )
}

const PersonalBadge = () => {
  const textColor = useColorModeValue("gray.100", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return <Badge bg="gray.500" color={textColor} fontSize={"14px"} p="3px 10px" borderRadius="8px">Personal</Badge>
}

const SpecialBadge = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return <Badge bg="red.500" color="white" fontSize={"14px"} p="3px 10px" borderRadius="8px">Special</Badge>
}


const InferredDataCategories = (props: { fieldRefs: MappingFieldReference[] }) => {
  const { fieldRefs } = props;
  const fields = useSelector<RootState, Field[]>(state => state.fields);
  const [personal, setPersonal] = useState(false);
  const [special, setSpecial] = useState(false);

  useEffect(() => {
    const mappedFields = fields.filter(f => fieldRefs.some(ref => ref.id === f.id));
    console.log('mappedFields', mappedFields)
    setPersonal(mappedFields.map(f => f.personalData).reduce((res, cur) => res || cur, false));
    console.log('mappedFields', mappedFields)
    setSpecial(mappedFields.map(f => f.specialCategoryPersonalData).reduce((res, cur) => res || cur, false));
  }, [fieldRefs, fields]);

  console.log('personal:', personal, 'special:', special)

  return (
    <>
      {personal && <PersonalBadge />}
      {personal && special && " "}
      {special && <SpecialBadge />}
      {!personal && !special && '-' }
    </>
  )
}

const UnmappedEndpoints = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const mappings = useSelector<RootState, AnyMapping[]>(state => state.mappings);
  const unmappedEndpoints = mappings.filter(m => m.fields === undefined).sort((a, b) => a.id.localeCompare(b.id));

  return (
    <Card
      my="22px"
      overflowX={{ sm: "scroll", xl: "hidden" }}
    >
      <CardHeader p="6px 0px 22px 0px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            Unmapped Endpoints
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              <Th color="gray.400">ID</Th>
              <Th color="gray.400">Service</Th>
              <Th color="gray.400">Protocol</Th>
              <Th color="gray.400">Method</Th>
              <Th color="gray.400">Endpoint</Th>
              <Th color="gray.400">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {unmappedEndpoints.map((item, index) => <UnmappedEndpointsTableRow key={index} item={item} />)}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  )
}


const UnmappedEndpointsTableRow = (props: TableRowProps<AnyMapping>) => {
  const { item } = props;

  return (
    <tr>
      <Td>{item.id}</Td>
      <Td><b>{item.service}</b></Td>
      <Td>{item.endpoint.protocol}</Td>
      <Td>{item.endpoint.method}</Td>
      <Td>{item.endpoint.path}</Td>
      <Td>
        <Link to={item.id} state={{ ...item }}>
          <Button size="sm" bg="transparent">
            <Text fontSize="md" color="gray.400" fontWeight="bold" cursor="pointer">Attach fields</Text>
          </Button>
        </Link>
      </Td>
    </tr>
  )
}


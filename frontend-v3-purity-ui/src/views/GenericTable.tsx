import { Box, Flex, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { CardBody, CardHeader } from "components/StyledComponent";
import { TableRowProps } from "types";

interface GenericTableProps<T> {
  columnLabels: string[];
  descriptionLine1?: string;
  descriptionLine2?: string;
  header: string;
  items: T[];
  row: React.FC<TableRowProps<T>>;
}

export const GenericTable = <T,>(props: GenericTableProps<T>) => {
  const { columnLabels, descriptionLine1, descriptionLine2, header, items, row: Row } = props;

  const textColor = useColorModeValue("gray.700", "white");
  const scrollbarColor = useColorModeValue("rgb(230,230,230)", "lightgray");

  return (
    <>
      <CardHeader>
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

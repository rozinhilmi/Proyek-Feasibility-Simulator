import { Stack, Table, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react";

const TableCompo = (props: {
  tableName: String;
  description?: String;
  columns: any;
  data: any;
  currentLimit?: any;
  setCurrentPage?: any;
  setCurrentlimit?: any;
  additionalComponent?: any;
}) => {
  return props.data ? (
    <Stack maxWidth={"1440px"} width={{ base: "95vw", md: "100%" }} marginX={"auto"} marginBottom={"20px"} padding={"5px"}>
      {props.data.length > 0 ? (
        <>
          <Stack overflowX={"scroll"}>
            <Table>
              <Thead fontSize={"md"}>
                <Tr border={"none"}>
                  {props.columns.map((cel: any, index: number) => (
                    <Td key={index} isNumeric={cel?.align === "right" ? true : false}>
                      {cel.title}
                    </Td>
                  ))}
                </Tr>
              </Thead>
              <Tbody fontSize={"md"}>
                {props.data.map((row: any, index: number) => (
                  <Tr key={index}>
                    {props.columns.map((column: any, index: number) => (
                      <Td border={"none"} key={index} isNumeric={column?.align === "right" ? true : false} whiteSpace={"nowrap"}>
                        {column.render ? column?.render(row) : row[column.key]}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Stack>
        </>
      ) : (
        <Stack maxWidth={"1440px"} width={{ base: "100vw", md: "100%" }} height={"400px"} marginX={"auto"} marginBottom={"20px"} padding={"5px"}>
          <Text margin={"auto"} as={"b"}>
            Tidak ada Data
          </Text>
        </Stack>
      )}
    </Stack>
  ) : null;
};

export default TableCompo;

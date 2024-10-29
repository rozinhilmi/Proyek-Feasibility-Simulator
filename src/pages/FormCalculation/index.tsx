import { Button, HStack, Input, NumberInput, NumberInputField, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { customRound } from "../../utils/helper/helper";
import { masterCoefInt, masterCoefMainCost, masterCoefOpr, masterCoefPerformance, masterCoefUnitBerkas, masterJamKerja } from "./masterVariable";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from "chart.js";
import { formatNumber } from "../../utils/helper/helper";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const Index = () => {
  const navigate = useNavigate();
  const { modelUnit, typeUnit } = useParams();
  const [inputState, setInputState] = useState<any>({
    initialCost: 1500,
    periodicService: 20,
    operationCost: 18,
    revenuePerHour: 0.55,
    priceUnit: 1450,
  });
  // const navigate = useNavigate();
  const [result, setResult] = useState<any>([]);

  const inputValue = (key: string, value: string) => {
    setInputState({ ...inputState, [key]: Number(value) });
  };

  const calculate1 = () => {
    let hargaUnitBekas = masterCoefUnitBerkas.map((i) => inputState.priceUnit * i);
    let revenue = masterCoefPerformance.map((i) => parseFloat((inputState.revenuePerHour * masterJamKerja[0] * i).toFixed(1)));
    let mainCost = masterCoefMainCost.map((i) => inputState.periodicService * i);
    let oprCost = masterCoefOpr.map((i) => inputState.operationCost * i);
    let intCost = masterCoefInt.map((i) => inputState.initialCost * i);

    // console.log(hargaUnitBekas);

    let breakEventPoint: any = null;
    let masterProfitNonIntCost = revenue.map((i, index) => i - (mainCost[index] + oprCost[index]));

    let index = 0;
    let masterProfitKumulatif: number[] = [];
    for (const i of masterProfitNonIntCost) {
      let valueToPush;
      if (index == 0) {
        valueToPush = i;
      } else {
        valueToPush = i + masterProfitKumulatif[index - 1];
      }
      masterProfitKumulatif.push(valueToPush);
      if (breakEventPoint == null && valueToPush > inputState.initialCost) {
        breakEventPoint = valueToPush;
      }
      index += 1;
    }
    let masterProfit = revenue.map((i, index) => i - (mainCost[index] + oprCost[index] + (intCost?.[index] || 0)));
    let profitCumulative: number[] = [];
    index = 0;
    for (const i of masterProfit) {
      if (index == 0) {
        profitCumulative.push(i);
      } else {
        profitCumulative.push(i + profitCumulative[index - 1]);
      }
      index += 1;
    }

    let profitCumulativePlusSellUnit = profitCumulative.map((i, index) => i + hargaUnitBekas[index]);
    let optimumPoint1 = Math.max(...profitCumulative);
    let optimumPoint2 = Math.max(...profitCumulativePlusSellUnit);

    // console.log(JSON.stringify(profitCumulativePlusSellUnit.map((i) => customRound(i))));

    setResult(
      masterJamKerja.map((i, index) => {
        return {
          jamKerja: i,
          profitCumulative: profitCumulative[index],
          profitCumulativePlusSellUnit: profitCumulativePlusSellUnit[index],
          breakEventPoint: masterProfitKumulatif[index] === breakEventPoint ? profitCumulative[index] : "",
          optimumPoint1: profitCumulative[index] === optimumPoint1 ? "Optimum" : "",
          optimumPoint2: profitCumulativePlusSellUnit[index] === optimumPoint2 ? "Optimum" : "",
        };
      })
    );

    setTimeout(() => (window.location.hash = "result"), 200);
  };

  const chartData = {
    labels: result.map((i: any) => i.jamKerja / 1000),
    datasets: [
      {
        label: "BEP",
        data: result.map((i: any) => i.profitCumulative),
        borderColor: "transparent",
        backgroundColor: "orange",
        yAxisID: "y1",
        fill: true,
        tension: 0.1,
        pointRadius: result.map((i: any) => (i.breakEventPoint !== "" ? 5 : 0)),
      },
      {
        label: "Profit Cumulative",
        data: result.map((i: any) => i.profitCumulative),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 1)",
        yAxisID: "y1",
        fill: true,
        tension: 0.1,
        pointRadius: result.map((i: any) => (i.optimumPoint1 !== "" ? 5 : 0)),
      },
      {
        label: "Profit Cumulative Plus Sell Unit",
        data: result.map((i: any) => i.profitCumulativePlusSellUnit),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 1)",
        yAxisID: "y1",
        fill: true,
        tension: 0.1,
        pointRadius: result.map((i: any) => (i.optimumPoint2 !== "" ? 5 : 0)),
      },
    ],
  };

  return (
    <Stack
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      // backgroundColor={"#F2F2F7"}
      backgroundImage={"/bg2.png"}
      backgroundPosition={"center"}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      backgroundAttachment={"fixed"}
    >
      <Stack
        padding={"30px"}
        backgroundColor={"#FFFFFF"}
        boxShadow={"0 2px 10px rgba(0, 0, 0, 0.1)"}
        width={{ base: "95%", md: "80%" }}
        gap={"20px"}
        marginY={"10vh"}
        borderRadius={"12px"}
      >
        <Text as={"b"} fontSize={"20px"} textAlign={"center"} marginBottom={"20px"}>
          FEASIBILITY ANALYSIS HEAVY EQUIPMENT
        </Text>
        <Stack width={"100%"} maxWidth={"600px"}>
          <Stack>
            <Text>Model Unit</Text>
            <Input type="text" value={modelUnit} disabled />
          </Stack>

          <Stack>
            <Text>Type Unit</Text>
            <Input type="text" value={typeUnit} disabled />
          </Stack>

          <Stack gap={"5px"}>
            <Text>Initial Cost In Mio</Text>
            <NumberInput defaultValue={inputState?.initialCost}>
              <NumberInputField value={inputState?.initialCost || 0} onChange={(e) => inputValue("initialCost", e.target.value)} />
            </NumberInput>

            <Text fontSize={"12px"} color={"#007AFF"}>
              Harga Unit ++ 1500 = 1,5 Milyar
            </Text>
          </Stack>

          <Stack gap={"5px"}>
            <Text>Periodic Service Cost in Mio</Text>
            <NumberInput defaultValue={inputState?.periodicService}>
              <NumberInputField value={inputState?.periodicService || 0} onChange={(e) => inputValue("periodicService", e.target.value)} />
            </NumberInput>
            <Text fontSize={"12px"} color={"#007AFF"}>
              {`Average per 1000 hour -> 20 = 20 Juta`}
            </Text>
          </Stack>

          <Stack gap={"5px"}>
            <Text>Operation Cost in Mio</Text>
            <NumberInput defaultValue={inputState?.operationCost}>
              <NumberInputField value={inputState?.operationCost || 0} onChange={(e) => inputValue("operationCost", e.target.value)} />
            </NumberInput>
            <Text fontSize={"12px"} color={"#007AFF"}>
              {`Average per 1000 hour -> 18 = 18 Juta`}
            </Text>
          </Stack>

          <Stack gap={"5px"}>
            <Text>Revenue Per Hour in Mio</Text>
            <NumberInput defaultValue={inputState?.revenuePerHour}>
              <NumberInputField value={inputState?.revenuePerHour || 0} onChange={(e) => inputValue("revenuePerHour", e.target.value)} />
            </NumberInput>
            <Text fontSize={"12px"} color={"#007AFF"}>
              {`0,55 = 550.000 per Hours`}
            </Text>
          </Stack>

          <Stack gap={"5px"}>
            <Text>Price Unit used in Mio </Text>
            <NumberInput defaultValue={inputState?.priceUnit}>
              <NumberInputField value={inputState?.priceUnit || 0} onChange={(e) => inputValue("priceUnit", e.target.value)} />
            </NumberInput>
            <Text fontSize={"12px"} color={"#007AFF"}>
              {`Harga unit bekas di umur 1000 Jam Pertama 1450 = 1,45 Milyar`}
            </Text>
          </Stack>

          <Button marginTop={"20px"} colorScheme="blue" disabled={!modelUnit || !typeUnit} onClick={calculate1}>
            Calculation
          </Button>
          <Button colorScheme="blue" variant="link" onClick={() => navigate("/")}>
            Back
          </Button>
        </Stack>

        {result.length ? (
          <>
            <Line
              id="result"
              style={{ paddingTop: "40px", width: "2000px" }}
              data={chartData}
              options={{
                responsive: true,
                scales: {
                  y1: {
                    type: "linear",
                    position: "left",
                  },
                },
              }}
            />
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Jam Kerja</Th>
                    <Th>Profit Kumulatif (1)</Th>
                    <Th>Profit Kumulatif + Sell Unit (2)</Th>
                    {/* <Th>Break Event Point</Th>
                    <Th>Optimum Point (1)</Th>
                    <Th>Optimum Point (2)</Th> */}
                  </Tr>
                </Thead>
                <Tbody>
                  {result.map((i: any, index: number) => (
                    <Tr key={index}>
                      <Td>{i.jamKerja}</Td>
                      <Td>
                        <HStack gap={"30px"} display={"flex"}>
                          <Text>{formatNumber(i.profitCumulative)}</Text>
                          {i.optimumPoint1 ? <Text>(Optimum)</Text> : null}
                          {i.breakEventPoint ? <Text>(BEP)</Text> : null}
                        </HStack>
                      </Td>
                      <Td>
                        <HStack gap={"30px"} display={"flex"}>
                          <Text>{formatNumber(i.profitCumulativePlusSellUnit)}</Text>
                          {i.optimumPoint2 ? <Text>(Optimum)</Text> : null}
                        </HStack>
                      </Td>
                      {/* <Td>{i.optimumPoint1}</Td>
                      <Td>{i.optimumPoint2}</Td> */}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default Index;

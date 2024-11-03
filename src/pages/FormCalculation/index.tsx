import { Button, HStack, Input, NumberInput, NumberInputField, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { customRound } from "../../utils/helper/helper";
import { masterCoefInt, masterCoefMainCost, masterCoefOpr, masterCoefPerformance, masterCoefUnitBerkas, masterJamKerja } from "./masterVariable";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from "chart.js";
import { formatNumber } from "../../utils/helper/helper";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);
import { FaDownload } from "react-icons/fa6";

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
  // const [breakEventPointResult, setBreakEventPointResult] = useState<any>(null);
  // const [optimumPoint1Result, setOptimumPoint1Result] = useState<any>(null);
  // const [optimumPoint2Result, setOptimumPoint2Result] = useState<any>(null);

  const inputValue = (key: string, value: string) => {
    setInputState({ ...inputState, [key]: Number(value) });
  };
  const [showButtonUnduh, setShowButtonUnduh] = useState<boolean>(false);
  const calculate1 = () => {
    setShowButtonUnduh(true);
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
    // setOptimumPoint1Result(optimumPoint1);
    // setOptimumPoint2Result(optimumPoint2);
    // setBreakEventPointResult(breakEventPoint);

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
        tension: 0,
        pointRadius: result.map((i: any) => (i.breakEventPoint !== "" ? 5 : 0)),
      },
      {
        label: "Profit Cumulative",
        data: result.map((i: any) => i.profitCumulative),
        borderColor: "#608BC1",
        backgroundColor: "#608BC1",
        yAxisID: "y1",
        fill: true,
        tension: 0,
        pointRadius: result.map((i: any) => (i.optimumPoint1 !== "" ? 5 : 0)),
      },
      {
        label: "Profit Cumulative Plus Sell Unit",
        data: result.map((i: any) => i.profitCumulativePlusSellUnit),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 1)",
        yAxisID: "y1",
        fill: true,
        tension: 0,
        pointRadius: result.map((i: any) => (i.optimumPoint2 !== "" ? 5 : 0)),
      },
      {
        label: "y=0",
        data: result.map(() => 0),
        borderColor: "rgba(0,0,0,0.1)",
        backgroundColor: "rgba(0,0,0,0.1)",
        yAxisID: "y1",
        fill: true,
        tension: 0,
        pointRadius: 0,
      },
    ],
  };

  const handlePrint = () => {
    setTimeout(() => {
      setShowButtonUnduh(false);
      window.print();
      setShowButtonUnduh(true);
    }, 200);
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
      {showButtonUnduh ? (
        <Button onClick={handlePrint} gap={"5px"} colorScheme="green" position={"fixed"} bottom={"20px"} right={"20px"}>
          Unduh Hasil {showButtonUnduh}
          <FaDownload />
        </Button>
      ) : null}

      <Stack
        id="data"
        padding={"30px"}
        backgroundColor={"#FFFFFF"}
        boxShadow={"0 2px 10px rgba(0, 0, 0, 0.1)"}
        width={{ base: "95%", md: "80%" }}
        gap={"20px"}
        marginY={"10vh"}
        borderRadius={"12px"}
      >
        <Text fontWeight={"bold"} fontSize={"20px"} textAlign={"center"} marginBottom={"20px"}>
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
            <Stack width={"100%"} minHeight={"400px"} overflow={"scroll"}>
              <Line
                id="result"
                style={{ paddingTop: "40px", minHeight: "400px", width: "100%", minWidth: "500px" }}
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y1: {
                      type: "linear",
                      position: "left",
                    },
                  },
                  plugins: {
                    legend: {
                      display: true, // Tampilkan legend
                    },
                  },
                }}
              />
            </Stack>

            <Stack gap={"5px"} marginY={"35px"} fontSize={"14px"}>
              <Text textAlign={"center"} fontWeight={"bold"} marginBottom={"20px"}>
                Deskripsi Grafik dan Tabel Feasibility Analysis
              </Text>
              <Text fontWeight={"bold"}>Grafik Profit Kumulatif dan Profit Kumulatif + Penjualan Unit</Text>
              <HStack flexWrap={"wrap"} gap={"5px"}>
                <Text>Grafik menunjukkan hubungan antara</Text>
                <Text fontWeight={"bold"}>jam kerja </Text>
                <Text>dan</Text>
                <Text fontWeight={"bold"}>profit </Text>
                <Text>dengan dua skenario:</Text>
              </HStack>
              <table>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "top" }}>1.</td>
                    <td style={{ verticalAlign: "top" }}>
                      <HStack flexWrap={"wrap"} gap={"5px"}>
                        <Text fontWeight={"bold"}>Profit Kumulatif (Garis Biru):</Text>
                        <Text> Profit tanpa penjualan tambahan.</Text>
                      </HStack>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: "top" }}>2.</td>
                    <td style={{ verticalAlign: "top" }}>
                      <HStack flexWrap={"wrap"} gap={"5px"}>
                        <Text fontWeight={"bold"}>Profit Kumulatif + Penjualan Unit (Garis Merah): </Text>
                        <Text> Profit dengan tambahan penjualan unit.</Text>
                      </HStack>
                      <HStack flexWrap={"wrap"} gap={"5px"}>
                        <Text fontWeight={"bold"}>• Profit naik </Text>
                        <Text>seiring bertambahnya jam kerja hingga mencapai </Text>
                        <Text fontWeight={"bold"}>titik tertinggi </Text>
                        <Text>(sekitar 16.000 - 17.000 jam).</Text>
                      </HStack>
                      <HStack flexWrap={"wrap"} gap={"5px"}>
                        <Text fontWeight={"bold"}>• Setelah puncak </Text>
                        <Text>ini, profit mulai </Text>
                        <Text fontWeight={"bold"}>menurun tajam,</Text>
                        <Text>hingga akhirnya menjadi </Text>
                        <Text fontWeight={"bold"}>negatif</Text>
                        <Text>setelah jam kerja melebihi 30.000.</Text>
                      </HStack>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
              <Text fontWeight={"bold"}>Tabel Profit dan Titik Penting</Text>
              {/* <pre>{JSON.stringify(result.filter((i: any) => i.optimumPoint1 !== "")?.[0], null, 2)}</pre> */}

              <table>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "top" }}>1.</td>
                    <td style={{ verticalAlign: "top" }}>
                      <Text fontWeight={"bold"}>Break Even Point (BEP):</Text>
                      <HStack flexWrap={"wrap"} gap={"5px"}>
                        <Text>• Terjadi di </Text>
                        <Text fontWeight={"bold"}>{result.filter((i: any) => i.breakEventPoint !== "")?.[0]?.jamKerja || 0} jam</Text>
                        <Text>dengan profit </Text>
                        <Text fontWeight={"bold"}>{result.filter((i: any) => i.breakEventPoint !== "")?.[0]?.profitCumulativePlusSellUnit || 0}</Text>
                        <Text>(Profit Kumulatif + Penjualan).</Text>
                      </HStack>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: "top" }}>2.</td>
                    <td style={{ verticalAlign: "top" }}>
                      <Text fontWeight={"bold"}>Titik Optimum:</Text>
                      <HStack flexWrap={"wrap"} gap={"5px"}>
                        <Text>• Profit tertinggi dicapai pada </Text>
                        <Text fontWeight={"bold"}>16.000 - 17.000 jam kerja:</Text>
                      </HStack>
                      <HStack flexWrap={"wrap"} marginLeft={"30px"}>
                        <Text fontWeight={"bold"}>• Profit Kumulatif: </Text>
                        <Text>{result.filter((i: any) => i.optimumPoint1 !== "")?.[0]?.profitCumulative || 0}</Text>
                      </HStack>
                      <HStack flexWrap={"wrap"} marginLeft={"30px"}>
                        <Text fontWeight={"bold"}>• Profit Kumulatif + Penjualan: </Text>
                        <Text>{result.filter((i: any) => i.optimumPoint2 !== "")?.[0]?.profitCumulativePlusSellUnit || 0}</Text>
                      </HStack>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: "top" }}>3.</td>
                    <td style={{ verticalAlign: "top" }}>
                      <Text fontWeight={"bold"}>Penurunan Profit:</Text>
                      <HStack flexWrap={"wrap"} gap={"5px"}>
                        <Text>• Setelah</Text>
                        <Text fontWeight={"bold"}>{result.filter((i: any) => i.optimumPoint1 !== "")?.[0]?.jamKerja || 0} jam,</Text>
                        <Text>profit</Text>
                        <Text fontWeight={"bold"}>turun</Text>
                        <Text>dan akhirnya menjadi </Text>
                        <Text fontWeight={"bold"}>rugi</Text>
                      </HStack>
                    </td>
                  </tr>
                </tbody>
              </table>

              <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
              <Text fontWeight={"bold"}>Kesimpulan</Text>
              <table>
                <tr>
                  <td style={{ verticalAlign: "top" }}>•</td>
                  <td style={{ verticalAlign: "top" }}>
                    <HStack flexWrap={"wrap"} gap={"5px"}>
                      <Text fontWeight={"bold"}>Jam kerja ideal:</Text>
                      <Text>Sekitar</Text>
                      <Text fontWeight={"bold"}>16.000 - 17.000 jam </Text>
                      <Text>untuk profit maksimal.</Text>
                    </HStack>
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>•</td>
                  <td style={{ verticalAlign: "top" }}>
                    <HStack flexWrap={"wrap"} gap={"5px"}>
                      <Text fontWeight={"bold"}>Lewat dari itu:</Text>
                      <Text>Profit menurun dan bisa menyebabkan </Text>
                      <Text fontWeight={"bold"}>kerugian.</Text>
                    </HStack>
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: "top" }}>•</td>
                  <td style={{ verticalAlign: "top" }}>
                    <HStack flexWrap={"wrap"} gap={"5px"}>
                      <Text fontWeight={"bold"}>Saran:</Text>
                      <Text>Hentikan atau kurangi jam kerja setelah titik optimal untuk menghindari kerugian.</Text>
                    </HStack>
                  </td>
                </tr>
              </table>
            </Stack>

            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th border={"1px solid grey"}>Jam Kerja</Th>
                    <Th border={"1px solid grey"}>Profit Kumulatif (1)</Th>
                    <Th border={"1px solid grey"}>Profit Kumulatif + Sell Unit (2)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {result.map((i: any, index: number) => (
                    <Tr key={index}>
                      <Td border={"1px solid grey"}>{i.jamKerja}</Td>
                      <Td
                        border={"1px solid grey"}
                        backgroundColor={i.breakEventPoint ? "orange" : i.optimumPoint1 ? "rgba(75, 192, 192, 1)" : "none"}
                      >
                        <HStack gap={"30px"} display={"flex"}>
                          <Text>{formatNumber(i.profitCumulative)}</Text>
                          {i.optimumPoint1 ? <Text>(Optimum)</Text> : null}
                          {i.breakEventPoint ? <Text>(BEP)</Text> : null}
                        </HStack>
                      </Td>
                      <Td border={"1px solid grey"} backgroundColor={i.optimumPoint2 ? "rgba(255, 99, 132, 1)" : "none"}>
                        <HStack gap={"30px"} display={"flex"}>
                          <Text>{formatNumber(i.profitCumulativePlusSellUnit)}</Text>
                          {i.optimumPoint2 ? <Text>(Optimum)</Text> : null}
                        </HStack>
                      </Td>
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

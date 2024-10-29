import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// interface interfaceCount {
//   count: number;
// }
const index = () => {
  const [modelUnit, setModelUnit] = useState("");
  const [typeUnit, setTypeUnit] = useState("");
  const navigate = useNavigate();
  // const count = useStore<number>((state) => state.count);
  // const increment = useStore<() => void>((state) => state.increment);
  // const decrement = useStore<() => void>((state) => state.decrement);

  // console.log(count);

  const submit = () => {
    if (modelUnit && typeUnit) {
      navigate(`/form-calculation/${modelUnit}/${typeUnit}`);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      submit();
    }
  };
  return (
    <Stack
      width={"100%"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      // backgroundColor={"#F2F2F7"}
      backgroundImage={"/bg1.png"}
      backgroundPosition={"center"}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      backgroundAttachment={"fixed"}
    >
      {/* <Text>{username}</Text> */}
      <Stack
        padding={"30px"}
        backgroundColor={"#FFFFFF"}
        boxShadow={"0 2px 10px rgba(0, 0, 0, 0.1)"}
        maxWidth={"97%"}
        width={"600px"}
        borderRadius={"12px"}
      >
        <Text as={"b"} fontSize={"20px"} textAlign={"center"} marginBottom={"20px"}>
          FEASIBILITY ANALYSIS HEAVY EQUIPMENT
        </Text>

        <Stack>
          <Text>Model Unit</Text>
          <Input value={modelUnit} onChange={(e) => setModelUnit(e.target.value)} onKeyDown={handleKeyDown} />
        </Stack>

        <Stack>
          <Text>Type Unit</Text>
          <Input value={typeUnit} onChange={(e) => setTypeUnit(e.target.value)} onKeyDown={handleKeyDown} />
        </Stack>

        <Button marginTop={"20px"} colorScheme="blue" disabled={!modelUnit || !typeUnit} onClick={submit}>
          Start Simulation
        </Button>
      </Stack>
    </Stack>
  );
};

export default index;

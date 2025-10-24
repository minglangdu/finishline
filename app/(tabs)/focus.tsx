import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text } from "react-native";
import { get } from ".";
import { DataInput, StepInput, StepObjProps, Title } from "../custom";

interface Task {
  title: string
}

export default function Focus() {
  const [id, setId] = useState("");
  const [steps, changeSteps] = useState<StepObjProps[]>([]);
  const [data, setData] = useState<string[]>([]);
    useEffect(() => {
      get("hikes").then(data => {
        let next = {"Unnamed Task":1e9};
        if (data != null) {
          next = JSON.parse(data);
        }
        setData(Object.keys(next));
      });
    }, []);
  const begin = () => {
    const strsteps = JSON.stringify(steps);
    if (JSON.parse(strsteps).length > 0) {
      console.log(strsteps)
      router.navigate({
        pathname: "/start",
        params: { type: "focus", id: id, steps:strsteps }
      });
    } else {
      let cur:StepObjProps[] = [{ title: id }];
      router.navigate({
        pathname: "/start",
        params: { type: "focus", id: id, steps: JSON.stringify(cur) }
      });
    }
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 16
      }}
    >
      <Title>Hike Mode</Title> <br />
      <Text style={{ fontWeight: "bold" }}>Enter task name below</Text>
      
      <DataInput data={data} value={id} onChangeText={setId}/>
      <br />
      <StepInput steps={steps} changeSteps={changeSteps}/>
      <br />
      <Button title="Start" onPress={begin} />
    </ScrollView>
  );
}
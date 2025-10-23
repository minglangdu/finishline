import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { DataInput, StepInput, StepObjProps, Title } from "../custom";

interface Task {
  title: string
}

export default function Focus() {
  const [id, setId] = useState("");
  const [steps, changeSteps] = useState<StepObjProps[]>([]);
  const begin = () => {
    const strsteps = JSON.stringify(steps);
    console.log(strsteps)
    router.navigate({
      pathname: "/start",
      params: { type: "focus", id: id, steps:strsteps }
    });
  };
  const d:string[] = ["Task 1", "Task 2", "Task A", "aaaa"];
  const [suggestions, setSuggestions] = useState([""]);
  useEffect(() => {
    let cur:string[] = [];
    for (const s of d) {
      if (s.includes(id) && s !== id) {
        cur.push(s);
      }
    }
    setSuggestions(cur);
  }, [id]);
  return (
    <View
      style={{
        flex: 1,
        padding: 16
      }}
    >
      <Title>Hike Mode</Title> <br />
      <Text style={{ fontWeight: "bold" }}>Enter task name below</Text>
      
      <DataInput data={d} value={id} onChangeText={setId}/>
      <br />
      <StepInput steps={steps} changeSteps={changeSteps}/>
      <br />
      <Button title="Start" onPress={begin} />
    </View>
  );
}
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { DataInput, Title } from "../custom";

interface Task {
  title: string
}

export default function Focus() {
  const [id, setId] = useState("");
  const begin = () => {
    router.navigate({
      pathname: "/start",
      params: { type: "focus", id: id }
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
      
      <br />
      <Button title="Start" onPress={begin} />
    </View>
  );
}
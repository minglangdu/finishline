import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { get } from ".";
import { DataInput, Title } from "../custom";

export default function Timer() {
  const [id, setId] = useState("");
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    get("times").then(data => {
      let next = {"Unnamed Task":1e9};
      if (data != null) {
        next = JSON.parse(data);
      }
      setData(Object.keys(next));
    });
  }, []);
  const begin = () => {
    if (id !== '') {
      router.navigate({
        pathname: "/start",
        params: { type: "timer", id:id }
      });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 16
      }}
    >
      <Title>Sprint Mode</Title><br />
      <Text style={{ fontWeight:"bold" }}>Enter task name below</Text>
      <DataInput data={data} value={id} onChangeText={setId}/>
      <br />
      <Button title="Start" onPress={begin} />
    </View>
  );
}
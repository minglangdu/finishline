import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import { DataInput, Title } from "../custom";

export default function Timer() {
  const [id, setId] = useState("");
  const begin = () => {
    if (id !== '') {
      router.navigate({
        pathname: "/start",
        params: { type: "timer", id:id }
      });
    }
  };
  const data = ["aaa", "bbb", "ccc"];
  return (
    <View
      style={{
        flex: 1,
        padding: 16
      }}
    >
      <Title>Sprint Mode</Title><br />
      <Text style={{ fontWeight:"bold" }}>Enter task name below</Text>
      {/* <TextInput
        placeholder="Task Name"
        value={id}
        onChangeText={text => {
          setId(text);
        }}
        style={{
          borderWidth: 1,
          borderRadius: 3
        }}
      /> */}
      <DataInput data={data} value={id} onChangeText={setId}/>
      <br />
      <Button title="Start" onPress={begin} />
    </View>
  );
}
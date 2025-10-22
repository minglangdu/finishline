import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Title } from "../custom";

export default function Timer() {
  const [id, setId] = useState("Unnamed Task");
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
      <TextInput
        placeholder="Task Name"
        value={id}
        onChangeText={text => {
          setId(text);
        }}
        style={{
          borderWidth: 1,
          borderRadius: 3
        }}
      />
      <br />
      <Button title="Start" onPress={begin} />
      <br />
      <Button title="Home" onPress={() => router.replace("/")} />
    </View>
  );
}
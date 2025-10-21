import { router } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";

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
  return (
    <View
      style={{
        flex: 1,
        padding: 16
      }}
    >
      <TextInput
        placeholder="Task Name"
        value={id}
        onChangeText={text => {
          setId(text);
          if (id == '') setId("Unnamed Task")
        }}
      />
      <Button title="Start" onPress={begin} />
      <br />
      <Button title="Home" onPress={() => router.replace("/")} />
    </View>
  );
}
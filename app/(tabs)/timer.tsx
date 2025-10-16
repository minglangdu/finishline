import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const begin = () => {
    router.navigate({
      pathname: "/start",
      params: { type: "timer" }
    });
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text>Example</Text>
      <Button title="Start" onPress={begin} />
      <Button title="Home" onPress={() => router.replace("/")} />
    </View>
  );
}
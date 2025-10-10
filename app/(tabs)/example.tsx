import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text>Example</Text>
      <Button title="B" onPress={() => router.back()} />
    </View>
  );
}
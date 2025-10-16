import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const args = useLocalSearchParams();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text>{ args.type }</Text>
    </View>
  );
}
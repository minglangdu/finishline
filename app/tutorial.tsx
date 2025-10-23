import { router } from "expo-router";
import { Button, Text, View } from "react-native";
import { store } from "./(tabs)/index";

export default function Tutorial() {
  const done = async () => {
    store("tutorial", "true");
    router.replace("/(tabs)/timer");
  };
  return (
      <View
      style={{
        flex: 1,
        padding: 16
      }}
      >
        <Text>Tutorial Text</Text>
        <Button title='Finish' onPress={done}/>
      </View>
  );
}
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="start" options={{ headerShown: false }} />
    <Stack.Screen name="tutorial" options={{ headerShown: false }} />
    <Stack.Screen name="graph" options={{ headerShown: false }} />
    <Stack.Screen name="heatmap" options={{ headerShown: false }} />
  </Stack>;
}

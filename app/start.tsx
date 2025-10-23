import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { get, store } from "./(tabs)/index";
import { Title } from "./custom";

interface StopwatchProps {
  time: number,
  state: boolean
}

// function Stopwatch({time, state}:StopwatchProps) {
//   useEffect(() => {
//     if (!state) {
//       return;
//     }
//     const interval = setInterval(() => {
//       setSeconds(secs + 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [state, secs]);
//   return (
//     <Text>{ secs }</Text>
//   );
// }

export default function Start() {
  const args = useLocalSearchParams();
  const [state, setState] = useState(true);
  const [secs, setSeconds] = useState(0);
  useEffect(() => {
    if (!state) {
      get("times").then(data => {
        let next:{[key:string]:number} = {};
        if (data != null) {
          next = JSON.parse(data);
        }
        args.id = (Array.isArray(args.id)) ? args.id.join("") : args.id;
        if (typeof(next[args.id]) == "undefined") {
          next[args.id] = 1e9;
        }
        next[args.id] = Math.min(secs, next[args.id]);
        store("times", JSON.stringify(next));
      });
    }
  }, [state]);
  useEffect(() => {
    if (!state) {
      return;
    }
    const interval = setInterval(() => {
      setSeconds(secs + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [state, secs]);

  if (args.type == "timer") {
    return (
      <View
        style={{
          flex: 1,
          padding: 16
        }}
      >
        <Text>Timer</Text>
        <Title>Task Name: { args.id }</Title>
        <Text>{secs}</Text>
        <Button onPress={() => {
          setState(false);
        }} title='Stop' disabled={!state}/>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Focus</Text>
        <Title>Task Name: { args.id }</Title>
        <Text>JSON-ified steps: { args.steps }</Text>
      </View>
    );
  }
}
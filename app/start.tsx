import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { get, store } from "./(tabs)/index";
import { StepObjProps, Title } from "./custom";

interface SprintObj {
  [key:string]:number
}

interface HikeObj {
  [key:string]:number
}

export default function Start() {
  const args = useLocalSearchParams();
  
  if (args.type == "timer") {
    const [state, setState] = useState(true);
    const [secs, setSeconds] = useState(0);
    useEffect(() => {
      if (!state && args.type == "timer") {
        get("times").then(data => {
          let next:SprintObj = {};
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
      } else if (!state && args.type == "focus") {
        // placeholder
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
        <br />
        {state ? <></> : <>
          <br />
          <Text>Congratulations! You finished "{ args.id }"!</Text>
          <Button title="Go back" onPress={() => router.replace("/(tabs)/timer")}/>
        </>}
      </View>
    );
  } else {
    const [cur, setCur] = useState(0);
    const csteps = JSON.parse(((Array.isArray(args.steps)) ? args.steps[0] : args.steps));
    const finishTask = () => {
      get("hikes").then(data => {
        let next:HikeObj = {};
        if (data != null) {
          next = JSON.parse(data);
        }
        next[(Array.isArray(args.id) ? args.id[0] : args.id)] = cur;
        store("hikes", JSON.stringify(next));
      });
      router.replace("/(tabs)/focus");
    }
    return (
      <ScrollView>
        <Text>Focus</Text>
        <Title>Task Name: { args.id }</Title>
        {csteps.map((curstep:StepObjProps, index:number) => (
          <>
            <Text key={index}><strong>Step {index + 1}: </strong>{curstep.title}</Text>
            {(cur == index) ? <Button title="Finish" onPress={() => {setCur(cur + 1)}} /> : <></>}
          </>
        )
        )}
        {(cur >= csteps.length) ? <>
        <br />
        <Text>Congratulations! You finished "{ args.id }"!</Text>
        </> : <></>}
        <Button title="Finish Task" onPress={finishTask}/>
      </ScrollView>
    );
  }
}
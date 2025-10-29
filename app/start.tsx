import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { get, store } from "./(tabs)/index";
import { StepObjProps, TimeDisplay, Title } from "./custom";

interface SprintObj {
  [key:string]:number
}

export interface SprintHistory {
  [key:string]: {time: number, date: string}[]
}

export interface HikeObj {
  [key:string]:{completed: string[], date: string}[]
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
        get("sprinthistory").then(data => {
          let next:SprintHistory = {};
          if (data != null) {
            next = JSON.parse(data);
          }
          args.id = (Array.isArray(args.id)) ? args.id.join("") : args.id;
          const date:Date = new Date();
          const ds:string = date.toISOString();
          if (args.id in next) {
            next[args.id].push({time:secs, date: ds});
          } else {
            next[args.id] = [{time:secs, date: ds}];
          }
          store("sprinthistory", JSON.stringify(next));
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
    return (
      <View
        style={{
          flex: 1,
          padding: 16
        }}
      >
        <Title>Sprint</Title>
        <Text><strong>Task Name</strong>: { args.id }</Text>
        <View style={{
          margin: 5, 
          padding: 10
        }}>
          <TimeDisplay time={secs} />
        </View>
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
        const finished:string[] = [];
        for (let i = 0; i < cur; i ++) {
          finished.push(csteps[i]);
        }
        // console.log(finished);
        const date = new Date();
        const datestring = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate()}`
        const nargs = (Array.isArray(args.id) ? args.id[0] : args.id);
        if (nargs in Object.keys(next)) {
          next[nargs].push({completed: finished, date: datestring});
        } else {
          next[nargs] = [{completed: finished, date: datestring}];
        }
        store("hikes", JSON.stringify(next));
        console.log(next);
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
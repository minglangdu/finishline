import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { Title } from '../custom';

export async function store(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}
export async function get(key: string) {
  const res = await AsyncStorage.getItem(key);
  return res;
}

interface SprintProps {
  name: string,
  time: number
}

function Sprint({name, time}:SprintProps) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = time % 3600;
  return (
    <View style={{
      flexDirection: "row",
      padding: 5,
      margin: 3,
      // width: window.screen.width * 4/5,
      borderWidth: 2, 
      borderRadius: 5, 
      backgroundColor: "lightgray"
    }}>
      <View style={{flex: 2, alignSelf: "center"}}><strong style={{fontFamily:"monospace"}}>{name}</strong></View>
      <View style={{flex: 5, padding: 5, flexDirection:'row', borderWidth: 2, borderRadius: 5, backgroundColor: "black"}}>
        <View style={{flex: 1, flexDirection: "column", alignItems:"center"}}>
          <Text style={{color:"white"}}>{hours}</Text>
          <Text style={{fontSize:10, color:"white"}}>hours</Text>
        </View>
        <View style={{flex: 1, flexDirection: "column", alignItems:"center"}}>
          <Text style={{color:"white"}}>{minutes}</Text>
          <Text style={{fontSize:10, color:"white"}}>minutes</Text>
        </View>
        <View style={{flex: 1, flexDirection: "column", alignItems:"center"}}>
          <Text style={{color:"white"}}>{seconds}</Text>
          <Text style={{fontSize:10, color:"white"}}>seconds</Text>
        </View>
      </View>
    </View>
  );
}

export default function Index() {
  const [showTutorial, setTutorial] = useState(false);
  const [times, setTimes] = useState({});
  const [hikes, setHikes] = useState({});
  useEffect(() => {
    get("tutorial").then(data => {
      if (data == "true") {
        setTutorial(false);
      } else {
        setTutorial(true);
      }
    });
    get("times").then(data => {
      if (typeof data === "string") {
        try {
          setTimes(JSON.parse(data));
        } catch (e) {
          setTimes({});
        }
      } else {
        setTimes({});
      }
    });
    get("hikes").then(data => {
      if (typeof data === "string") {
        try {
          setHikes(JSON.parse(data));
        } catch (e) {
          setHikes({});
        }
      } else {
        setHikes({});
      }
    });
  }, []);
  // useEffect(() => {
  //   AsyncStorage.clear()
  // });
  if (showTutorial) {
    router.replace("/tutorial");
  } else {
    return (
      <ScrollView style={{
        flex: 1,
        padding: 16
      }}>
        <Title>Finish Line</Title>
        <Text></Text>
        <br />
        <Button title="Refresh" onPress={() => {window.location.reload()}} />
        <br />
        <Title>Times</Title> <br />
        <Text style={{fontWeight:"bold", fontSize:20}}>Fastest Sprints</Text>
        {Object.keys(times).length > 0 ?
          <ul>{Array.from(Object.entries(times)).map(([key, value]: [string, any]) => {
            // return <li key={key} style={{fontFamily: "sans-serif"}}> <strong>{key}</strong>: {value}</li>
            return (<Sprint key={key} name={key} time={value} />);
          })}</ul>
          : <Text>No times yet. Start a sprint to fill out this table! </Text>
        }
        <Text style={{fontWeight:"bold", fontSize:20}}>Last Hikes</Text>
        {Object.keys(hikes).length > 0 ?
          <ul>{Array.from(Object.entries(hikes)).map(([key, value]: [string, any]) => {
            return <li key={key} style={{fontFamily: "sans-serif"}}> <strong>{key}</strong>: {value} steps completed</li>
          })}</ul>
          : <Text>No data yet. Start a hike to fill out this table! </Text>
        }
      </ScrollView>
    );
  }
}

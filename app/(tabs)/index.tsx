import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TimeDisplay, Title } from '../custom';

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
      <View style={{flex: 5}}>
        <TimeDisplay time={time} />
      </View>
      <View style={{flexDirection: "column", alignContent: "center"}}>
        <TouchableOpacity style={{padding: 3, borderWidth: 2, borderRadius: 5, margin: 2}}
        onPress={() => {
          router.navigate({
            pathname: "/graph",
            params: { id: name }
          });
        }}>
          <Ionicons name="stats-chart" size={30} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface HikeProps {
  name: string,
  value: {title: string}[]
}

function Hike({name, value}:HikeProps) {
  console.log(name);
  console.log(value);
  return (
    <View style={{
      flexDirection: "column"
    }}>
      <View style={{flex: 3}}>
        <Text>{name}</Text>
      </View>
      {value.map((obj:{title:string}, index: number) => {
        return (<View style={{flex:2}} key={index}>
          <Text>{index + 1}. {obj.title}</Text>
        </View>);
      })}
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
        <Text>Here you can find your times to complete tasks. </Text>
        <br />
        <Button title="Refresh" onPress={() => {window.location.reload()}} />
        <Button title="Clear Data" onPress={async () => {await AsyncStorage.clear();}} color={"red"}/>
        <br />
        <Title>Times</Title> <br />
        <Text style={{fontWeight:"bold", fontSize:20}}>Latest Sprints</Text>
        {Object.keys(times).length > 0 ?
          <ul>{Array.from(Object.entries(times)).map(([key, value]: [string, any]) => {
            // return <li key={key} style={{fontFamily: "sans-serif"}}> <strong>{key}</strong>: {value}</li>
            return (<Sprint key={key} name={key} time={value}/>);
          })}</ul>
          : <Text>No times yet. Start a sprint to fill out this table! </Text>
        }
        <Text style={{fontWeight:"bold", fontSize:20}}>Last Hikes</Text>
        {Object.keys(hikes).length > 0 ?
          <ul>{Array.from(Object.entries(hikes)).map(([key, value]: [string, any]) => {
            return (<Hike name={key} key={key} value={value}/>);
          })}</ul>
          : <Text>No data yet. Start a hike to fill out this table! </Text>
        }
      </ScrollView>
    );
  }
}

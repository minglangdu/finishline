import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Title } from './custom';

export async function store(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}
export async function get(key: string) {
  const res = await AsyncStorage.getItem(key);
  return res;
}

function Tutorial() {
  const done = async () => {
    store("tutorial", "true");
    router.replace("/");
  };
  return (
      <View>
        <Text>Tutorial Text</Text>
        <Button title='Finish' onPress={done}/>
      </View>
  );
}

export default function Index() {
  const [showTutorial, setTutorial] = useState(false);
  const [times, setTimes] = useState({});
  useEffect(() => {
    get("tutorial").then(data => {
      if (data == "true") {
        setTutorial(false);
      } else {
        setTutorial(true);
      }
    });
  }, []);
  useEffect(() => {
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
  }, []);
  // useEffect(() => {
  //   AsyncStorage.clear()
  // });
  if (showTutorial) {
    return (
      <Tutorial />
    );
  } else {
    return (
      <View style={{
        flex: 1,
        padding: 16
      }}>
        <Text>
          aaa
        </Text>
        <Button onPress={() => router.push("/(tabs)/timer")} title='Timer' />
        <br />
        <Button onPress={() => router.push("/(tabs)/focus")} title='Focus' />
        <br />
        <Title>Times</Title>
        <ul>
          {Array.from(Object.entries(times)).map(([key, value]: [string, any]) => {
            return <li key={key}> {key}: {value}</li>
          })}
        </ul>
      </View>
    );
  }
}

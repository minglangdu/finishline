import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

async function store(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}
async function get(key: string) {
  const res = AsyncStorage.getItem(key);
  return res;
}

function Tutorial() {
  const done = async () => {
    console.log("aaa");
    store("tutorial", "true");
    router.replace("/");
  };
  const Next = ({onClick, ...props}) => (<TouchableOpacity
    onPress={onClick}
    style={{  }}
  >
    <Text style={{ color:"#FFF" }}>Next</Text>
  </TouchableOpacity>);
  const Done = ({onClick, ...props}) => (<TouchableOpacity
    onPress={onClick}
    style={{  }}
  >
    <Text style={{ color:"#FFF" }}>Done</Text>
  </TouchableOpacity>);
  return (
      <Onboarding
        onSkip={done}
        onDone={done}
        showNext={true}
        showSkip={true}
        bottomBarHighlight={true}
        containerStyles={{ flex:1 }}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        pages = {[
          {
            backgroundColor: "#000",
            titleStyles: { color: '#000' },
            subTitleStyles: { color:"#F00" },
            title:"aaa",
            subtitle:"tutorial text",
            image: <Ionicons name="home" color="#00F" size={300}/>
          },
          {
            backgroundColor: "#780000ff",
            title:"cd2",
            subtitle:"tutorial text 3"
          }, 
          {
            backgroundColor: "#000",
            titleStyles: { color: '#fff' },
            subTitleStyles: {color: "#0F0"},
            title:"ddc",
            subtitle:"subtitle"
          }
        ]}
      />
  );
}

export default function Index() {
  const [showTutorial, setTutorial] = useState(false);
  useEffect(() => {
    get("tutorial").then(data => {
      if (data == "true") {
        setTutorial(false);
      } else {
        setTutorial(true);
      }
    }
    );
  });
  useEffect(() => {
    AsyncStorage.clear()
  });
  if (showTutorial) {
    return (
      <Tutorial />
    );
  } else {
    return (
      <View style={{
        flex: 1
      }}>
        <Text>
          aaa
        </Text>
        <Button onPress={() => router.push("/(tabs)/timer")} title='Timer' />
        <br />
        <Button onPress={() => router.push("/(tabs)/focus")} title='Focus' />
      </View>
    );
  }
}

import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { AutocompleteInput } from "react-native-autocomplete-input";

interface Task {
  title: string
}

export default function Focus() {
  const [id, setId] = useState("");
  const begin = () => {
    router.navigate({
      pathname: "/start",
      params: { type: "focus", id: id }
    });
  };
  const d:string[] = ["Task 1", "Task 2", "Task A", "aaaa"];
  const [suggestions, setSuggestions] = useState([""]);
  useEffect(() => {
    let cur:string[] = [];
    for (const s of d) {
      if (s.includes(id) && s !== id) {
        cur.push(s);
      }
    }
    setSuggestions(cur);
  }, [id]);
  return (
    <View
      style={{
        flex: 1,
        padding: 16
      }}
    >
      <Text style={{ fontWeight: "bold" }}>Enter task name below</Text>
      
      <AutocompleteInput
        data={suggestions}
        placeholder="Task Name"
        value={id}
        // onChangeText={text => {
        //   setId(text);
        //   if (id == '') setId("Unnamed Task")
        // }}
        onChangeText={setId}
        style={{
          padding: 5,  
          borderWidth: 1,
          borderRadius: 3
        }}
        flatListProps={{
          // keyboardShouldPersistTaps: 'always',
          keyExtractor: (item: string) => item,
          renderItem: ({item}) => (
            <TouchableOpacity onPress={() => setId(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <br />
      <Button title="Start" onPress={begin} />
      <br />
      <Button title="Home" onPress={() => router.replace("/")} />
    </View>
  );
}
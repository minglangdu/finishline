import { useEffect, useRef, useState } from 'react'
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AutocompleteInput } from "react-native-autocomplete-input"

interface Props {
    [key: string]:any
}

export function Title(props:Props) {
    return <Text style={{
        fontSize: 30
    }}>
        {props.children}
    </Text>
}

interface InputProps {
    data: string[],
    value: string,
    onChangeText: React.Dispatch<React.SetStateAction<string>>,
}

export function DataInput ({data, value, onChangeText}:InputProps) {
    const d = data;
    const [suggestions, setSuggestions] = useState([""]);
    // const [id, setId] = useState("");
    const inputRef = useRef(null);
      useEffect(() => {
        if (document.activeElement == inputRef.current) {
            let cur:string[] = [];
            let flag:boolean = false;
            for (const s of d) {
                if (s.includes(value) && s !== value) {
                    cur.push(s);
                }
                if (s === value) {
                    flag = true;
                } 
            }
            if (!flag) {
                setSuggestions(cur);
            } else {
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
      }, [value]);
    return (
        <AutocompleteInput
            ref={inputRef}
            data={suggestions}
            placeholder="Task Name"
            value={value}
            onChangeText={onChangeText}
            style={{
                padding: 5,  
                borderWidth: 1,
                borderRadius: 3
            }}
            flatListProps={{
                // keyboardShouldPersistTaps: 'always',
                keyExtractor: (item: string) => item,
                renderItem: ({item}) => (
                <TouchableOpacity onPress={() => onChangeText(item)}>
                    <Text>{item}</Text>
                </TouchableOpacity>
                ),
            }}
        />
    )
}

export interface StepObjProps {
    title: string
}

interface StepProps {
    steps: StepObjProps[],
    changeSteps: React.Dispatch<React.SetStateAction<StepObjProps[]>>,

}

export function StepInput ({steps, changeSteps}:StepProps) {
    const [newStep, setNewStep] = useState("");
    const addStep = () => {
        let next = steps; 
        steps.push({
            title: newStep
        });
        changeSteps(next);
        setNewStep(""); // to refresh page
    }
    return (
        <>
            <Text>Input Steps:</Text>
            <Text>Length: {steps.length}</Text>
            {steps.map((step, index) => (
                <>
                {/* key used to update the loop, nothing else */}
                <View style={index % 2 === 0 ? { alignItems: "flex-start" } : { alignItems: "flex-end" }} key={newStep}>  
                    <Text>{ step.title }</Text>
                </View>
                </>
            ))}
            <View style={steps.length % 2 === 0 ? { alignItems: "flex-start" } : { alignItems: "flex-end" }} >
                <TextInput 
                    value={newStep}
                    onChangeText={setNewStep}
                    style={{borderWidth: 3}}
                />
                <Button title='Add Step' onPress={addStep}/>
            </View>
        </>
    );
}
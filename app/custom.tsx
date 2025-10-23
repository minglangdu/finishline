import { useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
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

interface StepProps {
    
}

export function StepInput ({}:StepProps) {

}
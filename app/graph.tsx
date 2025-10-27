import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { get } from "./(tabs)/index";
import { Title } from "./custom";
import { SprintHistory } from "./start";

export default function Graph() {
    const args = useLocalSearchParams();
    const [stats, setStats] = useState<SprintHistory>({});
    useEffect(() => {
        get("sprinthistory").then(data => {
            if (typeof data === "string") {
                try {
                    setStats(JSON.parse(data)[(Array.isArray(args.id) ? args.id[0] : args.id)]);
                } catch (e) {
                    setStats({});
                }
            } else {
                setStats({});
            }
            if (data != null) {
                console.log(JSON.parse(data)[(Array.isArray(args.id) ? args.id[0] : args.id)]);
            }
        });
    }, []);
    return (
        <View style={{
            padding: 5,
            margin: 3
        }}>
            <Title>Graph for "{args.id}"</Title>
            
        </View>
    );
}
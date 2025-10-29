import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { get } from "./(tabs)/index";
import { Title } from "./custom";

export default function Graph() {
    const args = useLocalSearchParams();
    const [stats, setStats] = useState<{x: string, y: number}[]>([]);
    useEffect(() => {
        get("sprinthistory").then(data => {
            if (typeof data === "string") {
                try {
                    const cur:{time: number, date: string}[] = JSON.parse(data)[(Array.isArray(args.id) ? args.id[0] : args.id)];
                    let next:{x: string, y: number}[] = [];
                    
                    for (let i = 0; i < cur.length; i ++) {
                        const label = (new Date(cur[i].date)).toLocaleDateString("en-US");
                        next.push(
                            {x: label,
                             y: cur[i].time}
                        );
                    }
                    console.log(next);
                    setStats(next);
                } catch (e) {
                    setStats([]);
                }
            } else {
                setStats([]);
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LineChart 
                    data={stats.map((cur:{x: string, y: number}, index: number) => (
                        {
                            label: (index % 3 == 0 ? cur.x : ""),
                            value: cur.y
                        }
                    ))}
                    xAxisTextNumberOfLines={3}
                />
            </View>
            <Button title="Go Back" onPress={() => router.replace("/(tabs)")}/>
        </View>
    );
}
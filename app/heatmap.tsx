import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Dimensions, Text, View } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";
import { get } from "./(tabs)/index";
import { Title } from "./custom";

export default function Heatmap() {
    const args = useLocalSearchParams();
    const [stats, setStats] = useState<{date: string, count: number}[]>([]);
    useEffect(() => {
        get("hikes").then(data => {
            if (typeof data == "string") {
                try {
                    const nargs = (Array.isArray(args.id) ? args.id[0] : args.id);
                    const cur = JSON.parse(data)[nargs];
                    let next:{date: string, count: number}[] = [];
                    
                    for (let i = 0; i < cur.length; i ++) {
                        const label = cur[i].date;
                        next.push(
                            {date: cur[i].date,
                             count: cur[i].completed}
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
        });
    }, []);
    const screenWidth = Dimensions.get("screen").width;
    return (
        <View style={{
            padding: 5,
            margin: 3
        }}>
            <Title>Past Hikes for "{args.id}"</Title>
            <Text>More saturated squares mean more steps completed. </Text>
            <ContributionGraph 
                values={stats}
                endDate={new Date()}
                numDays={365}
                width={screenWidth}
                height={220}
                tooltipDataAttrs={(value) => ({})}
                chartConfig={{
                    backgroundGradientFrom: '#dfdfdfff',
                    backgroundGradientTo: '#8f8f8fff',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: { borderRadius: 6 }
                }}
            />
            <br />
            <Button title="Go Back" onPress={() => router.replace("/(tabs)")}/>
        </View>
    );
}
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated';
import { store } from "./(tabs)/index";

interface ItemType {
  id: string,
  title: string,
  img?: any
}
interface SlideProps {
  item: ItemType,
  index: number,
  scrollX: number
}

function Slide({item, index, scrollX}:SlideProps) {
  return (
    <Animated.View
    style={{ width: 250, height: 250, justifyContent: "center", alignItems: "center" }}
    key={item.id}>
      <Text>{item.title}</Text>
    </Animated.View>
  );
}

export default function Tutorial() {
  const scrollX = useSharedValue(0);
  const ScrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });
  const items = [
    {
      id: 'welcome',
      title: 'Welcome to Finish Line!',
    },
    {
      id: 'sprint',
      title: 'Do busywork faster in sprint mode',
    },
    {
      id: 'hike',
      title: 'Focus on productivity in hike mode',
    },
    {
      id: 'compare',
      title: 'Compare your times to improve',
    }
  ];
  const done = async () => {
    store("tutorial", "true");
    router.replace("/(tabs)/timer");
  };
  return (
      <View
      style={{
        flex: 1,
        padding: 16
      }}
      >
        <Text>Tutorial Text</Text>
        <View>
          <StatusBar style="auto" />
          <Animated.FlatList
            horizontal
            onScroll={ScrollHandler}
            data={items}
            keyExtractor={(item) => item.id}
            pagingEnabled={true}
            renderItem={({ item, index }) => {
              return <Slide item={item} index={index} scrollX={scrollX} />;
            }}
          />
        </View>
        <Button title='Skip' onPress={done}/>
      </View>
  );
}
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
      name="timer" 
      options={{
        tabBarLabel: "Sprint",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="stopwatch" size={size} color={color} />
        ),
      }}/>
      <Tabs.Screen 
        name="focus"
        options={{
          tabBarLabel: "Hike",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flame" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
      name='index'
      options={{
        tabBarLabel: "Times",
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <Ionicons name='analytics' size={size} color={color} />
        ),
      }}
      />
    </Tabs>
  );
}
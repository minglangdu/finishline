import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="focus"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
      name="timer" 
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="alert-circle-outline" size={size} color={color} />
        ),
      }}/>
    </Tabs>
  );
}
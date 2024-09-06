import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, Tabs, router } from 'expo-router';
import { Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// combine the tab screens and the screens under the app folder together
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          // if anyone presses on the search bar, we will bring up the search screen and keyboard
          header: () => 
          <Pressable 
            style={{ width: "100%", paddingHorizontal: 20, paddingTop: 50 }}
            onPress={() => router.push("/search")}>
            <TextInput
              placeholder="Search Stocks..."
              onPressIn={() => router.push("/search")}
              disabled
              mode="outlined"
              left={<TextInput.Icon icon={"magnify"} />}
            />
          </Pressable>
        }}
      />
      <Tabs.Screen
        name="favorited"
        options={{
          title: 'Favorited',
          tabBarIcon: ({ color }) => <TabBarIcon name="favorite" color={color} />,
        }}
      />
    </Tabs>
  );
}

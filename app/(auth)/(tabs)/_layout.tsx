import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useTheme } from "@/app/ThemeContext"; // Import useTheme
import { Fontisto, Ionicons } from "@expo/vector-icons";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <FontAwesome
      size={28}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}

export default function TabLayout() {
  const { theme } = useTheme(); // Access the theme from the context

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.separator, // Use tint color from theme
        headerShown: false,
        tabBarInactiveBackgroundColor: theme.background, // Use background color from theme
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => (
            <Fontisto
              name="shopping-sale"
              size={25}
              color={color}
            />
          ),
        }}
      />
      {/* Wishlist Tab */}
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Faves",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="heart"
              size={25}
              color={color}
            />
          ),
        }}
      />
      {/* Chat Tab */}
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="chatbubbles-outline"
              size={25}
              color={color}
            />
          ),
        }}
      />
      {/* Account Tab */}
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="user"
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

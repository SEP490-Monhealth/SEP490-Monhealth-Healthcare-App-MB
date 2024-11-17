import React from "react"

import { Tabs } from "expo-router"

import { Home, Profile } from "iconsax-react-native"

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#d97706"
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Home
              color={focused ? "#d97706" : "#555"}
              size={20}
              variant={focused ? "Bold" : "Outline"}
            />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Profile
              color={focused ? "#d97706" : "#555"}
              size={20}
              variant={focused ? "Bold" : "Outline"}
            />
          )
        }}
      />
    </Tabs>
  )
}

export default TabLayout

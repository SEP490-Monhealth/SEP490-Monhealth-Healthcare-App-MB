import React from "react"

import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native"

import { Tabs } from "expo-router"

import { userRoutes } from "@/configs/routes"

import { COLORS } from "@/constants/color"

function UserTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          paddingTop: 4,
          paddingHorizontal: 12
        },
        tabBarButton: (props) => {
          // @ts-ignore toi qua met moi roi
          const newProps: TouchableOpacityProps = {
            ...props,
            delayLongPress: props.delayLongPress ?? undefined,
            activeOpacity: 1,
            disabled: props.disabled ?? undefined,
            onBlur: props.onBlur ?? undefined
          }
          return <TouchableOpacity {...newProps} />
        }
      }}
    >
      {userRoutes.map((route) => {
        if (route.main) {
          return (
            <Tabs.Screen
              key={route.name}
              name={route.name}
              options={{
                tabBarLabel: () => null,
                tabBarIcon: () => (
                  <View className="h-20 w-20 items-center justify-center rounded-full border-[6px] border-white bg-primary">
                    <route.icon variant="Bold" size={24} color="#fff" />
                  </View>
                )
              }}
            />
          )
        }

        return (
          <Tabs.Screen
            key={route.name}
            name={route.name}
            options={{
              tabBarLabel: ({ focused }) => (
                <Text
                  style={{
                    fontFamily: "TikTokDisplay-Medium",
                    fontSize: 11,
                    color: focused ? COLORS.primary : COLORS.accent
                  }}
                >
                  {route.label}
                </Text>
              ),
              tabBarIcon: ({ focused }) => (
                <route.icon
                  variant={focused ? "Bold" : "Linear"}
                  color={focused ? COLORS.primary : COLORS.accent}
                  size={22}
                />
              )
            }}
          />
        )
      })}
    </Tabs>
  )
}

export default UserTabLayout

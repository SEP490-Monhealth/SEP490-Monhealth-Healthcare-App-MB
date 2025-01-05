import React from "react"

import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native"

import { Tabs } from "expo-router"

import {
  ClipboardTick,
  DirectboxDefault,
  Home2,
  Profile,
  Sound
} from "iconsax-react-native"

import { COLORS } from "@/constants/app"

function TabLayout() {
  const primaryColor = COLORS.primary
  const accentColor = COLORS.accent

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: primaryColor,
        tabBarStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          paddingTop: 4,
          paddingHorizontal: 12
        },
        tabBarButton: (props) => {
          // @ts-ignore toi met moi roi
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
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: "TikTokDisplay-Medium",
                fontSize: 11,
                color: focused ? primaryColor : accentColor
              }}
            >
              Trang chủ
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Home2
              variant={focused ? "Bold" : "Linear"}
              color={focused ? primaryColor : accentColor}
              size={22}
            />
          )
        }}
      />

      <Tabs.Screen
        name="questions"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: "TikTokDisplay-Medium",
                fontSize: 11,
                color: focused ? primaryColor : accentColor
              }}
            >
              Hỏi đáp
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <DirectboxDefault
              variant={focused ? "Bold" : "Linear"}
              color={focused ? primaryColor : accentColor}
              size={22}
            />
          )
        }}
      />

      <Tabs.Screen
        name="voice"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <View className="h-20 w-20 items-center justify-center rounded-full border-[6px] border-white bg-primary">
              <Sound color="#fff" size={24} variant="Bold" />
            </View>
          )
        }}
      />

      <Tabs.Screen
        name="report"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: "TikTokDisplay-Medium",
                fontSize: 11,
                color: focused ? primaryColor : accentColor
              }}
            >
              Báo cáo
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <ClipboardTick
              variant={focused ? "Bold" : "Linear"}
              color={focused ? primaryColor : accentColor}
              size={22}
            />
          )
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: "TikTokDisplay-Medium",
                fontSize: 11,
                color: focused ? primaryColor : accentColor
              }}
            >
              Hồ sơ
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Profile
              variant={focused ? "Bold" : "Linear"}
              color={focused ? primaryColor : accentColor}
              size={22}
            />
          )
        }}
      />
    </Tabs>
  )
}

export default TabLayout

import React from "react"

import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native"

import { Tabs } from "expo-router"

import {
  Calendar2,
  DirectNormal,
  FavoriteChart,
  Home2,
  Profile,
  Ram,
  Setting,
  Sound
} from "iconsax-react-native"
import { IconProps } from "iconsax-react-native"

import { COLORS } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"

interface RouteType {
  name: string
  label: string
  icon: React.ComponentType<IconProps>
  main?: boolean
}

const routers: Record<string, RouteType[]> = {
  User: [
    { name: "home", label: "Trang chủ", icon: Home2 },
    { name: "report", label: "Báo cáo", icon: FavoriteChart },
    { name: "voice", label: "", icon: Sound, main: true },
    { name: "consultant", label: "Chuyên viên", icon: DirectNormal },
    { name: "settings", label: "Cài đặt", icon: Setting }
  ],
  Consultant: [
    { name: "dashboard", label: "Trang chủ", icon: Home2 },
    { name: "schedule", label: "Lịch trình", icon: Calendar2 },
    { name: "voice", label: "", icon: Sound, main: true },
    { name: "service", label: "Dịch vụ", icon: Ram },
    { name: "profile", label: "Hồ sơ", icon: Profile }
  ]
}

function TabLayout() {
  const { role } = useAuth()

  const activeRole = role ?? "User"
  const routes = routers[activeRole] || []

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
      {routes.map((route) => {
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

export default TabLayout

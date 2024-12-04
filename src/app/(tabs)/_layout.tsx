import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native"

import { Tabs } from "expo-router"

import { Calendar, Flash, Home2, Profile, Sound } from "iconsax-react-native"

import { COLORS } from "@/constants/appConstants"

function TabLayout() {
  const primaryColor = COLORS.primary
  const descriptionColor = "#64748B"

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: primaryColor,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 80,
          elevation: 0,
          paddingTop: 4
        },
        tabBarButton: (props) => {
          // @ts-ignore
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
                color: focused ? primaryColor : descriptionColor
              }}
            >
              Trang chủ
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Home2
              variant={focused ? "Bold" : "Linear"}
              color={focused ? primaryColor : descriptionColor}
              size={22}
            />
          )
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: "TikTokDisplay-Medium",
                fontSize: 11,
                color: focused ? primaryColor : descriptionColor
              }}
            >
              Hoạt động
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Flash
              variant={focused ? "Bold" : "Linear"}
              color={focused ? primaryColor : descriptionColor}
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
        name="schedule"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: "TikTokDisplay-Medium",
                fontSize: 11,
                color: focused ? primaryColor : descriptionColor
              }}
            >
              Thực đơn
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Calendar
              variant={focused ? "Bold" : "Linear"}
              color={focused ? primaryColor : descriptionColor}
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
                color: focused ? primaryColor : descriptionColor
              }}
            >
              Hồ sơ
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Profile
              variant={focused ? "Bold" : "Linear"}
              color={focused ? primaryColor : descriptionColor}
              size={22}
            />
          )
        }}
      />
    </Tabs>
  )
}

export default TabLayout

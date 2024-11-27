import { TouchableOpacity, TouchableOpacityProps, View } from "react-native"

import { Tabs } from "expo-router"

import { Calendar, Flash, Home2, Profile, Sound } from "iconsax-react-native"

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#d97706",
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
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ focused }) => (
            <Home2
              variant={focused ? "Bold" : "Linear"}
              color={focused ? "#d97706" : "#555"}
              size={22}
            />
          )
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          tabBarLabel: "Hoạt động",
          tabBarIcon: ({ focused }) => (
            <Flash
              variant={focused ? "Bold" : "Linear"}
              color={focused ? "#d97706" : "#555"}
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
          tabBarLabel: "Lịch trình",
          tabBarIcon: ({ focused }) => (
            <Calendar
              variant={focused ? "Bold" : "Linear"}
              color={focused ? "#d97706" : "#555"}
              size={22}
            />
          )
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Thông tin",
          tabBarIcon: ({ focused }) => (
            <Profile
              variant={focused ? "Bold" : "Linear"}
              color={focused ? "#d97706" : "#555"}
              size={22}
            />
          )
        }}
      />
    </Tabs>
  )
}

export default TabLayout

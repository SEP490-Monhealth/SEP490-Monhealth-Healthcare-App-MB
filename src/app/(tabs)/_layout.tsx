import { Platform, View } from "react-native"

import { Tabs } from "expo-router"
import { Activity, Add, Chart, Home2, Setting2 } from "iconsax-react-native"

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500"
        },

        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E5EA",
          height: Platform.OS === "ios" ? 88 : 60,
          paddingBottom: Platform.OS === "ios" ? 34 : 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2
          },
          shadowOpacity: 0.1,
          shadowRadius: 8
        },

        tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color, focused }) => <Home2 variant={focused ? "Bold" : "Linear"} size={22} color={color} />,
          tabBarAccessibilityLabel: "Trang chủ"
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          title: "Báo cáo",
          tabBarIcon: ({ color, focused }) => <Chart variant={focused ? "Bold" : "Linear"} size={22} color={color} />,
          tabBarAccessibilityLabel: "Thống kê dinh dưỡng"
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: focused ? "#007AFF" : "#007AFF",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
                shadowColor: "#007AFF",
                shadowOffset: {
                  width: 0,
                  height: 4
                },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8
              }}
            >
              <Add variant="Linear" size={26} color="#FFFFFF" />
            </View>
          ),
          tabBarAccessibilityLabel: "Thêm bữa ăn mới",
          tabBarLabel: () => null
        }}
      />

      <Tabs.Screen
        name="goals"
        options={{
          title: "Mục tiêu",
          tabBarIcon: ({ color, focused }) => (
            <Activity variant={focused ? "Bold" : "Linear"} size={22} color={color} />
          ),
          tabBarAccessibilityLabel: "Tiến độ mục tiêu cân nặng"
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Cài đặt",
          tabBarIcon: ({ color, focused }) => (
            <Setting2 variant={focused ? "Bold" : "Linear"} size={22} color={color} />
          ),
          tabBarAccessibilityLabel: "Cài đặt ứng dụng"
        }}
      />
    </Tabs>
  )
}

export default TabLayout

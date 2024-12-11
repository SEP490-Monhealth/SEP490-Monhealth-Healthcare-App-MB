import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import {
  Chart2,
  Command,
  Crown1,
  I3Dcube,
  Lock1,
  NotificationStatus,
  Profile,
  Verify
} from "iconsax-react-native"

import {
  Avatar,
  Button,
  Container,
  Content,
  HStack,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { About, General, HealthStats } from "@/components/local/tabs/profile"

import { COLORS } from "@/constants/appConstants"

function ProfileScreen() {
  const router = useRouter()

  const defaultAvatar =
    "https://firebasestorage.googleapis.com/v0/b/diamoondb-1412.appspot.com/o/Monhealth%2Ftests%2Fangrycat.jpg?alt=media&token=542becf5-173f-47c2-951b-b9f79578fa60"

  const generalItems = [
    {
      icon: <Profile variant="Bold" size={24} color={COLORS.primary} />,
      label: "Hồ sơ cá nhân",
      onPress: () => {
        router.push("/users/user-information")
      }
    },
    {
      icon: <Command variant="Bold" size={24} color={COLORS.primary} />,
      label: "Theo dõi sức khỏe",
      onPress: () => {
        router.push("/users/health-tracking")
      }
    },
    {
      icon: <Chart2 variant="Bold" size={24} color={COLORS.primary} />,
      label: "Thống kê sức khỏe",
      onPress: () => {
        router.push("/users/health-stats")
      }
    },
    {
      icon: (
        <NotificationStatus variant="Bold" size={24} color={COLORS.primary} />
      ),
      label: "Nhắc nhở",
      onPress: () => {
        router.push("/users/reminders")
      }
    },
    {
      icon: <Lock1 variant="Bold" size={24} color={COLORS.primary} />,
      label: "Cài đặt bảo mật",
      onPress: () => {
        router.push("/users/security-settings")
      }
    }
  ]

  const aboutItems = [
    {
      icon: <I3Dcube variant="Bold" size={24} color={COLORS.primary} />,
      label: "Thông tin ứng dụng",
      onPress: () => {
        router.push("/about")
      }
    },
    {
      icon: <Verify variant="Bold" size={24} color={COLORS.primary} />,
      label: "Phản hồi và đánh giá",
      onPress: () => {
        router.push("/feedback")
      }
    }
  ]

  const handleLogout = () => {
    console.log("Logout")
    router.push("/(auth)/sign-in")
  }

  return (
    <Container>
      <Header title="Hồ sơ" />

      <Content>
        <ScrollArea>
          <VStack center gap={20} className="mt-4 pb-16">
            <Avatar
              size={144}
              source={defaultAvatar}
              alt="Zotaeus"
              className="items-center"
            />

            <VStack center className="mb-2">
              <Text className="font-tbold text-2xl text-typography">
                Van Huu Toan
              </Text>

              <HStack center gap={4}>
                <Crown1 variant="Bold" size="20" color="#ef4444" />
                <Text className="font-dbold text-lg text-destructive">
                  Vip Member
                </Text>
              </HStack>
            </VStack>

            <HealthStats weight={50} height={170} bmi={17.3} />

            <General generalItems={generalItems} />

            <About aboutItems={aboutItems} />

            <Button variant="danger" onPress={handleLogout} className="w-full">
              Đăng xuất
            </Button>
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ProfileScreen

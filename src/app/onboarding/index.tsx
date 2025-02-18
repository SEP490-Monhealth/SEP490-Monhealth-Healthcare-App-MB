import React, { useState } from "react"

import { Image, Text, View } from "react-native"

import { router } from "expo-router"

import { Button, Container, Progress, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/app"

import { useAuth } from "@/contexts/AuthContext"

interface OnboardingType {
  title: string
  description: string
  image: any
}

const onboardingData: Record<string, OnboardingType[]> = {
  User: [
    {
      title: "Gợi ý các bữa ăn và theo dõi dinh dưỡng",
      description:
        "Ứng dụng gợi ý bữa ăn phù hợp và giúp bạn theo dõi lượng calo, protein, carbs, chất béo",
      image: require("../../../public/images/monhealth-onboarding-1.png")
    },
    {
      title: "Nhắc nhở uống nước hàng ngày",
      description:
        "Nhận thông báo nhắc nhở uống đủ nước mỗi ngày để duy trì sức khỏe",
      image: require("../../../public/images/monhealth-onboarding-2.png")
    },
    {
      title: "Gợi ý bài tập và theo dõi lượng calo đốt",
      description:
        "Ứng dụng giúp lập kế hoạch luyện tập và theo dõi lượng calo đốt",
      image: require("../../../public/images/monhealth-onboarding-3.png")
    }
  ],
  Consultant: [
    {
      title: "Theo dõi sức khỏe của người dùng",
      description:
        "Theo dõi sức khỏe của người dùng và gợi ý bài tập, chế độ ăn uống phù hợp",
      image: require("../../../public/images/monhealth-onboarding-1.png")
    },
    {
      title: "Nhận thông báo khi người dùng cần hỗ trợ",
      description:
        "Nhận thông báo khi người dùng cần hỗ trợ hoặc theo dõi sức khỏe",
      image: require("../../../public/images/monhealth-onboarding-2.png")
    },
    {
      title: "Tạo lịch hẹn và tư vấn trực tuyến",
      description:
        "Tạo lịch hẹn và tư vấn trực tuyến với người dùng mọi lúc mọi nơi",
      image: require("../../../public/images/monhealth-onboarding-3.png")
    }
  ]
}

function OnboardingScreen() {
  const { role } = useAuth()

  const [currentIndex, setCurrentIndex] = useState(0)

  const activeOnboardingData = onboardingData[role ?? "User"]

  const handleNext = () => {
    if (currentIndex < activeOnboardingData.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else if (role === "User") {
      router.replace("/setup/user")
    } else {
      router.replace("/setup/consultant")
    }
  }

  return (
    <Container>
      <VStack gap={32} center className="mt-20">
        <Image
          source={activeOnboardingData[currentIndex].image}
          className="object-cover"
          style={{ width: 320, height: 320 }}
        />

        <VStack gap={12}>
          <Text className="text-center font-tbold text-3xl text-primary">
            {activeOnboardingData[currentIndex].title}
          </Text>

          <Text className="text-center font-tmedium text-base text-accent">
            {activeOnboardingData[currentIndex].description}
          </Text>
        </VStack>

        <View className="w-72">
          <Progress
            height={12}
            progress={(currentIndex + 1) * (100 / activeOnboardingData.length)}
            color={COLORS.PRIMARY.lemon}
          />
        </View>
      </VStack>

      <Button
        size="lg"
        onPress={handleNext}
        className="absolute bottom-4 left-6 right-6"
      >
        {currentIndex === activeOnboardingData.length - 1
          ? "Bắt đầu"
          : "Tiếp tục"}
      </Button>
    </Container>
  )
}

export default OnboardingScreen

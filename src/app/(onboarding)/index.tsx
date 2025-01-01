import React, { useState } from "react"

import { Image, Text, View } from "react-native"

import { router } from "expo-router"

import { Button, Container, Progress, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/app"

const onboardingData = [
  {
    title: "Gợi ý các bữa ăn và theo dõi dinh dưỡng",
    description:
      "Ứng dụng gợi ý bữa ăn phù hợp và giúp bạn theo dõi lượng calo, protein, carbs, chất béo.",
    image: require("../../../public/images/monhealth-onboarding-1.png")
  },
  {
    title: "Nhắc nhở uống nước hàng ngày",
    description:
      "Nhận thông báo nhắc nhở uống đủ nước mỗi ngày để duy trì sức khỏe.",
    image: require("../../../public/images/monhealth-onboarding-2.png")
  },
  {
    title: "Gợi ý bài tập và theo dõi lượng calo đốt",
    description:
      "Ứng dụng giúp lập kế hoạch luyện tập và theo dõi lượng calo đốt.",
    image: require("../../../public/images/monhealth-onboarding-3.png")
  }
]

function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      router.replace("/(onboarding)/welcome")
    }
  }

  return (
    <Container>
      <VStack gap={32} center className="mt-20">
        <Image
          source={onboardingData[currentIndex].image}
          className="object-cover"
          style={{ width: 320, height: 320 }}
        />

        <VStack gap={12}>
          <Text className="text-center font-tbold text-3xl text-primary">
            {onboardingData[currentIndex].title}
          </Text>

          <Text className="text-center font-tmedium text-base text-accent">
            {onboardingData[currentIndex].description}
          </Text>
        </VStack>

        <View className="w-72">
          <Progress
            height={12}
            progress={(currentIndex + 1) * (100 / onboardingData.length)}
            color={COLORS.lemon}
          />
        </View>
      </VStack>

      <Button
        size="lg"
        onPress={handleNext}
        className="absolute bottom-4 left-6 right-6"
      >
        {currentIndex === onboardingData.length - 1 ? "Bắt đầu" : "Tiếp tục"}
      </Button>
    </Container>
  )
}

export default OnboardingScreen

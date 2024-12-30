import React, { useState } from "react"

import { Image, Text, View } from "react-native"

import { router } from "expo-router"

import { ArrowLeft } from "iconsax-react-native"

import {
  Button,
  Container,
  HStack,
  Progress,
  VStack
} from "@/components/global/atoms"

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
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    if (currentSlide < onboardingData.length - 1) {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  const handleDone = () => {
    router.replace("/(onboarding)/welcome")
  }

  return (
    <Container className="flex-1 justify-between">
      <VStack gap={32} center className="pt-20">
        <Image
          source={onboardingData[currentSlide].image}
          className="object-cover"
          style={{ width: 320, height: 320 }}
        />

        <VStack gap={12}>
          <Text className="text-center font-tbold text-3xl text-primary">
            {onboardingData[currentSlide].title}
          </Text>

          <Text className="text-center font-tmedium text-base text-accent">
            {onboardingData[currentSlide].description}
          </Text>
        </VStack>

        <View className="w-72">
          <Progress
            height={12}
            progress={(currentSlide + 1) * (100 / onboardingData.length)}
            color="#eab308"
          />
        </View>
      </VStack>

      <HStack gap={16} className="absolute bottom-0 w-full">
        <Button icon variant="secondary" size="lg" onPress={handlePrevious}>
          <ArrowLeft size={20} color={COLORS.primary} />
        </Button>

        <Button
          size="lg"
          className="flex-1"
          onPress={
            currentSlide < onboardingData.length - 1 ? handleNext : handleDone
          }
        >
          {currentSlide < onboardingData.length - 1 ? "Tiếp tục" : "Bắt đầu"}
        </Button>
      </HStack>
    </Container>
  )
}

export default OnboardingScreen

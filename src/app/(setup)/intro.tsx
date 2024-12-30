import React, { useEffect, useState } from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import { router } from "expo-router"

import { ArrowLeft3 } from "iconsax-react-native"

import { Button, Container, HStack, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/app"

const introSetupData = [
  {
    title: "Theo dõi lượng calo và nước mỗi ngày",
    description:
      "Ghi lại lượng calo nạp vào và nước uống để đạt mục tiêu sức khỏe",
    image: require("../../../public/images/monhealth-onboarding-1.png")
  },
  {
    title: "Nhắc nhở uống nước hàng ngày",
    description:
      "Đặt lịch nhắc nhở uống nước để duy trì đủ lượng nước mỗi ngày, giúp cơ thể luôn khỏe mạnh",
    image: require("../../../public/images/monhealth-onboarding-2.png")
  },
  {
    title: "Tạo lộ trình luyện tập và ghi lại kết quả",
    description:
      "Lập kế hoạch luyện tập, ghi kết quả giúp theo dõi tiến độ và duy trì động lực",
    image: require("../../../public/images/monhealth-onboarding-3.png")
  }
]

function IntroScreen() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const progressBarStyle = useAnimatedStyle(() => {
    const progressWidth = interpolate(currentSlide, [0, 1, 2], [47, 94, 140])
    return {
      width: progressWidth
    }
  })

  const handleNext = () => {
    if (currentSlide < introSetupData.length - 1) {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  const handleStartWelcome = () => {
    router.push("/(onboarding)/welcome")
  }

  return (
    <Container className="flex-1 justify-between">
      <View className="flex-1 justify-center pb-20">
        <VStack gap={30} center>
          <Animated.Image
            source={introSetupData[currentSlide].image}
            className="h-96 w-96 object-cover"
          />

          <VStack gap={10}>
            <Animated.Text className="text-center font-tbold text-3xl text-primary">
              {introSetupData[currentSlide].title}
            </Animated.Text>
            <Animated.Text className="text-center font-tmedium text-base text-secondary">
              {introSetupData[currentSlide].description}
            </Animated.Text>
          </VStack>

          <View className="h-3 w-40 rounded-full bg-border">
            <Animated.View
              className="h-full rounded-full bg-primary"
              style={progressBarStyle}
            />
          </View>
        </VStack>
      </View>

      {currentSlide < introSetupData.length - 1 ? (
        <HStack className="absolute bottom-0 w-full flex-row items-center justify-between p-4">
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentSlide === 0}
          >
            <Text
              className={`font-tmedium ${
                currentSlide === 0 ? "text-background" : "text-secondary"
              }`}
            >
              Quay lại
            </Text>
          </TouchableOpacity>

          <Button size="lg" onPress={handleNext}>
            Tiếp tục
          </Button>
        </HStack>
      ) : (
        <HStack className="absolute bottom-0 w-full flex-row items-center justify-between gap-6 py-4 pr-28">
          <Button size="lg" variant="secondary" onPress={handlePrevious}>
            <ArrowLeft3 size={24} color={COLORS.primary} />
          </Button>

          <Button size="lg" onPress={handleStartWelcome} className="w-full">
            Bắt đầu
          </Button>
        </HStack>
      )}
    </Container>
  )
}

export default IntroScreen

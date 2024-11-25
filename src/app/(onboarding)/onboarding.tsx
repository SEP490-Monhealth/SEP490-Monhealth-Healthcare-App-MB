import React, { useRef, useState } from "react"

import { Image, Text, View } from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler"

import { useRouter } from "expo-router"

import { Button, HStack, VStack } from "@/components/global"

const OnboardingScreen = () => {
  const router = useRouter()

  const data = [
    {
      id: "1",
      title: "Theo dõi lượng calo và nước mỗi ngày",
      description:
        "Ghi lại lượng calo nạp vào và nước uống để đạt mục tiêu sức khỏe",
      image: require("../../../public/images/onboarding-1.png")
    },
    {
      id: "2",
      title: "Gợi ý các món ăn dinh dưỡng",
      description:
        "Đưa ra món ăn phù hợp với nhu cầu, kèm thông tin dinh dưỡng chi tiết",
      image: require("../../../public/images/onboarding-2.png")
    },
    {
      id: "3",
      title: "Tạo lộ trình luyện tập và ghi lại kết quả",
      description:
        "Lập kế hoạch luyện tập, ghi kết quả giúp theo dõi tiến độ và duy trì động lực",
      image: require("../../../public/images/onboarding-3.png")
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)

  const panRef = useRef(null)
  const skipButtonRef = useRef(null)

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      console.log("Onboarding completed")
      router.replace("/(onboarding)/welcome")
    }
  }

  const handleSkip = () => {
    console.log("Skipped onboarding")
    router.replace("/(onboarding)/welcome")
  }

  const handleSwipe = (direction: string) => {
    if (!isSwiping) {
      setIsSwiping(true)
      if (direction === "left" && currentIndex < data.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else if (direction === "right" && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
      setTimeout(() => setIsSwiping(false), 300)
    }
  }

  return (
    <VStack className="flex min-h-screen justify-end px-5">
      <Text
        className="font-nmedium absolute right-5 top-16 text-lg active:underline"
        onPress={handleSkip}
      >
        Bỏ qua
      </Text>

      <VStack>
        <PanGestureHandler
          simultaneousHandlers={skipButtonRef}
          onGestureEvent={({ nativeEvent }) => {
            if (nativeEvent.velocityX < -800) {
              handleSwipe("left")
            } else if (nativeEvent.velocityX > 800) {
              handleSwipe("right")
            }
          }}
        >
          <View>
            <VStack gap={8} className="items-center">
              <Image
                source={data[currentIndex].image}
                resizeMode="cover"
                style={{ width: 320, height: 320 }}
              />

              <Text className="font-nbold text-center text-2xl">
                {data[currentIndex].title}
              </Text>

              <Text className="font-nregular text-center text-lg text-typography-description">
                {data[currentIndex].description}
              </Text>

              <HStack
                gap={8}
                className="mt-8 flex-row items-center justify-center"
              >
                {data.map((_, index) => (
                  <View
                    key={index}
                    className={`h-4 rounded-full ${
                      currentIndex === index
                        ? "w-10 bg-primary"
                        : "w-4 bg-gray-200"
                    }`}
                  />
                ))}
              </HStack>
            </VStack>
          </View>
        </PanGestureHandler>
      </VStack>

      <Button
        variant="primary"
        size="md"
        onPress={handleNext}
        className="mt-24"
      >
        {currentIndex < data.length - 1 ? "Tiếp tục" : "Hoàn tất"}
      </Button>
    </VStack>
  )
}

export default OnboardingScreen

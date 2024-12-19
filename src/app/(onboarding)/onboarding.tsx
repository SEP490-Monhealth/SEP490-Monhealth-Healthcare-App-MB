import React, { useState } from "react"

import { Image, Text, View } from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler"

import { useRouter } from "expo-router"

import { Button, Container, HStack, VStack } from "@/components/global/atoms"

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

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      console.log("Onboarding completed")
      router.push("/(onboarding)/welcome")
    }
  }

  const handleSkip = () => {
    console.log("Skipped onboarding")
    router.push("/(onboarding)/welcome")
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
    <Container className="justify-end pb-8">
      <Text
        onPress={handleSkip}
        className="absolute right-5 top-16 font-tmedium text-lg text-primary active:underline"
      >
        Bỏ qua
      </Text>

      <View>
        <PanGestureHandler
          onGestureEvent={({ nativeEvent }) => {
            if (nativeEvent.velocityX < -800) {
              handleSwipe("left")
            } else if (nativeEvent.velocityX > 800) {
              handleSwipe("right")
            }
          }}
        >
          <View>
            <VStack gap={8} center>
              <Image
                source={data[currentIndex].image}
                resizeMode="cover"
                style={{ width: 320, height: 320 }}
              />

              <Text className="text-primaryF text-center font-tbold text-2xl">
                {data[currentIndex].title}
              </Text>

              <Text className="text-center font-tregular text-lg text-slate-400">
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
                        : "w-4 bg-slate-200"
                    }`}
                  />
                ))}
              </HStack>
            </VStack>
          </View>
        </PanGestureHandler>
      </View>

      <Button onPress={handleNext} className="mt-24">
        {currentIndex < data.length - 1 ? "Tiếp tục" : "Hoàn tất"}
      </Button>
    </Container>
  )
}

export default OnboardingScreen

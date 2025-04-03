import { Image, Text, View } from "react-native"

import { VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/color"

export const Welcome = () => {
  return (
    <View className="flex-1 items-center justify-center px-6 pb-40">
      <View
        style={{
          shadowColor: COLORS.PRIMARY.lemon,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 20,
          elevation: 10
        }}
      >
        <Image
          source={require("../../../../../public/images/avatars/mon-ai/mon-ai-avatar.jpg")}
          className="rounded-full"
          style={{ height: 128, width: 128 }}
        />
      </View>
      <VStack center gap={8}>
        <Text className="mt-8 font-tbold text-xl text-primary">
          Chào mừng bạn đến với Mon AI
        </Text>
        <Text className="text-center font-tregular text-base text-accent">
          Tôi là trợ lý AI về dinh dưỡng và tập luyện. Hãy đặt câu hỏi để nhận
          được lời khuyên phù hợp nhất cho bạn!
        </Text>
      </VStack>
    </View>
  )
}

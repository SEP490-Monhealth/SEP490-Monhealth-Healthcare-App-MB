import { Image, Text, View } from "react-native"

import { Button, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/color"

interface ChatWelcomeProps {
  onStartConnection: () => void
}

export const ChatWelcome = ({ onStartConnection }: ChatWelcomeProps) => {
  return (
    <View className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-40">
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
        <Text className="font-tbold text-xl text-primary">
          Chào mừng bạn đến với Mon AI
        </Text>
        <Text className="text-center font-tregular text-base text-accent">
          Tôi là trợ lý AI về dinh dưỡng và tập luyện. Hãy đặt câu hỏi để nhận
          được lời khuyên phù hợp nhất cho bạn!
        </Text>
      </VStack>

      <Button onPress={onStartConnection} className="mt-4 w-full">
        Bắt đầu
      </Button>
    </View>
  )
}

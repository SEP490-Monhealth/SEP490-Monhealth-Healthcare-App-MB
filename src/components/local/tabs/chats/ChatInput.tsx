import { TouchableOpacity, View } from "react-native"

import { Pause, Send2 } from "iconsax-react-native"

import { HStack, Input } from "@/components/global/atoms"

interface ChatInputProps {
  value: string
  onChangeText: (text: string) => void
  onSubmit: () => void
  isDisabled: boolean
  isAITyping: boolean
}

export const ChatInput = ({
  value,
  onChangeText,
  onSubmit,
  isDisabled,
  isAITyping
}: ChatInputProps) => {
  return (
    <HStack center gap={16} className="border-t border-border py-4">
      <View className="flex-1">
        <Input
          placeholder="Nhập tin nhắn..."
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        disabled={isDisabled}
        onPress={onSubmit}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary"
      >
        {isAITyping ? (
          <Pause variant="Bold" size="20" color="white" />
        ) : (
          <Send2 variant="Bold" size="20" color="white" />
        )}
      </TouchableOpacity>
    </HStack>
  )
}

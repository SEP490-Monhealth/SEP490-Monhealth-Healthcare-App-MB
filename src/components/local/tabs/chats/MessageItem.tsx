import { Image, Text, View } from "react-native"

import { MessageType, isAIMessage } from "@/types/chat"

import { cn } from "@/lib/utils"

import { MessageContent } from "./MessageContent"

interface MessageItemProps {
  item: MessageType
  userId?: string
}

export const MessageItem = ({ item, userId }: MessageItemProps) => {
  if (!item) return null

  const isSent = item.sender === userId

  return (
    <View
      className={cn(
        "mb-4 flex-row items-end",
        isSent ? "justify-end" : "justify-start"
      )}
    >
      {!isSent && (
        <Image
          source={require("../../../../../public/images/avatars/mon-ai/mon-ai-avatar.jpg")}
          className="mr-2 h-10 w-10 rounded-full"
        />
      )}

      <View
        className={cn(
          "rounded-2xl px-4 py-3",
          isSent ? "self-end bg-primary" : "self-start bg-muted"
        )}
        style={{ maxWidth: "80%" }}
      >
        {isAIMessage(item) ? (
          <MessageContent content={item.content} />
        ) : (
          <Text
            className={cn(
              "font-tregular text-base",
              isSent ? "text-white" : "text-primary"
            )}
          >
            {item.content}
          </Text>
        )}
      </View>
    </View>
  )
}

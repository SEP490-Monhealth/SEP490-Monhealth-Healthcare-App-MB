import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { cn } from "@/lib/utils"

import { formatTime } from "@/utils/formatters"

interface MessageCardProps {
  type: "sent" | "received"
  message: string
  timestamp: string
  avatarUrl?: string
}

export const MessageCard = ({
  type,
  message,
  timestamp,
  avatarUrl
}: MessageCardProps) => {
  const isSent = type === "sent"

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={cn(
        "flex-row items-end",
        isSent ? "justify-end" : "justify-start"
      )}
    >
      {!isSent && avatarUrl && (
        <Image
          source={{ uri: avatarUrl }}
          className="mr-2 h-10 w-10 rounded-full"
        />
      )}

      <View
        className={cn(
          "max-w-[70%] rounded-xl px-4 py-2",
          isSent ? "self-end bg-primary" : "self-start bg-muted"
        )}
      >
        <Text
          className={cn(
            "font-tregular text-base",
            isSent ? "text-white" : "text-primary"
          )}
        >
          {message}
        </Text>
        <Text
          className={cn(
            "mt-1 font-tregular text-xs text-accent",
            isSent ? "text-left" : "text-right"
          )}
        >
          {formatTime(timestamp)}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

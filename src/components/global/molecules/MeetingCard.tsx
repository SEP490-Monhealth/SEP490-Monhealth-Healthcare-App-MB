import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/color"

import { Card } from "../atoms"

interface MeetingCardProps {
  meetingUrl?: string
  onPress?: () => void
}

export const MeetingCard = ({ meetingUrl, onPress }: MeetingCardProps) => {
  const displayMeetingUrl = meetingUrl
    ? meetingUrl.replace(/^https?:\/\//, "")
    : null

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      className="flex-row items-center justify-between"
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
      >
        <Image
          source={require("../../../../public/images/google-meet-logo-image.png")}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      <View className="flex-1">
        <Text className="font-tmedium text-base text-primary">Google Meet</Text>

        <Text className="font-tmedium text-sm text-accent">
          {displayMeetingUrl}
        </Text>
      </View>

      <ChevronRight size={20} color={COLORS.primary} />
    </TouchableOpacity>
  )
}

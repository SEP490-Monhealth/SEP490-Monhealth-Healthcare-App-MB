import React, { useState } from "react"

import { Image, Text, View } from "react-native"

import { getInitials } from "@/utils/helpers"

interface AvatarProps {
  source: string
  alt?: string
  size?: number
  className?: string
}

export const Avatar = ({
  source,
  alt = "",
  size = 50,
  className = ""
}: AvatarProps) => {
  const [imgError, setImgError] = useState(false)

  return (
    <View className={className}>
      {imgError || !source ? (
        <View
          className="border-border bg-border flex items-center justify-center rounded-full border-4"
          style={{ width: size, height: size }}
        >
          <Text className="font-tbold text-2xl text-secondary">
            {getInitials(alt)}
          </Text>
        </View>
      ) : (
        <Image
          source={{ uri: source }}
          className="bg-border rounded-full border-4 border-white shadow"
          style={{ width: size, height: size }}
          onError={() => setImgError(true)}
        />
      )}
    </View>
  )
}

import React, { useState } from "react"

import { Image, Text, View } from "react-native"

import { getInitials } from "@/utils/formatters"

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
          className="flex items-center justify-center rounded-full border-4 border-white bg-secondary"
          style={{ width: size, height: size }}
        >
          <Text className="font-dbold text-2xl text-secondary-foreground">
            {getInitials(alt)}
          </Text>
        </View>
      ) : (
        <Image
          source={{ uri: source }}
          className="rounded-full border-4 border-white bg-secondary shadow"
          style={{ width: size, height: size }}
          onError={() => setImgError(true)}
        />
      )}
    </View>
  )
}

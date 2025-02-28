import React, { useState } from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { Section } from "@/components/global/organisms"

interface ConsultantBioProps {
  bio: string
}

export const ConsultantBio = ({ bio }: ConsultantBioProps) => {
  const [isBioExpanded, setIsBioExpanded] = useState<boolean>(false)

  return (
    <View>
      <Section label="Giới thiệu" margin={false} />

      <Text
        className="-mt-2 text-justify font-tregular text-base text-secondary"
        numberOfLines={isBioExpanded ? undefined : 3}
      >
        {bio}
      </Text>

      {bio.length > 150 && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsBioExpanded(!isBioExpanded)}
        >
          <Text className="font-tmedium text-base text-secondary">
            {isBioExpanded ? "Thu gọn" : "Xem thêm"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

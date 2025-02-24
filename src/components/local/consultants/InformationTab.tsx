import React, { useState } from "react"

import { Text, TouchableOpacity } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { VStack } from "@/components/global/atoms"
import { Section } from "@/components/global/organisms"

import { sampleConsultantsData } from "@/constants/consultants"

export const InformationTab = () => {
  const { consultantId } = useLocalSearchParams() as { consultantId: string }

  const [expanded, setExpanded] = useState(false)

  const consultantData = sampleConsultantsData.find(
    (c) => c.consultantId === consultantId
  )

  if (!consultantData) return <LoadingScreen />

  return (
    <VStack className="mt-2">
      <Section label="Về tôi" margin={false} />

      <Text
        className="-mt-2 text-justify font-tregular text-base text-secondary"
        numberOfLines={expanded ? undefined : 3}
      >
        {consultantData.bio}
      </Text>

      {consultantData.bio.length > 150 && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setExpanded(!expanded)}
        >
          <Text className="font-tmedium text-base text-primary">
            {expanded ? "Thu gọn" : "Xem thêm"}
          </Text>
        </TouchableOpacity>
      )}
    </VStack>
  )
}

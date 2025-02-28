import React from "react"

import { Linking, View } from "react-native"

import { VStack } from "@/components/global/atoms"
import { CertificateCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { sampleConsultantsData } from "@/constants/consultants"

export const CertificateTab = () => {
  const certificatesData = sampleConsultantsData[0].certificates

  const handleDownload = (certificateLink: string) => {
    Linking.openURL(certificateLink)
  }

  return (
    <View className="mt-2">
      <Section label="Tất cả chứng chỉ" margin={false} />

      <VStack gap={12}>
        {certificatesData.map((certificate, index) => (
          <CertificateCard
            key={index}
            href={certificate}
            onPress={() => handleDownload(certificate)}
          />
        ))}
      </VStack>
    </View>
  )
}

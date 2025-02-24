import React from "react"

import { Linking } from "react-native"

import { VStack } from "@/components/global/atoms"
import { CertificateCard } from "@/components/global/molecules"

import { sampleConsultantsData } from "@/constants/consultants"

export const CertificateTab = () => {
  const certificatesData = sampleConsultantsData[0].certificates

  console.log(certificatesData)

  const handleDownload = (certificateLink: string) => {
    Linking.openURL(certificateLink)
  }

  return (
    <VStack gap={12} className="mt-2">
      {certificatesData.map((certificate, index) => (
        <CertificateCard
          key={index}
          href={certificate}
          onPress={() => handleDownload(certificate)}
        />
      ))}
    </VStack>
  )
}

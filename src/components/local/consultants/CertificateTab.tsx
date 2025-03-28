import React, { useEffect } from "react"

import { Linking, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { VStack } from "@/components/global/atoms"
import { CertificateCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { useGetCertificatesByConsultantId } from "@/hooks/useCertificate"

interface CertificateTabProps {
  onLoading: (isLoading: boolean) => void
  onOverlayLoading: (isLoading: boolean) => void
}

export const CertificateTab = ({
  onLoading,
  onOverlayLoading
}: CertificateTabProps) => {
  const { consultantId } = useLocalSearchParams() as { consultantId: string }

  const { data: certificatesData, isLoading } =
    useGetCertificatesByConsultantId(consultantId)

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const handleDownload = (certificateLink: string) => {
    Linking.openURL(certificateLink)
  }

  useEffect(() => {
    onLoading?.(isLoading)
  }, [isLoading, onLoading])

  useEffect(() => {
    onOverlayLoading?.(isFetching > 0 || isMutating > 0)
  }, [isFetching, isMutating, onOverlayLoading])

  return (
    <View className="mt-2">
      <Section label="Tất cả chứng chỉ" margin={false} />

      <VStack gap={12}>
        {certificatesData?.map((certificate, index) => (
          <CertificateCard
            key={index}
            number={certificate.number}
            name={certificate.name}
            issueDate={certificate.issueDate}
            expiryDate={certificate.expiryDate}
            issuedBy={certificate.issuedBy}
            imageUrls={certificate.imageUrls}
            onPress={() => handleDownload(certificate.imageUrls[0])}
          />
        ))}
      </VStack>
    </View>
  )
}

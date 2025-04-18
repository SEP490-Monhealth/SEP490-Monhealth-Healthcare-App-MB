import React, { useEffect } from "react"

import { View } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { VStack } from "@/components/global/atoms"
import { CertificateCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { useGetCertificatesByConsultantId } from "@/hooks/useCertificate"

interface CertificateTabProps {
  onOverlayLoading: (isLoading: boolean) => void
}

export const CertificateTab = ({ onOverlayLoading }: CertificateTabProps) => {
  const router = useRouter()
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const { data: certificatesData } =
    useGetCertificatesByConsultantId(consultantId)

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  useEffect(() => {
    onOverlayLoading?.(isFetching > 0 || isMutating > 0)
  }, [isFetching, isMutating, onOverlayLoading])

  const handleViewCertificate = () => {
    router.push(`/consultants/${consultantId}/certificates`)
  }

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
            onPress={handleViewCertificate}
          />
        ))}
      </VStack>
    </View>
  )
}

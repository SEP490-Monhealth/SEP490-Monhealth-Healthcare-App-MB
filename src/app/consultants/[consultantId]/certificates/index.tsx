import React from "react"

import { Image, Linking, TouchableOpacity } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import {
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useGetCertificatesByConsultantId } from "@/hooks/useCertificate"

function ConsultantCertificatesScreen() {
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const { data: certificatesData, isLoading } =
    useGetCertificatesByConsultantId(consultantId)

  const handleViewCertificate = (imageUrl: string) => {
    Linking.openURL(imageUrl)
  }

  if (!certificatesData || isLoading) return <LoadingScreen />

  return (
    <Container>
      <Header back label="Chứng chỉ" />

      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={20} className="pb-12">
            {certificatesData?.map((certificate) =>
              certificate.imageUrls.map((imageUrl, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => handleViewCertificate(imageUrl)}
                  className="rounded-xl border border-border"
                >
                  <Image
                    source={{ uri: imageUrl }}
                    className="h-52 w-full rounded-2xl"
                  />
                </TouchableOpacity>
              ))
            )}
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ConsultantCertificatesScreen

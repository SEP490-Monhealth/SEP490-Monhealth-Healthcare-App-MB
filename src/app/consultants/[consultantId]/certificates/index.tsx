import React from "react"

import { Image, View } from "react-native"

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

  if (!certificatesData || isLoading) return <LoadingScreen />

  return (
    <Container>
      <Header back label="Chứng chỉ" />

      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={20} className="pb-12">
            {certificatesData?.map((certificate) =>
              certificate.imageUrls.map((imageUrl, index) => (
                <View key={index} className="rounded-xl border border-border">
                  <Image
                    source={{ uri: imageUrl }}
                    className="h-52 w-full rounded-2xl"
                  />
                </View>
              ))
            )}
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ConsultantCertificatesScreen

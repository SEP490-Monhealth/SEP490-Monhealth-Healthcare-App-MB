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

function CertificateViewScreen() {
  const { consultantId } = useLocalSearchParams() as { consultantId: string }

  const { data: certificatesData, isLoading } =
    useGetCertificatesByConsultantId(consultantId)

  if (!certificatesData || isLoading) return <LoadingScreen />

  return (
    <Container>
      <Header back label="Hình ảnh chứng chỉ" />
      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={20} className="pb-20">
            {certificatesData?.map((certificate, index) =>
              certificate.imageUrls.map((imageUrl, imageIndex) => (
                <View
                  key={imageIndex}
                  className="rounded-2xl border border-border"
                >
                  <Image
                    source={{ uri: imageUrl }}
                    style={{
                      width: "100%",
                      height: 200
                    }}
                    className="rounded-2xl"
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

export default CertificateViewScreen

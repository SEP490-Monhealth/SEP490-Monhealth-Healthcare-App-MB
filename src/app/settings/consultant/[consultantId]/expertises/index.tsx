import React from "react"

import { Text } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useGetCertificatesByConsultantId } from "@/hooks/useCertificate"

function ExpertisesConsultantScreen() {
  const { consultantId } = useLocalSearchParams() as {
    consultantId: string
  }

  const { data: certificatesData, isLoading: isCertificatesLoading } =
    useGetCertificatesByConsultantId(consultantId)

  if (!certificatesData || isCertificatesLoading) return <LoadingScreen />

  const certificateData = certificatesData[0]

  return (
    <Container>
      <Header back label="Chứng chỉ & Chuyên môn" />

      <Content className="mt-2">
        <VStack gap={20}>
          <Text>ahihi</Text>
        </VStack>
      </Content>
    </Container>
  )
}

export default ExpertisesConsultantScreen

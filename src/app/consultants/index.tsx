import React from "react"

import { useRouter } from "expo-router"

import {
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { sampleConsultantsData } from "@/constants/consultants"

import { ConsultantCard } from "../../components/global/molecules/ConsultantCard"

function ConsultantsScreen() {
  const router = useRouter()

  const consultantsData = sampleConsultantsData

  const handleViewConsultant = (consultantId: string) => {
    router.push(`/consultants/${consultantId}/details`)
  }

  return (
    <Container>
      <Header back label="Chuyên viên tư vấn" />

      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={12}>
            {consultantsData.map((consultant) => (
              <ConsultantCard
                key={consultant.consultantId}
                name={consultant.fullName}
                avatarUrl={consultant.avatarUrl}
                expertise={consultant.expertise}
                experience={consultant.experience}
                rating={consultant.rating}
                onPress={() => handleViewConsultant(consultant.consultantId)}
              />
            ))}
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ConsultantsScreen

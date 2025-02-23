import React from "react"

import { useRouter } from "expo-router"

import {
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { sampleConsultantData } from "@/constants/consultants"

import { useRouterHandlers } from "@/hooks/useRouter"

import { ConsultantCard } from "../../components/global/molecules/ConsultantCard"

function ConsultantScreen() {
  const consultantsData = sampleConsultantData

  const router = useRouter()
  const { handleViewConsultant } = useRouterHandlers()

  const handleChatConsultant = (userId: string) => {
    console.log(userId)
  }

  return (
    <Container>
      <Header back label="Tư vấn viên" />

      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={12}>
            {consultantsData.map((consultant) => (
              <ConsultantCard
                key={consultant.consultantId}
                name={consultant.name}
                avatarUrl={consultant.avatarUrl}
                expertise={consultant.expertise}
                experience={consultant.experience}
                rating={consultant.rating}
                schedule={consultant.schedule}
                onPress={() => handleViewConsultant(consultant.consultantId)}
                onChatPress={() => handleChatConsultant(consultant.userId)}
              />
            ))}
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ConsultantScreen

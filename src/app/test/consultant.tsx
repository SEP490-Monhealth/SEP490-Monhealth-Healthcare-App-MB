import React from "react"

import {
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { sampleConsultantData } from "@/constants/consultant"

import { ConsultantCard } from "./ConsultantCard"

function ConsultantScreen() {
  const consultantData = sampleConsultantData

  const handleViewConsultant = (consultantId: string) => {
    console.log(consultantId)
  }

  const handleChatConsultant = (userId: string) => {
    console.log(userId)
  }

  return (
    <Container>
      <Header back label="Tư vấn viên" />
      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={12}>
            {consultantData.map((consultant) => {
              const expertiseNames = consultant.expertise
                .map((item) => item.name)
                .join(", ")

              return (
                <ConsultantCard
                  key={consultant.consultantId}
                  name={consultant.user.fullName}
                  avatarUrl={consultant.user.avatarUrl}
                  expertise={expertiseNames}
                  experience={consultant.experience}
                  rating={consultant.rating}
                  schedule={consultant.schedule}
                  onPress={() => handleViewConsultant(consultant.consultantId)}
                  onChatStart={() =>
                    handleChatConsultant(consultant.user.userId)
                  }
                />
              )
            })}
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ConsultantScreen

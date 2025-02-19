import React from "react"

import { Text, View } from "react-native"

import {
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { sampleConsultantData } from "@/constants/consultants"

import { ConsultantCard } from "../../components/global/molecules/ConsultantCard"

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
              return (
                <ConsultantCard
                  key={consultant.consultantId}
                  name={consultant.name}
                  avatarUrl={consultant.avatarUrl}
                  expertise={consultant.expertise}
                  experience={consultant.experience}
                  rating={consultant.rating}
                  date={consultant.date}
                  onPress={() => handleViewConsultant(consultant.consultantId)}
                  onChatPress={() => handleChatConsultant(consultant.userId)}
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

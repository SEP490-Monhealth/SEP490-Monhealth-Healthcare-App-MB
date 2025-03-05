import React, { useState } from "react"

import { useRouter } from "expo-router"

import { MessageText1 } from "iconsax-react-native"

import { Container, Content, Schedule, VStack } from "@/components/global/atoms"
import { ConsultantCard } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { sampleConsultantsData } from "@/constants/consultants"

function ConsultantScreen() {
  const router = useRouter()

  const today = new Date()

  const consultantsData = sampleConsultantsData

  const [selectedDate, setSelectedDate] = useState<string | null>(
    today.toISOString()
  )

  console.log(selectedDate)

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    console.log(date)
  }

  const handleViewConsultant = (consultantId: string) => {
    router.push(`/consultants/${consultantId}/details`)
  }

  return (
    <Container>
      <Header
        label="Chuyên viên"
        action={{
          icon: (
            <MessageText1 variant="Bold" size={20} color={COLORS.primary} />
          ),
          href: "/chats/user"
        }}
      />

      <Content className="mt-2 pb-12">
        <VStack gap={20}>
          <Schedule initialDate={today} onDateSelect={handleDateSelect} />

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
        </VStack>
      </Content>
    </Container>
  )
}
export default ConsultantScreen

import React, { useState } from "react"

import { useRouter } from "expo-router"

import { SearchNormal1 } from "iconsax-react-native"

import { Container, Content, Input, VStack } from "@/components/global/atoms"
import { ConsultantCard, CustomHeader } from "@/components/global/molecules"

import { COLORS } from "@/constants/color"
import { sampleConsultantsData } from "@/constants/consultants"

function ConsultantScreen() {
  const router = useRouter()

  const consultantsData = sampleConsultantsData

  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleViewConsultant = (consultantId: string) => {
    router.push(`/consultants/${consultantId}`)
  }

  return (
    <Container>
      <CustomHeader
        content={
          <Input
            value={searchQuery}
            placeholder="Tìm kiếm chuyên viên tư vấn..."
            onChangeText={(text) => setSearchQuery(text)}
            startIcon={<SearchNormal1 size={20} color={COLORS.primary} />}
            canClearText
          />
        }
      />

      <Content className="mt-2">
        <VStack gap={20}>
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

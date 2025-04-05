import React from "react"

import { Text } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { Add } from "iconsax-react-native"

import { Container, Content } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

const ScheduleExceptionsScreen = () => {
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  return (
    <Container>
      <Header
        back
        label="Lịch nghỉ"
        action={{
          icon: <Add size={24} color={COLORS.primary} />,
          href: `/schedules/consultant/${consultantId}/exceptions/create`
        }}
      />

      <Content className="mt-2">
        <Text>ScheduleExceptionsScreen</Text>
      </Content>
    </Container>
  )
}

export default ScheduleExceptionsScreen

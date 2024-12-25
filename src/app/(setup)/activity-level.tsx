import React, { useState } from "react"

import { Chip, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"
import { frequenciesData } from "@/constants/frequencies"

function ActivityLevelScreen() {
  const [selectedActivity, setSelectedActivity] = useState<number>(1.2)

  const handleSelectCategory = (value: number) => {
    setSelectedActivity(value)
    console.log(value)
  }

  return (
    <Container>
      <Header back label="Thông tin" />

      <Content>
        <VStack gap={12} className="mt-2">
          {frequenciesData.map((activity) => {
            const Icon = activity.icon

            return (
              <Chip
                key={activity.label}
                label={activity.label}
                border={true}
                borderWidth={2}
                size="lg"
                icon={<Icon variant="Bold" size={28} color={COLORS.primary} />}
                selected={selectedActivity === activity.value}
                onPress={() => handleSelectCategory(activity.value)}
              />
            )
          })}
        </VStack>
      </Content>
    </Container>
  )
}

export default ActivityLevelScreen

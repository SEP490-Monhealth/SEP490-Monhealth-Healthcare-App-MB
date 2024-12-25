import React, { useState } from "react"

import { Chip, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"
import { targetsData } from "@/constants/targets"

function TargetSetup() {
  const [selectedActivity, setSelectedActivity] = useState<string>("Giảm cân")

  const handleSelectCategory = (label: string) => {
    setSelectedActivity(label)
    console.log(label)
  }

  return (
    <Container>
      <Header back label="Mục tiêu" />
      <Content>
        <VStack gap={20} className="mt-2">
          {targetsData.map((target) => {
            const Icon = target.icon

            return (
              <Chip
                key={target.label}
                label={target.label}
                description={target.description}
                border={true}
                borderWidth={2}
                size="lg"
                icon={<Icon variant="Bold" size={28} color={COLORS.primary} />}
                selected={selectedActivity === target.label}
                onPress={() => handleSelectCategory(target.label)}
              />
            )
          })}
        </VStack>
      </Content>
    </Container>
  )
}

export default TargetSetup

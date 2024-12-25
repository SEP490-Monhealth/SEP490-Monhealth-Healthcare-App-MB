import React, { useState } from "react"

import { Scale, TrendingDown, TrendingUp } from "lucide-react-native"

import { Chip, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

function SetupTargetScreen() {
  const targetsData = [
    {
      label: "Giảm cân",
      description: "Mục tiêu giảm cân và duy trì vóc dáng",
      icon: TrendingDown
    },
    {
      label: "Giữ cân",
      description: "Mục tiêu duy trì cân nặng hiện tại",
      icon: Scale
    },
    {
      label: "Tăng cân",
      description: "Mục tiêu tăng cân và cải thiện cơ thể",
      icon: TrendingUp
    }
  ]

  const [selectedTarget, setSelectedTarget] = useState("Giảm cân")

  const handleSelectTarget = (label: string) => {
    setSelectedTarget(label)
    console.log(label)
  }

  return (
    <Container>
      <Header back label="Mục tiêu" />

      <Content>
        <VStack gap={12} className="mt-2">
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
                icon={
                  <Icon
                    size={28}
                    color={
                      selectedTarget === target.label
                        ? COLORS.primary
                        : COLORS.accent
                    }
                  />
                }
                selected={selectedTarget === target.label}
                onPress={() => handleSelectTarget(target.label)}
              />
            )
          })}
        </VStack>
      </Content>
    </Container>
  )
}

export default SetupTargetScreen

import React, { useState } from "react"

import { Man, Woman } from "iconsax-react-native"

import { Chip, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

function GenderScreen() {
  const gendersData = [
    {
      label: "Nam",
      value: "Male",
      icon: Man
    },
    {
      label: "Nữ",
      value: "Female",
      icon: Woman
    }
  ]

  const [selectedGender, setSelectedGender] = useState("Male")

  const handleSelectGender = (value: string) => {
    setSelectedGender(value)
    console.log(value)
  }

  return (
    <Container>
      <Header back label="Thông tin" />

      <Content>
        <VStack gap={12} className="mt-2">
          {gendersData.map((gender) => {
            const Icon = gender.icon

            return (
              <Chip
                key={gender.label}
                label={gender.label}
                border={true}
                borderWidth={2}
                size="lg"
                icon={
                  <Icon
                    size={28}
                    color={
                      selectedGender === gender.label
                        ? COLORS.primary
                        : COLORS.accent
                    }
                  />
                }
                selected={selectedGender === gender.value}
                onPress={() => handleSelectGender(gender.value)}
              />
            )
          })}
        </VStack>
      </Content>
    </Container>
  )
}

export default GenderScreen

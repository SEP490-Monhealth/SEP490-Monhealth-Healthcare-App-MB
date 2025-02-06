import React, { useEffect, useState } from "react"

import { Chip, Container, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

const WeightLossData = [
  {
    label: "Giảm cân chậm",
    description: "0.25kg / tuần",
    value: 0.9
  },
  {
    label: "Giảm cân trung bình",
    description: "0.5kg / tuần",
    value: 0.8
  },
  {
    label: "Giảm cân nhanh",
    description: "0.75kg / tuần",
    value: 0.7
  }
]

const WeightGainData = [
  {
    label: "Tăng cân chậm",
    description: "0.25kg / tuần",
    value: 1.1
  },
  {
    label: "Tăng cân trung bình",
    description: "0.5kg / tuần",
    value: 1.2
  },
  {
    label: "Giảm cân nhanh",
    description: "0.75kg / tuần",
    value: 1.3
  }
]

const MaintenanceData = [
  {
    label: "Duy trì cân nặng",
    description: "Không thay đổi",
    value: 1
  }
]

interface CaloriesRatioProps {
  variant: "WeightLoss" | "Maintenance" | "WeightGain"
}

function CaloriesRatioScreen({ variant = "WeightLoss" }: CaloriesRatioProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null)

  const data =
    variant === "WeightLoss"
      ? WeightLossData
      : variant === "WeightGain"
        ? WeightGainData
        : MaintenanceData

  useEffect(() => {
    if (variant === "Maintenance") {
      setSelectedValue(1)
    } else {
      setSelectedValue(data[0]?.value || null)
    }
  }, [variant, data])

  const handleSelectRatio = (value: number) => {
    setSelectedValue(value)
    console.log(selectedValue)
  }

  return (
    <Container>
      <Header back label="Tỉ lệ calo" />
      <VStack gap={12}>
        {data.map((ratio) => {
          return (
            <Chip
              key={ratio.label}
              size="lg"
              border
              borderWidth={2}
              label={ratio.label}
              description={ratio.description}
              selected={selectedValue === ratio.value}
              onPress={() => handleSelectRatio(ratio.value)}
            />
          )
        })}
      </VStack>
    </Container>
  )
}

export default CaloriesRatioScreen

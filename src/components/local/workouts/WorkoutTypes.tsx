import React from "react"

import { useRouter } from "expo-router"

import { Chip, HStack, ScrollArea } from "@/components/global/atoms"

import { WorkoutEnum } from "@/constants/enums"

interface WorkoutTypesProps {
  typesData: { label: string; value: WorkoutEnum }[]
  selectedType: WorkoutEnum | null
  onSelectType: (type: WorkoutEnum | null) => void
}

export const WorkoutTypes = ({
  typesData,
  selectedType,
  onSelectType
}: WorkoutTypesProps) => {
  const router = useRouter()

  console.log(JSON.stringify(typesData, null, 2))

  const types = [{ label: "Tất cả", value: null }, ...typesData]

  const handleViewSavedWorkout = () => router.push("/workouts/saved")

  return (
    <HStack gap={8}>
      <Chip variant="lemon" label="Đã lưu" onPress={handleViewSavedWorkout} />

      <ScrollArea orientation="horizontal" className="flex-1">
        {types.map((type, index) => (
          <Chip
            key={type.value ?? "all"}
            label={type.label}
            selected={selectedType === type.value}
            onPress={() => onSelectType(type.value)}
            className={index === types.length - 1 ? "" : "mr-2"}
          />
        ))}
      </ScrollArea>
    </HStack>
  )
}

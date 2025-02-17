import React from "react"

import { useRouter } from "expo-router"

import { Chip, HStack, ScrollArea } from "@/components/global/atoms"

import { CategoryType } from "@/schemas/categorySchema"

interface WorkoutTypesProps {
  typesData: CategoryType[]
  selectedType: string
  onSelectType: (type: string) => void
}

export const WorkoutTypes = ({
  typesData,
  selectedType,
  onSelectType
}: WorkoutTypesProps) => {
  const router = useRouter()

  const types = ["Tất cả", ...(typesData?.map((typ) => typ.name) || [])]

  const handleViewSavedWorkout = () => router.push("/workouts/saved")

  return (
    <HStack gap={8}>
      <Chip variant="lemon" label="Đã lưu" onPress={handleViewSavedWorkout} />

      <ScrollArea orientation="horizontal" className="flex-1">
        {types.map((type, index) => (
          <Chip
            key={type}
            label={type}
            selected={selectedType === type}
            onPress={() => onSelectType(type)}
            className={index === types.length - 1 ? "" : "mr-2"}
          />
        ))}
      </ScrollArea>
    </HStack>
  )
}

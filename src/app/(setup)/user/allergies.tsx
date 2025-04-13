import React, { useEffect } from "react"

import { Control, FieldValues, useController } from "react-hook-form"

import { Chip, ScrollArea, VStack } from "@/components/global/atoms"

import { useGetAllAllergies } from "@/hooks/useUserAllergy"

interface SetupAllergiesProps {
  control: Control<FieldValues>
  setIsLoading?: (isLoading: boolean) => void
}

function SetupAllergies({ control, setIsLoading }: SetupAllergiesProps) {
  const { data: allergiesData, isLoading: isAllergiesLoading } =
    useGetAllAllergies(1, 100, undefined)

  useEffect(() => {
    if (setIsLoading) {
      setIsLoading(isAllergiesLoading && allergiesData === 0)
    }
  }, [isAllergiesLoading, allergiesData?.allergies, setIsLoading])

  if (allergiesData?.allergies.length === 0 && isAllergiesLoading) {
    return null
  }

  const { field } = useController({
    name: "allergies",
    control
  })

  const handleSelectAllergies = (allergy: string) => {
    const currentValue = field.value || []

    if (currentValue.includes(allergy)) {
      field.onChange(currentValue.filter((item: string) => item !== allergy))
    } else {
      field.onChange([...currentValue, allergy])
    }
  }

  return (
    <ScrollArea>
      <VStack gap={12} className="pb-28">
        {allergiesData?.allergies?.map((allergy) => (
          <Chip
            key={allergy.allergyId}
            size="lg"
            border
            borderWidth={2}
            label={allergy.name}
            description={allergy.description}
            selected={field.value?.includes(allergy.name)}
            onPress={() => handleSelectAllergies(allergy.name)}
          />
        ))}
      </VStack>
    </ScrollArea>
  )
}

export default SetupAllergies

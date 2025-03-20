import React from "react"

import { Chip, HStack, ScrollArea } from "@/components/global/atoms"

import { ExpertiseType } from "@/schemas/expertiseSchema"

interface ConsultantExpertiseProps {
  expertiseData: ExpertiseType[]
  selectedExpertise: string
  onSelectExpertise: (expertise: string) => void
}

export const ConsultantExpertise = ({
  expertiseData,
  selectedExpertise,
  onSelectExpertise
}: ConsultantExpertiseProps) => {
  const expertise = ["Tất cả", ...(expertiseData?.map((cat) => cat.name) || [])]

  return (
    <HStack gap={8}>
      <ScrollArea orientation="horizontal" className="flex-1">
        {expertise.map((expertise, index) => (
          <Chip
            key={expertise}
            label={expertise}
            selected={selectedExpertise === expertise}
            onPress={() => onSelectExpertise(expertise)}
            className={index === expertise.length - 1 ? "" : "mr-2"}
          />
        ))}
      </ScrollArea>
    </HStack>
  )
}

export default ConsultantExpertise

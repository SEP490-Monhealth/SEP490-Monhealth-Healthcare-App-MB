import React, { useEffect } from "react"

import { Text, View } from "react-native"

import { useIsFetching, useIsMutating } from "@tanstack/react-query"

import { Schedule, VStack } from "@/components/global/atoms"

interface BookingTabProps {
  onLoading: (isLoading: boolean) => void
  onOverlayLoading: (isLoading: boolean) => void
}

export const BookingTab = ({
  onLoading,
  onOverlayLoading
}: BookingTabProps) => {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  useEffect(() => {
    if (onOverlayLoading) {
      onOverlayLoading(isFetching > 0 || isMutating > 0)
    }
  }, [isFetching, isMutating, onOverlayLoading])

  const today = new Date()
  return (
    <VStack className="mt-4">
      <Schedule initialDate={today} />
    </VStack>
  )
}

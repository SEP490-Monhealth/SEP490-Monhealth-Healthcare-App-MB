import React from "react"

import { Image, Text } from "react-native"

import { VStack } from "@/components/global/atoms"

import { cn } from "@/lib/utils"

interface ErrorDisplayProps {
  imageSource: any
  title: string
  description: string
  marginTop?: number
}

export const ErrorDisplay = ({
  imageSource,
  title,
  description,
  marginTop
}: ErrorDisplayProps) => {
  const marginClass = marginTop ? `mt-${marginTop}` : "mt-0"

  return (
    <VStack center gap={32} className={cn("px-6", marginClass)}>
      <Image source={imageSource} style={{ width: 240, height: 240 }} />

      <VStack>
        <Text className="text-center font-tbold text-3xl text-primary">
          {title}
        </Text>

        <Text className="text-center font-tmedium text-base text-accent">
          {description}
        </Text>
      </VStack>
    </VStack>
  )
}

import React from "react"

import { Animated, View } from "react-native"

import { VStack } from "@/components/global/atoms"

import { useAnimation } from "@/hooks/useAnimation"

interface ErrorDisplayProps {
  imageSource: any
  title: string
  description: string
}

export const ErrorDisplay = ({
  imageSource,
  title,
  description
}: ErrorDisplayProps) => {
  const { fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim } =
    useAnimation()

  return (
    <VStack center gap={32}>
      <Animated.Image
        source={imageSource}
        style={{
          width: 320,
          height: 320,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }}
      />

      <VStack>
        <Animated.Text
          className="text-center font-tbold text-3xl text-primary"
          style={{
            opacity: textFadeAnim,
            transform: [{ translateY: textTranslateAnim }]
          }}
        >
          {title}
        </Animated.Text>

        <Animated.Text
          className="text-center font-tmedium text-lg text-accent"
          style={{
            opacity: textFadeAnim,
            transform: [{ translateY: textTranslateAnim }]
          }}
        >
          {description}
        </Animated.Text>
      </VStack>
    </VStack>
  )
}

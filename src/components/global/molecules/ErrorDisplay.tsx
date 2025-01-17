import React from "react"

import { Animated } from "react-native"

import { VStack } from "@/components/global/atoms"

import { useAnimation } from "@/hooks/useAnimation"

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
  const { fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim } =
    useAnimation()

  const marginClass = marginTop ? `mt-${marginTop}` : "mt-0"

  return (
    <VStack center gap={32} className={marginClass}>
      <Animated.Image
        source={imageSource}
        style={{
          width: 270,
          height: 270,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }}
      />

      <VStack>
        <Animated.Text
          className="text-center font-tbold text-2xl text-primary"
          style={{
            opacity: textFadeAnim,
            transform: [{ translateY: textTranslateAnim }]
          }}
        >
          {title}
        </Animated.Text>

        <Animated.Text
          className="text-center font-tmedium text-base text-accent"
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

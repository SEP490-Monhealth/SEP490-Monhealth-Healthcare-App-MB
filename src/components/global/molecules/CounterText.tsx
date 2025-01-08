import React, { useEffect, useRef, useState } from "react"

import { Animated, Text } from "react-native"

interface CounterTextProps {
  value: number
  duration?: number
}

export const CounterText = ({ value, duration = 1000 }: CounterTextProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: duration,
      useNativeDriver: false
    }).start()

    const listener = animatedValue.addListener(({ value }) => {
      setDisplayValue(Math.floor(value))
    })

    return () => {
      animatedValue.removeListener(listener)
    }
  }, [value, duration, animatedValue])

  return <Text>{displayValue}</Text>
}

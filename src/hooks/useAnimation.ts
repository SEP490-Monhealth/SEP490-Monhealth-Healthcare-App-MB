import { useEffect, useRef } from "react"

import { Animated } from "react-native"

export const useAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.5)).current
  const textFadeAnim = useRef(new Animated.Value(0)).current
  const textTranslateAnim = useRef(new Animated.Value(20)).current

  useEffect(() => {
    fadeAnim.setValue(0)
    scaleAnim.setValue(0.5)
    textFadeAnim.setValue(0)
    textTranslateAnim.setValue(20)

    const timeout = setTimeout(() => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
          }),
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.2,
              duration: 300,
              useNativeDriver: true
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true
            })
          ])
        ]),
        Animated.parallel([
          Animated.timing(textFadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
          }),
          Animated.timing(textTranslateAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          })
        ])
      ]).start()
    }, 500)

    return () => clearTimeout(timeout)
  }, [fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim])

  return {
    fadeAnim,
    scaleAnim,
    textFadeAnim,
    textTranslateAnim
  }
}

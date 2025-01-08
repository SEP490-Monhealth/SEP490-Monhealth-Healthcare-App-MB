import React from "react"

import { StyleSheet, View } from "react-native"

import LottieView from "lottie-react-native"

export function LoadingScreen() {
  return (
    <View className="h-full min-h-screen flex-1 items-center justify-center bg-background">
      <LottieView
        source={require("../../public/videos/monhealth-loading.json")}
        autoPlay
        loop
        style={{ width: 120, height: 120 }}
      />
    </View>
  )
}

interface LoadingOverlayProps {
  visible: boolean
}

export function LoadingOverlay({ visible }: LoadingOverlayProps) {
  if (!visible) return null

  return (
    <View style={styles.overlay}>
      <LottieView
        source={require("../../public/videos/monhealth-loading.json")}
        autoPlay
        loop
        style={{ width: 120, height: 120 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  }
})

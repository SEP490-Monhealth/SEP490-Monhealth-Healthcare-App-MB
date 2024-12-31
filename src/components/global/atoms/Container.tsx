import React from "react"

import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View
} from "react-native"

interface ContainerProps {
  children: React.ReactNode
  dismissKeyboard?: boolean
}

export const Container: React.FC<ContainerProps> = ({
  children,
  dismissKeyboard = false
}) => {
  if (dismissKeyboard) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
        <SafeAreaView className="flex-1 bg-background">
          <View className="flex-1 px-6">{children}</View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6">{children}</View>
    </SafeAreaView>
  )
}

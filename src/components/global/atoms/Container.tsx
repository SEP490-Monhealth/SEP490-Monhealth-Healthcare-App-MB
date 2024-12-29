import React from "react"

import { TouchableWithoutFeedback, View } from "react-native"
import { Keyboard } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { cn } from "@/lib/utils"

interface ContainerProps {
  testID?: string
  className?: string
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({
  testID,
  className = "",
  children
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      className="flex-1"
    >
      <SafeAreaView testID={testID} className="flex-1 bg-background">
        <View className={cn("px-6", className)}>
          <React.Fragment>{children}</React.Fragment>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

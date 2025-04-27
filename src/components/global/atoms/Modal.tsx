import React, { useEffect, useRef, useState } from "react"

import { Animated, Text, TouchableOpacity, View } from "react-native"

import { HStack } from "./Stack"

interface ModalButtonProps {
  onPress: () => void
  text: string
  style: string
  textStyle: string
}

const ModalButton = ({ onPress, text, style, textStyle }: ModalButtonProps) => (
  <TouchableOpacity activeOpacity={1} onPress={onPress} className={style}>
    <Text className={textStyle}>{text}</Text>
  </TouchableOpacity>
)

interface ModalProps {
  variant?: "confirm" | "alert"
  isVisible: boolean
  dismissable?: boolean
  onClose: () => void
  title: string
  description: string
  showConfirm?: boolean
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
}

export const Modal = ({
  variant = "confirm",
  isVisible,
  dismissable = false,
  onClose,
  title,
  description,
  showConfirm = true,
  confirmText = "Đồng ý",
  cancelText,
  onConfirm
}: ModalProps) => {
  const [visible, setVisible] = useState(isVisible)
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isVisible) {
      setVisible(true)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start()
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      }).start(() => setVisible(false))
    }
  }, [isVisible])

  const variantStyles = {
    confirm: "bg-primary",
    alert: "bg-destructive"
  }

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    onClose()
  }

  if (!visible) return null

  return (
    <View className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 px-10">
      {dismissable && (
        <TouchableOpacity
          className="absolute inset-0 bg-black/50"
          onPress={onClose}
          activeOpacity={1}
        />
      )}

      <Animated.View
        style={{ opacity: fadeAnim }}
        className="w-full rounded-2xl bg-white p-6"
      >
        <View>
          <Text className="font-tbold text-lg text-primary">{title}</Text>
          <Text className="font-tregular text-base text-accent">
            {description}
          </Text>
        </View>

        <View className="my-4 h-px bg-border" />

        <HStack gap={12}>
          {cancelText && (
            <ModalButton
              onPress={onClose}
              text={cancelText}
              style="flex-1 rounded-xl bg-gray-100 px-4 py-3"
              textStyle="text-center font-tmedium text-base text-destructive"
            />
          )}

          {showConfirm && (
            <ModalButton
              onPress={onConfirm ? handleConfirm : onClose}
              text={confirmText}
              style={`flex-1 rounded-xl ${variantStyles[variant]} px-4 py-3`}
              textStyle="text-center font-tmedium text-base text-white"
            />
          )}
        </HStack>
      </Animated.View>
    </View>
  )
}

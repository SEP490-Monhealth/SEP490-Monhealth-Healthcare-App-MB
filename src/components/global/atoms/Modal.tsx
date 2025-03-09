import React, { useEffect, useRef, useState } from "react"

import {
  Animated,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { Input } from "./Input"
import { HStack, VStack } from "./Stack"

interface ModalButtonProps {
  onPress: () => void
  text: string
  style: string
  textStyle: string
  disabled?: boolean
}

const ModalButton = ({
  onPress,
  text,
  style,
  textStyle,
  disabled
}: ModalButtonProps) => (
  <TouchableOpacity
    activeOpacity={1}
    onPress={disabled ? undefined : onPress}
    className={`${style} ${disabled ? "bg-secondary" : ""}`}
    disabled={disabled}
  >
    <Text className={textStyle}>{text}</Text>
  </TouchableOpacity>
)

interface ModalProps {
  variant?: "confirm" | "alert" | "cancel"
  isVisible: boolean
  dismissAble?: boolean
  reason?: string
  onClose: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onReasonChange?: (reason: string) => void
}

export const Modal = ({
  variant = "confirm",
  isVisible,
  dismissAble = false,
  reason,
  onClose,
  title,
  description,
  confirmText = "Đồng ý",
  cancelText,
  onConfirm,
  onReasonChange
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
    alert: "bg-destructive",
    cancel: "bg-primary"
  }

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    onClose()
  }

  if (!visible) return null

  const isConfirmDisabled = variant === "cancel" && !reason

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="absolute inset-0 flex items-center justify-center bg-black/50 px-10">
        {dismissAble && (
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
          <VStack gap={10}>
            {variant === "cancel" && (
              <Input
                placeholder="Nhập lý do"
                value={reason}
                canClearText
                onChangeText={onReasonChange}
              />
            )}

            <HStack gap={12}>
              {cancelText && (
                <ModalButton
                  onPress={onClose}
                  text={cancelText}
                  style="flex-1 rounded-xl bg-gray-100 px-4 py-3"
                  textStyle="text-center font-tmedium text-base text-destructive"
                />
              )}

              <ModalButton
                onPress={onConfirm ? handleConfirm : onClose}
                text={confirmText}
                style={`flex-1 rounded-xl ${variantStyles[variant]} px-4 py-3`}
                textStyle="text-center font-tmedium text-base text-white"
                disabled={isConfirmDisabled}
              />
            </HStack>
          </VStack>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  )
}

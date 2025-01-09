import React from "react"

import { Text, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"

import { HStack, VStack } from "./Stack"

interface DialogProps {
  isVisible: boolean
  onClose: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
}

interface DialogButtonProps {
  onPress: () => void
  text: string
  style: string
  textStyle: string
}

const DialogButton = ({
  onPress,
  text,
  style,
  textStyle
}: DialogButtonProps) => (
  <TouchableOpacity activeOpacity={1} onPress={onPress} className={style}>
    <Text className={textStyle}>{text}</Text>
  </TouchableOpacity>
)

export const Dialog = ({
  isVisible,
  onClose,
  title,
  description,
  confirmText = "Đồng ý",
  cancelText,
  onConfirm
}: DialogProps) => {
  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    onClose()
  }

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={isVisible}
      onBackdropPress={onClose}
      className="px-4"
    >
      <VStack className="rounded-2xl bg-white p-6">
        <View>
          <Text className="font-tbold text-lg text-primary">{title}</Text>
          <Text className="font-tregular text-base text-accent">
            {description}
          </Text>
        </View>

        <View className="mb-3 mt-2 w-full bg-border" style={{ height: 1 }} />

        <HStack gap={12}>
          {cancelText && (
            <DialogButton
              onPress={onClose}
              text={cancelText}
              style="flex-1 rounded-xl bg-gray-100 px-4 py-3"
              textStyle="text-center font-tmedium text-base text-destructive"
            />
          )}
          <DialogButton
            onPress={onConfirm ? handleConfirm : onClose}
            text={confirmText}
            style="flex-1 rounded-xl bg-primary px-4 py-3 "
            textStyle="text-center font-tmedium text-base text-white"
          />
        </HStack>
      </VStack>
    </Modal>
  )
}

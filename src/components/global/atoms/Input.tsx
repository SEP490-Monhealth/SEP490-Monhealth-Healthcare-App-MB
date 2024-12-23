import React, { useRef } from "react"

import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View
} from "react-native"

import { X } from "lucide-react-native"

interface InputProps extends TextInputProps {
  testID?: string
  multiline?: boolean
  numberOfLines?: number
  secureTextEntry?: boolean
  toggleSecureTextEntry?: () => void
  value?: string
  onChangeText?: (text: string) => void
  placeholder?: string
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad"
  iconStart?: React.ReactNode
  iconEnd?: React.ReactNode
  clearText?: boolean
  iconEndAction?: () => void
  errorMessage?: string
  className?: string
}

export const Input: React.FC<InputProps> = ({
  testID,
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
  toggleSecureTextEntry,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  iconStart,
  iconEnd,
  clearText = true,
  iconEndAction,
  errorMessage,
  className = ""
}: InputProps) => {
  const inputRef = useRef<TextInput>(null)

  const hasError = !!errorMessage

  const handleClearText = () => {
    onChangeText?.("")
  }

  return (
    <View testID={testID || "input-view"}>
      <View
        className={`flex-row items-center rounded-2xl border px-4 py-1 ${className} ${
          hasError ? "border-destructive bg-red-50" : "border-border bg-white"
        }`}
        style={{ height: multiline ? undefined : 52 }}
      >
        {iconStart && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => inputRef.current?.focus()}
            className="mr-2"
          >
            <View>{iconStart}</View>
          </TouchableOpacity>
        )}

        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          textAlignVertical={multiline ? "top" : "center"}
          className={`flex-1 py-2 font-tregular ${
            hasError ? "text-destructive" : "text-primary"
          }`}
          style={{
            height: multiline ? numberOfLines * 20 : undefined
          }}
        />

        {clearText && value && !iconEnd && (
          <TouchableOpacity activeOpacity={0.7} onPress={handleClearText}>
            <View className="px-2 py-4">
              <X size={20} color="#cbd5e1" />
            </View>
          </TouchableOpacity>
        )}

        {iconEnd && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={iconEndAction || toggleSecureTextEntry}
          >
            <View className="px-2 py-4">{iconEnd}</View>
          </TouchableOpacity>
        )}
      </View>

      {hasError && (
        <Text className="ml-1 mt-1 font-tregular text-sm text-destructive">
          {errorMessage}
        </Text>
      )}
    </View>
  )
}

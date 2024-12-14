import React, { useRef } from "react"

import { Text, TextInput, TouchableOpacity, View } from "react-native"

import { X } from "lucide-react-native"

interface InputProps {
  multiline?: boolean
  numberOfLines?: number
  value?: string
  onChangeText?: (text: string) => void
  placeholder?: string
  iconStart?: React.ReactNode
  iconEnd?: React.ReactNode
  secureTextEntry?: boolean
  toggleSecureTextEntry?: () => void
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad"
  errorMessage?: string
}

export const Input = ({
  multiline = false,
  numberOfLines = 1,
  value,
  onChangeText,
  placeholder,
  iconStart,
  iconEnd,
  secureTextEntry = false,
  toggleSecureTextEntry,
  keyboardType = "default",
  errorMessage
}: InputProps) => {
  const inputRef = useRef<TextInput>(null)

  const hasError = !!errorMessage

  const handleClearText = () => {
    onChangeText?.("")
  }

  return (
    <View>
      <View
        className={`flex-row items-center rounded-2xl border px-4 py-1 ${
          hasError ? "border-destructive bg-red-50" : "border-border bg-white"
        }`}
        style={{ height: multiline ? undefined : 52 }}
      >
        {iconStart && (
          <TouchableOpacity
            onPress={() => inputRef.current?.focus()}
            activeOpacity={0.7}
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
          className={`flex-1 font-tregular ${
            hasError ? "text-destructive" : "text-typography"
          }`}
          style={{
            height: multiline ? numberOfLines * 20 : undefined
          }}
        />

        {iconEnd ? (
          <TouchableOpacity onPress={toggleSecureTextEntry} activeOpacity={0.7}>
            <View className="px-2 py-4">{iconEnd}</View>
          </TouchableOpacity>
        ) : (
          value && (
            <TouchableOpacity onPress={handleClearText} activeOpacity={0.7}>
              <View className="px-2 py-4">
                <X size={20} color="#cbd5e1" />
              </View>
            </TouchableOpacity>
          )
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

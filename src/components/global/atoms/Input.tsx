import React, { useRef } from "react"

import { Text, TextInput, TouchableOpacity, View } from "react-native"

interface InputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  iconStart?: React.ReactNode
  iconEnd?: React.ReactNode
  secureTextEntry?: boolean
  toggleSecureTextEntry?: () => void
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad"
  errorMessage?: string
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  iconStart,
  iconEnd,
  secureTextEntry = false,
  toggleSecureTextEntry,
  keyboardType = "default",
  errorMessage,
  ...props
}) => {
  const inputRef = useRef<TextInput>(null)

  const hasError = !!errorMessage

  return (
    <View>
      <View
        className={`flex-row items-center rounded-2xl px-4 py-1 ${
          hasError
            ? "border border-red-500 bg-red-50"
            : "border border-slate-200 bg-white"
        }`}
      >
        {iconStart && (
          <TouchableOpacity
            onPress={() => inputRef.current?.focus()}
            activeOpacity={0.8}
            className="mr-2"
          >
            <View>{iconStart}</View>
          </TouchableOpacity>
        )}

        <TextInput
          ref={inputRef}
          className={`flex-1 font-nregular ${
            hasError ? "text-red-500" : "text-typography"
          }`}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          {...props}
        />

        {iconEnd && (
          <TouchableOpacity onPress={toggleSecureTextEntry} activeOpacity={0.8}>
            <View className="-mr-2 p-2">{iconEnd}</View>
          </TouchableOpacity>
        )}
      </View>

      {hasError && (
        <Text className="ml-1 mt-1 font-nregular text-sm text-red-500">
          {errorMessage}
        </Text>
      )}
    </View>
  )
}

export default Input

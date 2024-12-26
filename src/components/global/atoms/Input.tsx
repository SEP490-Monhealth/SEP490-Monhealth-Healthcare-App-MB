import React, { useRef, useState } from "react"

import {
  Keyboard,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View
} from "react-native"

import { X } from "lucide-react-native"

type InputProps = Omit<TextInputProps, "value"> & {
  testID?: string
  disabled?: boolean
  value?: string
  placeholder?: string
  onChangeText?: (text: string) => void
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad"
  isMultiline?: boolean
  numberOfLines?: number
  isSecure?: boolean
  onToggleSecure?: () => void
  alignRight?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  onEndIconPress?: () => void
  canClearText?: boolean
  errorMessage?: string
  className?: string
}

export const Input: React.FC<InputProps> = ({
  testID,
  disabled = false,
  value,
  placeholder = "",
  onChangeText,
  keyboardType = "default",
  isMultiline = false,
  numberOfLines = 1,
  isSecure = false,
  onToggleSecure,
  alignRight = false,
  startIcon,
  endIcon,
  onEndIconPress,
  canClearText = false,
  errorMessage,
  className = "",
  ...props
}: InputProps) => {
  const inputRef = useRef<TextInput>(null)
  const [isFocused, setIsFocused] = useState(false)

  const hasError = !!errorMessage

  const handleClearText = () => {
    if (disabled) return
    onChangeText?.("")
  }

  const handleFocus = () => {
    if (disabled) return
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (!isFocused) {
      Keyboard.dismiss()
    }
  }

  return (
    <View testID={testID || "test-input"}>
      <View
        className={`flex-row items-center rounded-2xl border px-4 py-1 ${className} ${
          hasError ? "border-destructive bg-red-50" : "border-border bg-white"
        } ${disabled ? "border-border bg-border" : ""}`}
        style={{ height: isMultiline ? undefined : 52 }}
      >
        {startIcon && (
          <TouchableOpacity
            activeOpacity={disabled ? 1 : 0.7}
            onPress={() => !disabled && inputRef.current?.focus()}
            className="mr-2"
          >
            <View>{startIcon}</View>
          </TouchableOpacity>
        )}

        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          secureTextEntry={isSecure}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          multiline={isMultiline}
          numberOfLines={isMultiline ? numberOfLines : 1}
          textAlignVertical={isMultiline ? "top" : "center"}
          textAlign={alignRight ? "right" : "left"}
          blurOnSubmit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          className={`flex-1 py-2 font-tregular ${
            hasError ? "text-destructive" : "text-primary"
          } ${disabled ? "text-secondary" : ""}`}
          style={{
            height: isMultiline ? numberOfLines * 20 : undefined
          }}
          {...props}
        />

        {canClearText && value && !endIcon && (
          <TouchableOpacity
            activeOpacity={disabled ? 1 : 0.7}
            onPress={handleClearText}
          >
            <View className="px-2 py-4">
              <X size={20} color="#cbd5e1" />
            </View>
          </TouchableOpacity>
        )}

        {endIcon && (
          <TouchableOpacity
            activeOpacity={disabled ? 1 : 0.7}
            onPress={() => {
              if (disabled) return
              inputRef.current?.focus()
              onEndIconPress?.()
              onToggleSecure?.()
            }}
          >
            <View className="items-center px-2">{endIcon}</View>
          </TouchableOpacity>
        )}
      </View>

      {hasError && errorMessage && (
        <Text className="ml-1 mt-1 font-tregular text-sm text-destructive">
          {errorMessage}
        </Text>
      )}
    </View>
  )
}

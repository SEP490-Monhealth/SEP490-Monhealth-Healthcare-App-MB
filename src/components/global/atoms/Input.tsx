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

import { ErrorText } from "./Typography"

type InputProps = Omit<TextInputProps, "value"> & {
  testID?: string
  disabled?: boolean
  value?: string
  label?: string
  placeholder?: string
  onChangeText?: (text: string) => void
  keyboardType?:
    | "default"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "decimal-pad"
  isMultiline?: boolean
  numberOfLines?: number
  isSecure?: boolean
  onToggleSecure?: () => void
  alignRight?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  alwaysShowEndIcon?: boolean
  onEndIconPress?: () => void
  canClearText?: boolean
  errorMessage?: string
  className?: string
}

export const Input: React.FC<InputProps> = ({
  testID,
  disabled = false,
  value,
  label = "",
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
  alwaysShowEndIcon = false,
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
      {label && (
        <Text
          className={`mb-1 ml-1 font-tregular text-base ${hasError ? "text-destructive" : "text-primary"}`}
        >
          {label}
        </Text>
      )}

      <View
        className={`flex-row items-center rounded-2xl border px-4 py-1 ${className} ${
          hasError ? "border-destructive bg-red-50" : "border-border bg-white"
        } ${disabled ? "border-border bg-border" : ""}`}
        style={{
          height: isMultiline ? undefined : 52,
          alignItems: isMultiline ? "flex-start" : "center"
        }}
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
          } ${disabled ? "text-accent" : ""}`}
          style={{
            height: isMultiline ? numberOfLines * 20 : undefined
          }}
          {...props}
        />

        {canClearText && value && !alwaysShowEndIcon && (
          <TouchableOpacity
            activeOpacity={disabled ? 1 : 0.7}
            onPress={handleClearText}
            className="flex items-center justify-center"
          >
            <View className="z-10 px-2 py-4">
              <X size={12} color="#cbd5e1" />
            </View>
            <View className="absolute rounded-full bg-muted p-3" />
          </TouchableOpacity>
        )}

        {endIcon && (!value || alwaysShowEndIcon) && (
          <TouchableOpacity
            activeOpacity={disabled ? 1 : 0.7}
            onPress={() => {
              if (disabled) return
              if (onToggleSecure) {
                onToggleSecure()
              } else {
                inputRef.current?.focus()
              }
              onEndIconPress?.()
            }}
          >
            <View className="items-center px-2">{endIcon}</View>
          </TouchableOpacity>
        )}
      </View>

      {hasError && errorMessage && <ErrorText text={errorMessage} />}
    </View>
  )
}

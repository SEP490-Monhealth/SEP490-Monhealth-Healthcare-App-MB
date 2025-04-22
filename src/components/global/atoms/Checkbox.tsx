import React from "react"

import { TouchableOpacity } from "react-native"

import { Circle, CircleCheck } from "lucide-react-native"

import { COLORS } from "@/constants/color"

interface CheckboxProps {
  checked?: boolean
  onCheckChange?: (checked: boolean) => void
}

export const Checkbox = ({ checked = false, onCheckChange }: CheckboxProps) => {
  return (
    // <TouchableOpacity
    //   activeOpacity={0.8}
    //   onPress={() => onCheckChange?.(!checked)}
    //   style={{
    //     height: size,
    //     width: size,
    //     borderRadius: size / 2,
    //     borderWidth: checked ? 1.8 : 2,
    //     borderColor: borderColor,
    //     backgroundColor: checked ? activeBackgroundColor : backgroundColor
    //   }}
    //   className="items-center justify-center"
    // >
    //   {checked && (
    //     <View
    //       style={{
    //         height: size / 2,
    //         width: size / 2,
    //         borderRadius: size / 4,
    //         backgroundColor: innerCircleColor
    //       }}
    //     />
    //   )}
    // </TouchableOpacity>

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onCheckChange?.(!checked)}
    >
      {checked ? (
        <CircleCheck size={20} strokeWidth={2.5} color={COLORS.primary} />
      ) : (
        <Circle size={20} strokeWidth={2.5} color={COLORS.primary} />
      )}
    </TouchableOpacity>
  )
}

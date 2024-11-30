import React from "react"

import { TouchableOpacity, View } from "react-native"

import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={cn("bg-card p-5", className)}
    >
      <React.Fragment>{children}</React.Fragment>
    </TouchableOpacity>
  )
}

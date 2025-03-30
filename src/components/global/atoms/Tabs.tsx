import React, { createContext, useContext, useState } from "react"

import { ScrollView, Text, TouchableOpacity, View } from "react-native"

interface TabsContextProps {
  selectedValue: string
  setSelectedValue: (value: string) => void
  contentMarginTop?: number
}

const TabsContext = createContext<TabsContextProps | null>(null)

interface TabsProps {
  defaultValue: string | string[]
  children: React.ReactNode
  contentMarginTop?: number
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  children,
  contentMarginTop = 4,
  className
}) => {
  const initialValue = Array.isArray(defaultValue)
    ? defaultValue[0]
    : defaultValue
  const [selectedValue, setSelectedValue] = useState(initialValue)

  return (
    <TabsContext.Provider
      value={{ selectedValue, setSelectedValue, contentMarginTop }}
    >
      <View className={className}>{children}</View>
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  children: React.ReactNode
  center?: boolean
  gap?: number
  scrollable?: boolean
  className?: string
}

export const TabsList: React.FC<TabsListProps> = ({
  children,
  center = false,
  gap = 32,
  scrollable = false,
  className
}) => {
  const justifyClass = center ? "justify-center" : "justify-start"

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap }}
        className={`flex-row px-2 ${className}`}
      >
        {children}
      </ScrollView>
    )
  }

  return (
    <View
      className={`flex-row px-2 ${justifyClass} ${className}`}
      style={{ gap }}
    >
      {children}
    </View>
  )
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  onChange?: (value: string) => void
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  onChange
}) => {
  const context = useContext(TabsContext)

  if (!context)
    throw new Error("TabsTrigger must be used within a Tabs component")

  const { selectedValue, setSelectedValue } = context
  const isSelected = selectedValue === value

  const handlePress = () => {
    setSelectedValue(value)
    if (onChange) onChange(value)
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex items-center justify-center"
      onPress={handlePress}
    >
      <Text
        className={`text-base ${
          isSelected ? "font-tbold text-primary" : "font-tmedium text-accent"
        }`}
      >
        {children}
      </Text>

      {isSelected && <View className="mt-1 h-1 w-full bg-primary" />}
    </TouchableOpacity>
  )
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  contentMarginTop?: number
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  contentMarginTop
}) => {
  const context = useContext(TabsContext)
  if (!context)
    throw new Error("TabsContent must be used within a Tabs component")

  const { selectedValue, contentMarginTop: globalMarginTop } = context

  if (selectedValue !== value) return null

  const marginTop = contentMarginTop ?? globalMarginTop

  return <View style={{ marginTop }}>{children}</View>
}

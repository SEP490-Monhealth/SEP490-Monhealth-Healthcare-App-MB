import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { DocumentText } from "iconsax-react-native"
import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/color"

import { Card } from "../atoms"

const getFileName = (url: string) => {
  const pathSegments = url.split("/o/")[1]?.split("?")[0]
  const fileName = pathSegments
    ? decodeURIComponent(pathSegments)
    : "File không tìm thấy"

  const fileNameWithoutFolder = fileName.split("/").pop()

  return fileNameWithoutFolder || "File không tìm thấy"
}

interface FileCardProps {
  fileUrl: string
  onPress: () => void
}

export const FileCard = ({ fileUrl, onPress }: FileCardProps) => {
  const fileName = getFileName(fileUrl)

  console.log(fileName)

  return (
    <Card onPress={onPress} className="flex-row items-center justify-between">
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-muted"
      >
        <DocumentText variant="Bold" size="24" color={COLORS.primary} />
      </TouchableOpacity>

      <View className="flex-1">
        <Text className="font-tmedium text-base text-primary">{fileName}</Text>
      </View>

      <ChevronRight size={20} color={COLORS.primary} />
    </Card>
  )
}

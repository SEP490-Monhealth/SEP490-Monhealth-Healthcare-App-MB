import React, { useEffect, useState } from "react"

import { Text, View } from "react-native"

import { DocumentText, Eye, PictureFrame } from "iconsax-react-native"

import { COLORS } from "@/constants/color"

import { Card, HStack, VStack } from "../atoms"
import { IconButton } from "./IconButton"

const fetchFileSize = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, { method: "HEAD" })
    const contentLength = response.headers.get("Content-Length")
    return contentLength
      ? `${(parseInt(contentLength, 10) / (1024 * 1024)).toFixed(2)} MB`
      : "0 MB"
  } catch {
    return "0 MB"
  }
}

const extractFileName = (url: string): string =>
  decodeURIComponent(url).split("/").pop()?.split("?")[0] || "Tệp tin"

const determineFileType = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toUpperCase() || "FILE"
  return extension
}

interface CertificateCardProps {
  href: string
  onPress?: () => void
}

export const CertificateCard = ({ href, onPress }: CertificateCardProps) => {
  const fileName = extractFileName(href)
  const fileType = determineFileType(fileName)
  const isImageFile = fileType === "Image"

  const [fileSize, setFileSize] = useState<string>("0 MB")

  useEffect(() => {
    fetchFileSize(href).then(setFileSize)
  }, [href])

  return (
    <Card>
      <HStack center gap={12} className="justify-between">
        <View className="flex-1 flex-row items-center gap-4">
          {isImageFile ? (
            <PictureFrame variant="Bold" size="32" color={COLORS.primary} />
          ) : (
            <DocumentText variant="Bold" size="32" color={COLORS.primary} />
          )}

          <View className="flex-1">
            <Text
              className="font-tmedium text-base text-primary"
              numberOfLines={1}
            >
              {fileName}
            </Text>
            <Text className="font-tmedium text-sm text-accent">
              {fileType} • {fileSize}
            </Text>
          </View>
        </View>

        <IconButton
          size="sm"
          icon={<Eye variant="Bold" size={16} color={COLORS.primary} />}
          onPress={onPress}
        />
      </HStack>
    </Card>
  )
}

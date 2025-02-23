import React, { useEffect, useState } from "react"

import { Text } from "react-native"

import { Colorfilter } from "iconsax-react-native"
import { MoreHorizontal } from "lucide-react-native"

import { COLORS } from "@/constants/color"

import { getFileSizeFromUrl } from "@/utils/calculations"
import { getFileNameFromUrl } from "@/utils/helpers"

import { Card, HStack, VStack } from "../atoms"
import { IconButton } from "./IconButton"

interface CertificateCardProps {
  variant?: "default" | "more"
  certificateLink: string
  onPress?: () => void
  onMorePress?: () => void
}

export const CertificateCard = ({
  variant = "default",
  certificateLink,
  onPress,
  onMorePress
}: CertificateCardProps) => {
  const [fileSize, setFileSize] = useState<string>("Đang tải...")

  useEffect(() => {
    getFileSizeFromUrl(certificateLink).then(setFileSize)
  }, [certificateLink])

  return (
    <Card onPress={onPress}>
      <HStack center className="justify-between">
        <HStack gap={10} center>
          <Colorfilter variant="Bold" size="30" color={COLORS.primary} />

          <VStack>
            <Text className="font-tmedium text-base text-primary">
              {getFileNameFromUrl(certificateLink)}
            </Text>

            <Text className="font-tmedium text-sm text-accent">
              PDF • {fileSize}
            </Text>
          </VStack>
        </HStack>

        {variant === "more" && (
          <IconButton
            testID="test-icon-more-button"
            size="sm"
            icon={<MoreHorizontal size={20} color={COLORS.primary} />}
            onPress={onMorePress}
          />
        )}
      </HStack>
    </Card>
  )
}

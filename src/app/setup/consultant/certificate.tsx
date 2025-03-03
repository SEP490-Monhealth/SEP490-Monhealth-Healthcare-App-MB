import React from "react"

import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import { Gallery } from "iconsax-react-native"
import { X } from "lucide-react-native"
import { FieldErrors } from "react-hook-form"
import { Control, Controller, FieldValues } from "react-hook-form"

import { Card, VStack } from "@/components/global/atoms"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useConsultantSetupStore } from "@/stores/consultantSetupStore"

import { handleDeleteImage } from "@/utils/images"

interface SetupCertificateProps {
  control: Control<FieldValues>
  errors: FieldErrors<any>
  onPress: () => void
}

function SetupCertificate({ control, errors, onPress }: SetupCertificateProps) {
  const { images } = useConsultantSetupStore()

  return (
    <VStack gap={12}>
      <Card onPress={onPress} className="h-48 justify-center">
        <VStack center gap={8}>
          <Gallery variant="Bold" size={36} color={COLORS.accent} />

          <Text className="font-tregular text-base text-accent">
            Nhấn để chọn hoặc chụp ảnh
          </Text>
        </VStack>
      </Card>

      <View>
        {images.length > 0 && <Section label="Hình ảnh" margin={false} />}

        <View className="flex-row flex-wrap">
          {images.length > 0 &&
            images.map((item, index) => (
              <View
                key={index}
                style={{ width: "30%", aspectRatio: 1, margin: "1.5%" }}
              >
                {item.uri && (
                  <Image
                    source={{ uri: item.uri }}
                    className="h-full w-full rounded-xl"
                  />
                )}

                {(item.uploading || item.deleting) && (
                  <View
                    className="absolute inset-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.5)"
                    }}
                  >
                    <ActivityIndicator size="small" color="#fff" />
                    <Text className="font-tmedium text-sm text-white">
                      {item.progress}%
                    </Text>
                  </View>
                )}

                {!item.uploading && !item.deleting && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleDeleteImage(item.fileName)}
                    className="absolute right-2 top-2 rounded-full bg-border p-1"
                  >
                    <X size={14} color={COLORS.primary} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
        </View>
      </View>
    </VStack>
  )
}

export default SetupCertificate

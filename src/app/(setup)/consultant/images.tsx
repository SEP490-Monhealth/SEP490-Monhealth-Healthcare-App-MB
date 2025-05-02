import React, { useEffect } from "react"

import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import { Feather } from "@expo/vector-icons"
import { Gallery } from "iconsax-react-native"

import { Card, ErrorText, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/color"

import { useConsultantStore } from "@/stores/consultantStore"

import { handleDeleteImageAndUpdateStore } from "@/utils/images"

interface SetupImageProps {
  setValue: any
  errors: any
  openUploadSheet: () => void
}

function SetupImage({ setValue, errors, openUploadSheet }: SetupImageProps) {
  const { imageUrls } = useConsultantStore()

  useEffect(() => {
    const imageUriArray = imageUrls
      .filter((img) => !img.deleting && !img.uploading)
      .map((img) => (typeof img === "string" ? img : img.uri))

    setValue("imageUrls", imageUriArray)
  }, [imageUrls, setValue])

  return (
    <VStack gap={12}>
      <Card onPress={openUploadSheet} className="h-48 justify-center">
        <VStack center gap={8}>
          <Gallery variant="Bold" size={36} color={COLORS.accent} />

          <Text className="font-tregular text-base text-accent">
            Nhấn để chọn hoặc chụp ảnh
          </Text>
        </VStack>
      </Card>

      {errors.imageUrls?.message && imageUrls.length === 0 && (
        <ErrorText error={errors.imageUrls?.message} />
      )}

      <View className="mt-3 flex-row flex-wrap">
        {imageUrls.length > 0 &&
          imageUrls.map((item, index) => (
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
                  activeOpacity={0.8}
                  onPress={() =>
                    handleDeleteImageAndUpdateStore(item.fileName, setValue)
                  }
                  className="absolute right-2 top-2 rounded-full bg-border p-1"
                >
                  <Feather name="x" size={14} color={COLORS.primary} />
                </TouchableOpacity>
              )}
            </View>
          ))}
      </View>
    </VStack>
  )
}

export default SetupImage

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
import { Control, Controller, FieldValues } from "react-hook-form"

import {
  Card,
  ErrorText,
  Input,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useImageUpload } from "@/hooks/useImageUpload"

import { formatISODate } from "@/utils/formatters"
import { handleSelectImage } from "@/utils/images"

interface SetupCertificateProps {
  control: Control<FieldValues>
  errors: any
  openUploadSheet: () => void
  openDateSheet: (type: "issueDate" | "expiryDate") => void
}

function SetupCertificate({
  control,
  errors,
  openUploadSheet,
  openDateSheet
}: SetupCertificateProps) {
  const { images, uploadImage, deleteImage } = useImageUpload()

  const handleImageSelect = async (useLibrary: boolean) => {
    await handleSelectImage(useLibrary, uploadImage)
  }

  return (
    <ScrollArea>
      <View className="pb-24">
        <VStack gap={12}>
          <Controller
            name="number"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                label="Số chứng chỉ"
                placeholder="VD: HCM-00199590"
                onChangeText={onChange}
                canClearText
                errorMessage={errors.number?.message}
              />
            )}
          />

          <Controller
            name="certificate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                label="Tên chứng chỉ"
                placeholder="VD: Chứng chỉ dinh dưỡng cơ bản"
                onChangeText={onChange}
                canClearText
                errorMessage={errors.certificate?.message}
              />
            )}
          />

          <Controller
            name="issueDate"
            control={control}
            render={({ field: { value } }) => (
              <Input
                disabled
                value={value ? formatISODate(value, "dd/MM/yyyy") : ""}
                label="Ngày cấp"
                placeholder="VD: 01/01/2021"
                onPress={() => openDateSheet("issueDate")}
                errorMessage={errors.issueDate?.message}
              />
            )}
          />

          <Controller
            name="expiryDate"
            control={control}
            render={({ field: { value } }) => (
              <Input
                disabled
                value={value ? formatISODate(value, "dd/MM/yyyy") : ""}
                label="Ngày hết hạn"
                placeholder="VD: 01/01/2024"
                onPress={() => openDateSheet("expiryDate")}
                errorMessage={errors.expiryDate?.message}
              />
            )}
          />

          <Controller
            name="issuedBy"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                label="Nơi cấp"
                placeholder="VD: Trường đại học y dược"
                onChangeText={onChange}
                canClearText
                errorMessage={errors.issuedBy?.message}
              />
            )}
          />
        </VStack>

        <Section label="Hình ảnh" />

        <Card onPress={openUploadSheet} className="h-48 justify-center">
          <VStack center gap={8}>
            <Gallery variant="Bold" size={36} color={COLORS.accent} />

            <Text className="font-tregular text-base text-accent">
              Nhấn để chọn hoặc chụp ảnh
            </Text>
          </VStack>
        </Card>

        {errors.imageUrls?.message && images.length === 0 && (
          <ErrorText text={errors.imageUrls?.message} />
        )}

        <View className="mt-3 flex-row flex-wrap">
          {images.map((item, index) => (
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
                  onPress={() => deleteImage(item.fileName)}
                  className="absolute right-2 top-2 rounded-full bg-border p-1"
                >
                  <X size={14} color={COLORS.primary} />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollArea>
  )
}

export default SetupCertificate

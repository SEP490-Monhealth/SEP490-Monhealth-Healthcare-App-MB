import React, { useEffect, useRef, useState } from "react"

import {
  ActivityIndicator,
  Image,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native"

import * as ImagePicker from "expo-image-picker"
import { useLocalSearchParams, useRouter } from "expo-router"

import { storage } from "@/config/firebase"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable
} from "firebase/storage"
import { Camera, Gallery, GalleryAdd } from "iconsax-react-native"
import { X } from "lucide-react-native"

import {
  Button,
  Card,
  Container,
  Content,
  ScrollArea,
  Sheet,
  SheetRefProps,
  SheetSelect,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useConsultantSetupStore } from "@/stores/consultantSetupStore"

import { generateUUID } from "@/utils/helpers"

const uploadOptions = [
  {
    label: "Chọn ảnh từ thư viện",
    value: "library",
    icon: <GalleryAdd variant="Bold" size={24} color={COLORS.secondary} />
  },
  {
    label: "Chụp ảnh từ camera",
    value: "camera",
    icon: <Camera variant="Bold" size={24} color={COLORS.secondary} />
  }
]

function SetupCertificateUpload() {
  const router = useRouter()
  const { expertise } = useLocalSearchParams() as { expertise: string }

  const SheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = 200

  const { images, updateField } = useConsultantSetupStore()

  const openSheet = () => SheetRef.current?.scrollTo(-sheetHeight)
  const closeSheet = () => SheetRef.current?.scrollTo(0)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedImages = useConsultantSetupStore.getState().images
    if (storedImages.length > 0) {
      updateField("images", storedImages)
    }
  }, [])

  useEffect(() => {
    const hasUploading = images.some((img) => img.uploading)
    const hasDeleting = images.some((img) => img.deleting)
    setIsLoading(hasUploading || hasDeleting)
  }, [images])

  const handleSelectImage = async (useLibrary: boolean) => {
    closeSheet()

    let result

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [16, 9],
      quality: 1.0
    }

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options)
    } else {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()

      if (status === "denied") {
        alert(
          "Quyền truy cập camera đã bị từ chối. Vui lòng vào cài đặt thiết bị để cấp quyền."
        )
        return
      }

      if (status === "granted") {
        result = await ImagePicker.launchCameraAsync(options)
      }
    }

    if (result && !result.canceled && result.assets?.length) {
      handleUploadImage(result.assets[0].uri)
    }
  }

  const handleUploadImage = async (uri: string) => {
    const uuid = generateUUID()
    const extension = uri.split(".").pop()
    const fileName = `${uuid}.${extension}`
    const storageRef = ref(storage, `Monhealth/certificates/${fileName}`)

    const newImage = { uri, fileName, uploading: true, progress: 0 }
    updateField("images", [newImage], true)

    const response = await fetch(uri)
    const blob = await response.blob()

    const uploadTask = uploadBytesResumable(storageRef, blob)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )

        updateField(
          "images",
          useConsultantSetupStore
            .getState()
            .images.map((img) =>
              img.fileName === fileName
                ? { ...img, progress: uploadProgress }
                : img
            )
        )
      },
      (error) => {
        console.error("Upload failed:", error)

        updateField(
          "images",
          useConsultantSetupStore
            .getState()
            .images.map((img) =>
              img.fileName === fileName ? { ...img, uploading: false } : img
            )
        )
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

        updateField(
          "images",
          useConsultantSetupStore
            .getState()
            .images.map((img) =>
              img.fileName === fileName
                ? { ...img, uri: downloadURL, uploading: false, progress: 100 }
                : img
            )
        )
      }
    )
  }

  const handleDeleteImage = async (fileName: string) => {
    updateField(
      "images",
      images.map((img) =>
        img.fileName === fileName ? { ...img, deleting: true } : img
      )
    )

    const storageRef = ref(storage, `Monhealth/certificates/${fileName}`)

    try {
      await deleteObject(storageRef)
      console.log("File deleted successfully:", fileName)

      updateField(
        "images",
        images.filter((img) => img.fileName !== fileName)
      )
    } catch (error) {
      console.error("Failed to delete file:", error)
    }
  }

  const handleConfirm = () => {
    if (isLoading) return

    const savedImages = images.map((img) => ({
      fileName: img.fileName,
      uri: img.uri
    }))

    updateField("images", savedImages)

    router.push("/setup/consultant")
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="h-full flex-1 bg-background">
        <Container>
          <Header back label={expertise} />

          <Content className="mt-2">
            <ScrollArea className="flex-1">
              <VStack gap={20}>
                <Card className="h-48 justify-center" onPress={openSheet}>
                  <VStack center gap={8}>
                    <Gallery variant="Bold" size={36} color={COLORS.accent} />

                    <Text className="font-tregular text-base text-accent">
                      Nhấn để chọn hoặc chụp ảnh
                    </Text>
                  </VStack>
                </Card>

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
              </VStack>
            </ScrollArea>

            <Button disabled={isLoading} size="lg" onPress={handleConfirm}>
              Xác nhận
            </Button>
          </Content>
        </Container>

        <Sheet ref={SheetRef} dynamicHeight={sheetHeight}>
          {uploadOptions.map((option) => (
            <SheetSelect
              key={option.value}
              label={option.label}
              icon={option.icon}
              onPress={() => handleSelectImage(option.value === "library")}
            />
          ))}
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default SetupCertificateUpload

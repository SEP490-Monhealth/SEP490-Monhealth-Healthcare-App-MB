import React, { useRef, useState } from "react"

import {
  Alert,
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

import { storage } from "@/configs/firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { Camera, Gallery, GalleryAdd } from "iconsax-react-native"
import { X } from "lucide-react-native"

import {
  Button,
  Card,
  Container,
  Content,
  Sheet,
  SheetRefProps,
  SheetSelect,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useCompleteBooking } from "@/hooks/useBooking"

import { generateUUID } from "@/utils/helpers"

const BookingCompleteScreen = () => {
  const router = useRouter()
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>()

  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [uploading, setUploading] = useState<boolean>(false)

  const SheetRef = useRef<SheetRefProps>(null)

  const sheetHeight = 200

  const { mutate: completeBooking } = useCompleteBooking()

  const openUploadSheet = () => SheetRef.current?.scrollTo(-sheetHeight)
  const closeSheet = () => SheetRef.current?.scrollTo(0)

  const handlePickFromGallery = async () => {
    closeSheet()

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true
    })

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri)
      // console.log(`Selected ${newImages.length} images from gallery`)
      setSelectedImages([...selectedImages, ...newImages])
    }
  }

  const handleTakePhoto = async () => {
    closeSheet()

    const { status } = await ImagePicker.requestCameraPermissionsAsync()

    if (status === "denied") {
      alert(
        "Quyền truy cập camera đã bị từ chối. Vui lòng vào cài đặt thiết bị để cấp quyền."
      )
      return
    }

    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1
      })

      if (!result.canceled) {
        // console.log("Captured image from camera:", result.assets[0].uri)
        setSelectedImages([...selectedImages, result.assets[0].uri])
      }
    }
  }

  const removeImage = (indexToRemove: number) => {
    setSelectedImages(
      selectedImages.filter((_, index) => index !== indexToRemove)
    )
  }

  const uploadImagesToFirebase = async () => {
    if (selectedImages.length === 0) {
      Alert.alert(
        "Thông báo",
        "Vui lòng chọn hoặc chụp ít nhất một ảnh trước khi báo cáo"
      )
      return null
    }

    try {
      setUploading(true)

      const uploadPromises = selectedImages.map(async (imageUri, index) => {
        try {
          const uuid = generateUUID()
          const filename = `Monhealth/bookings/complete/${bookingId}/${uuid}`
          const storageRef = ref(storage, filename)

          const response = await fetch(imageUri)
          const blob = await response.blob()

          const uploadTask = uploadBytesResumable(storageRef, blob)

          return new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(
                  `Upload ${index + 1}/${selectedImages.length} is ${progress.toFixed(0)}% done`
                )
              },
              (error) => {
                console.error(`Upload error for image ${index + 1}:`, error)
                reject(error)
              },
              async () => {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                )
                console.log(`File ${index + 1} available at:`, downloadURL)
                resolve(downloadURL)
              }
            )
          })
        } catch (error) {
          console.error(`Error preparing upload for image ${index + 1}:`, error)
          return null
        }
      })

      const urls = (await Promise.all(uploadPromises)) as (string | null)[]
      const validUrls = urls.filter((url): url is string => url !== null)

      setUploading(false)

      return validUrls
    } catch (error) {
      console.error("Error during multiple uploads:", error)
      setUploading(false)
      return null
    }
  }

  const handleBookingComplete = async () => {
    try {
      const imageUrls = await uploadImagesToFirebase()

      const finalData = {
        bookingId,
        evidenceUrls: imageUrls || []
      }

      // console.log("Final Data", JSON.stringify(finalData.evidenceUrls, null, 2))

      await completeBooking(finalData, {
        onSuccess: () => {
          router.back()
        }
      })
    } catch (error) {
      console.error("Report submission error:", error)
    }
  }

  const renderImageGrid = () => {
    if (selectedImages.length === 0) {
      return null
    }

    return (
      <View className="flex-row flex-wrap gap-2">
        {selectedImages.map((uri, index) => (
          <View key={index} className="relative h-24 w-24">
            <Image
              source={{ uri }}
              resizeMode="cover"
              className="h-full w-full rounded-lg"
            />

            <TouchableOpacity
              className="absolute right-2 top-2 rounded-full bg-border p-1"
              onPress={() => removeImage(index)}
            >
              <X size={14} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header back label="Hoàn thành" />

          <Content className="mt-2">
            <VStack gap={32}>
              <VStack gap={20}>
                <View>
                  <Card
                    onPress={openUploadSheet}
                    className="h-48 justify-center"
                  >
                    <VStack center gap={8}>
                      <Gallery variant="Bold" size={36} color={COLORS.accent} />

                      <Text className="font-tregular text-base text-accent">
                        Nhấn để chọn hoặc chụp ảnh
                      </Text>
                    </VStack>
                  </Card>

                  <Text className="ml-1 mt-4 font-tregular text-sm text-accent">
                    Vui lòng cung cấp hình ảnh chứng minh đã tham gia cuộc họp
                    để hoàn tất lịch hẹn
                  </Text>
                </View>

                {renderImageGrid()}
              </VStack>

              <Button
                loading={uploading}
                disabled={uploading || selectedImages.length === 0}
                onPress={handleBookingComplete}
                className="w-full"
              >
                {uploading ? "Đang tải lên..." : "Hoàn thành"}
              </Button>
            </VStack>
          </Content>
        </Container>

        <Sheet ref={SheetRef} dynamicHeight={sheetHeight}>
          <SheetSelect
            label="Chọn ảnh từ thư viện"
            icon={
              <GalleryAdd variant="Bold" size="24" color={COLORS.secondary} />
            }
            onPress={handlePickFromGallery}
          />

          <SheetSelect
            label="Chụp ảnh từ camera"
            icon={<Camera variant="Bold" size="24" color={COLORS.secondary} />}
            onPress={handleTakePhoto}
          />
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default BookingCompleteScreen

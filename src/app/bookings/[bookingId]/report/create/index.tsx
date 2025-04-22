import React, { useRef, useState } from "react"

import {
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
  ErrorText,
  Input,
  ScrollArea,
  Select,
  Sheet,
  SheetItem,
  SheetRefProps,
  SheetSelect,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useCreateReport } from "@/hooks/useReport"

import { generateUUID } from "@/utils/helpers"

const reportReasonsData = [
  "Không tham gia",
  "Đến muộn",
  "Thiếu chuyên nghiệp",
  "Thái độ không phù hợp",
  "Không giải quyết được vấn đề",
  "Yêu cầu thông tin không cần thiết",
  "Ngắt kết nối",
  "Sự cố kỹ thuật",
  "Khác (Thêm mô tả bên dưới)"
]

const ReportCreateScreen = () => {
  const router = useRouter()
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>()

  const ReasonSheetRef = useRef<SheetRefProps>(null)
  const UploadSheetRef = useRef<SheetRefProps>(null)

  const [selectedReason, setSelectedReason] = useState<string>("")
  const [additionalInfo, setAdditionalInfo] = useState<string>("")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [uploading, setUploading] = useState<boolean>(false)

  const [reasonError, setReasonError] = useState<string>("")
  const [imageError, setImageError] = useState<string>("")
  const [additionalInfoError, setAdditionalInfoError] = useState<string>("")
  const [submissionError, setSubmissionError] = useState<string>("")

  const reasonSheetHeight = 480
  const uploadSheetHeight = 200

  const { mutate: createReport } = useCreateReport()

  const openReasonSheet = () => {
    setReasonError("")
    ReasonSheetRef.current?.scrollTo(-reasonSheetHeight)
  }

  const openUploadSheet = () => {
    setImageError("")
    UploadSheetRef.current?.scrollTo(-uploadSheetHeight)
  }

  const closeSheet = () => {
    ReasonSheetRef.current?.scrollTo(0)
    UploadSheetRef.current?.scrollTo(0)
  }

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
      setSelectedImages([...selectedImages, ...newImages])
      setImageError("")
    }
  }

  const handleTakePhoto = async () => {
    closeSheet()

    const { status } = await ImagePicker.requestCameraPermissionsAsync()

    if (status === "denied") {
      setImageError(
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
        setSelectedImages([...selectedImages, result.assets[0].uri])
        setImageError("")
      }
    }
  }

  const removeImage = (indexToRemove: number) => {
    const updatedImages = selectedImages.filter(
      (_, index) => index !== indexToRemove
    )
    setSelectedImages(updatedImages)

    if (updatedImages.length === 0) {
      setImageError("Vui lòng tải lên ít nhất một hình ảnh")
    }
  }

  const uploadImagesToFirebase = async () => {
    try {
      setUploading(true)
      setSubmissionError("")

      const uploadPromises = selectedImages.map(async (imageUri, index) => {
        try {
          const uuid = generateUUID()
          const filename = `Monhealth/bookings/report/${bookingId}/${uuid}`
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
      setSubmissionError(
        "Có lỗi xảy ra khi tải lên hình ảnh. Vui lòng thử lại sau."
      )
      return null
    }
  }

  const validateForm = () => {
    let isValid = true

    if (!selectedReason) {
      setReasonError("Vui lòng chọn lý do báo cáo")
      isValid = false
    } else {
      setReasonError("")
    }

    if (selectedImages.length === 0) {
      setImageError("Vui lòng tải lên ít nhất một hình ảnh")
      isValid = false
    } else {
      setImageError("")
    }

    if (
      selectedReason === "Khác (Thêm mô tả bên dưới)" &&
      !additionalInfo.trim()
    ) {
      setAdditionalInfoError("Vui lòng nhập thông tin bổ sung")
      isValid = false
    } else {
      setAdditionalInfoError("")
    }

    return isValid
  }

  const handleBookingReport = async () => {
    setSubmissionError("")

    if (!validateForm()) {
      return
    }

    try {
      const imageUrls = await uploadImagesToFirebase()

      if (!imageUrls) {
        setSubmissionError("Không thể tải lên hình ảnh. Vui lòng thử lại sau.")
        return
      }

      const finalReason =
        selectedReason === "Khác (Thêm mô tả bên dưới)"
          ? `Khác: ${additionalInfo.trim()}`
          : selectedReason

      const finalData = {
        bookingId,
        reason: finalReason,
        imageUrls: imageUrls
      }

      // console.log("Final Data", JSON.stringify(finalData, null, 2))

      await createReport(finalData, {
        onSuccess: () => {
          router.back()
        }
      })
    } catch (error) {
      console.error("Report submission error:", error)
      setSubmissionError("Có lỗi xảy ra khi gửi báo cáo. Vui lòng thử lại sau.")
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

  const renderErrorMessage = (errorMessage: string) => {
    if (!errorMessage) return null

    return <ErrorText error={errorMessage} />
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header back label="Báo cáo" />

          <Content className="mt-2">
            <ScrollArea>
              <VStack gap={32}>
                <VStack gap={20}>
                  <VStack gap={12}>
                    <View>
                      <Text className="mb-1 ml-1 font-tregular text-base text-primary">
                        Lý do
                      </Text>

                      <Select
                        defaultValue="Chọn lý do"
                        value={selectedReason}
                        onPress={openReasonSheet}
                      />

                      {renderErrorMessage(reasonError)}
                    </View>

                    {selectedReason === "Khác (Thêm mô tả bên dưới)" && (
                      <View>
                        <Input
                          value={additionalInfo}
                          label="Thông tin bổ sung"
                          placeholder="VD: Lý do không tham gia"
                          onChangeText={(text) => {
                            setAdditionalInfo(text)
                            if (text.trim()) {
                              setAdditionalInfoError("")
                            }
                          }}
                          isMultiline
                          numberOfLines={6}
                          canClearText
                        />

                        {renderErrorMessage(additionalInfoError)}
                      </View>
                    )}

                    <View>
                      <Text className="mb-1 ml-1 font-tregular text-base text-primary">
                        Hình ảnh
                      </Text>

                      <Card
                        onPress={openUploadSheet}
                        className="h-48 justify-center"
                      >
                        <VStack center gap={8}>
                          <Gallery
                            variant="Bold"
                            size={36}
                            color={COLORS.accent}
                          />

                          <Text className="font-tregular text-base text-accent">
                            Nhấn để chọn hoặc chụp ảnh
                          </Text>
                        </VStack>
                      </Card>

                      {renderErrorMessage(imageError)}
                    </View>

                    <Text className="ml-1 font-tregular text-sm text-accent">
                      Vui lòng tải lên hình ảnh liên quan để báo cáo tình trạng
                      cuộc hẹn. Hình ảnh có thể bao gồm bằng chứng tham gia, sự
                      cố kỹ thuật hoặc lý do cần báo cáo
                    </Text>
                  </VStack>

                  {renderImageGrid()}

                  {renderErrorMessage(submissionError)}
                </VStack>

                <Button
                  loading={uploading}
                  disabled={uploading}
                  onPress={handleBookingReport}
                  className="w-full"
                >
                  {uploading ? "Đang tải lên..." : "Báo cáo"}
                </Button>
              </VStack>
            </ScrollArea>
          </Content>
        </Container>

        <Sheet ref={ReasonSheetRef} dynamicHeight={reasonSheetHeight}>
          {reportReasonsData.map((reason) => (
            <SheetItem
              key={reason}
              item={reason}
              isSelected={selectedReason === reason}
              onSelect={(selectedItem) => {
                setSelectedReason(selectedItem)
                setReasonError("")
                ReasonSheetRef.current?.scrollTo(0)
              }}
            />
          ))}
        </Sheet>

        <Sheet ref={UploadSheetRef} dynamicHeight={uploadSheetHeight}>
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

export default ReportCreateScreen

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

import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"

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
  Content,
  ScrollArea,
  Sheet,
  SheetRefProps,
  SheetSelect,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

import { generateUUID } from "@/utils/helpers"

const uploadOptions = [
  {
    label: "Chọn ảnh từ thư viện",
    value: "library",
    icon: <GalleryAdd variant="Bold" size={24} color={COLORS.primary} />
  },
  {
    label: "Chụp ảnh từ camera",
    value: "camera",
    icon: <Camera variant="Bold" size={24} color={COLORS.primary} />
  }
]

const imgDir = FileSystem.documentDirectory + "images/"

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir)
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true })
  }
}

function CertificateUpload() {
  const SheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = 200

  const openSheet = () => {
    SheetRef.current?.scrollTo(-sheetHeight)
  }

  const closeSheet = () => {
    SheetRef.current?.scrollTo(0)
  }

  const [images, setImages] = useState<
    {
      uri: string
      fileName: string
      uploading: boolean
      deleting?: boolean
      progress: number
    }[]
  >([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadImages()
  }, [])

  useEffect(() => {
    const hasUploading = images.some((img) => img.uploading)
    const hasDeleting = images.some((img) => img.deleting)
    setIsLoading(hasUploading || hasDeleting)
  }, [images])

  const loadImages = async () => {
    await ensureDirExists()
    const files = await FileSystem.readDirectoryAsync(imgDir)
    if (files.length > 0) {
      setImages(
        files.map((f) => ({
          uri: imgDir + f,
          fileName: f,
          uploading: false,
          progress: 0
        }))
      )
    }
  }

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
    setImages((prev) => [...prev, newImage])

    const response = await fetch(uri)
    const blob = await response.blob()

    const uploadTask = uploadBytesResumable(storageRef, blob)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setImages((prev) =>
          prev.map((img) =>
            img.uri === uri ? { ...img, progress: uploadProgress } : img
          )
        )
      },
      (error) => {
        console.error("Upload failed:", error)
        setImages((prev) =>
          prev.map((img) =>
            img.uri === uri ? { ...img, uploading: false } : img
          )
        )
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

        setImages((prev) =>
          prev.map((img) =>
            img.uri === uri
              ? { uri: downloadURL, fileName, uploading: false, progress: 100 }
              : img
          )
        )
      }
    )
  }

  const handleDeleteImage = async (uri: string, fileName: string) => {
    setImages((prev) =>
      prev.map((img) => (img.uri === uri ? { ...img, deleting: true } : img))
    )

    const storageRef = ref(storage, `Monhealth/certificates/${fileName}`)

    try {
      await deleteObject(storageRef)
      console.log("File deleted successfully from Firebase:", fileName)
      setImages((prev) => prev.filter((img) => img.uri !== uri))
    } catch (error) {
      console.error("Failed to delete file from Firebase:", error)
    } finally {
      setImages((prev) =>
        prev.map((img) => (img.uri === uri ? { ...img, deleting: false } : img))
      )
    }
  }

  const handleConfirm = () => {
    if (isLoading) return

    const uris = images.map((img) => img.uri)
    console.log("images:", uris)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="h-full flex-1 bg-background">
        <View className="flex-1 px-6">
          <Header back label="Chứng chỉ" />

          <Content className="mt-2">
            <ScrollArea className="flex-1">
              <VStack gap={20}>
                <Card
                  className="h-48 justify-center border-2"
                  onPress={openSheet}
                >
                  <VStack center gap={8}>
                    <Gallery
                      variant="Bold"
                      size={36}
                      color={COLORS.secondary}
                    />

                    <Text className="font-tmedium text-base text-secondary">
                      Nhấn để chọn hoặc chụp ảnh
                    </Text>
                  </VStack>
                </Card>

                <Button disabled={isLoading} onPress={handleConfirm}>
                  Xác nhận
                </Button>

                <View className="flex-row flex-wrap">
                  {images.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        width: "30%",
                        aspectRatio: 1,
                        margin: "1.5%"
                      }}
                    >
                      <Image
                        source={{ uri: item.uri }}
                        className="h-full w-full rounded-xl"
                      />

                      {(item.uploading || item.deleting) && (
                        <View
                          className="absolute inset-0 items-center justify-center rounded-xl"
                          style={{
                            backgroundColor: "rgba(0,0,0,0.7)"
                          }}
                        >
                          <ActivityIndicator
                            size="small"
                            color="#fff"
                            className="py-1"
                          />

                          <Text className="font-tmedium text-sm text-white">
                            {item.progress}%
                          </Text>
                        </View>
                      )}

                      {!item.uploading && !item.deleting && (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() =>
                            handleDeleteImage(item.uri, item.fileName)
                          }
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
          </Content>
        </View>

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

export default CertificateUpload

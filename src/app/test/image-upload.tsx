import React, { useEffect, useState } from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"

import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"

import { PictureFrame } from "iconsax-react-native"
import { X } from "lucide-react-native"

import { Button, Card, Container, VStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/app"

const imgDir = FileSystem.documentDirectory + "images/"

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir)
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true })
  }
}

function ImageUpload() {
  const [images, setImages] = useState<any[]>([])

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    await ensureDirExists()
    const files = await FileSystem.readDirectoryAsync(imgDir)
    if (files.length > 0) {
      setImages(files.map((f) => imgDir + f))
    }
  }

  const selectImage = async (useLibrary: boolean) => {
    let result
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1.0
    }

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options)
    } else {
      await ImagePicker.requestCameraPermissionsAsync()
      result = await ImagePicker.launchCameraAsync(options)
    }

    if (!result.canceled) {
      saveImage(result.assets[0].uri)
    }
  }

  const saveImage = async (uri: string) => {
    await ensureDirExists()
    const filename = new Date().getTime() + ".jpeg"
    const dest = imgDir + filename
    await FileSystem.copyAsync({ from: uri, to: dest })
    setImages([...images, dest])
  }

  const deleteImage = async (uri: string) => {
    await FileSystem.deleteAsync(uri)
    setImages(images.filter((i) => i !== uri))
  }

  return (
    <Container>
      <VStack gap={20}>
        <Card className="h-48 justify-center" onPress={() => selectImage(true)}>
          <VStack className="items-center gap-2">
            <PictureFrame variant="Bold" size={36} color={COLORS.primary} />

            <Text className="font-tmedium text-base text-accent">
              Tải hình ảnh lên
            </Text>
          </VStack>
        </Card>

        <Button onPress={() => selectImage(false)}>Chụp ảnh</Button>
      </VStack>

      <View className="mt-5 flex-row flex-wrap gap-4">
        {images.map((item, index) => (
          <View key={index} className="relative">
            <Image
              className="rounded-lg"
              source={{ uri: item }}
              style={{ height: 105, width: 105 }}
            />

            <TouchableOpacity
              onPress={() => deleteImage(item)}
              className="absolute right-1 top-1 items-center justify-center rounded-full bg-gray-200/65 p-1"
            >
              <X size={12} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </Container>
  )
}

export default ImageUpload

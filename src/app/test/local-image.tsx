import React, { useEffect, useState } from "react"

import {
  Alert,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View
} from "react-native"

import * as FileSystem from "expo-file-system"

const imgDir = FileSystem.documentDirectory + "images/"

const getAllLocalImages = async () => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(imgDir)
    if (!dirInfo.exists) {
      console.log("Directory does not exist.")
      return []
    }
    const files = await FileSystem.readDirectoryAsync(imgDir)
    return files.map((file) => ({
      fileName: file,
      uri: `${imgDir}${file}`
    }))
  } catch (error) {
    console.error("Failed to read local images:", error)
    return []
  }
}

const deleteAllLocalImages = async (
  setImages: React.Dispatch<
    React.SetStateAction<{ fileName: string; uri: string }[]>
  >
) => {
  try {
    const files = await FileSystem.readDirectoryAsync(imgDir)
    await Promise.all(
      files.map(async (file) => {
        const filePath = `${imgDir}${file}`
        await FileSystem.deleteAsync(filePath, { idempotent: true })
        console.log(`Deleted file: ${filePath}`)
      })
    )
    console.log("All local images deleted.")
    setImages([]) // Cập nhật danh sách hình ảnh
  } catch (error) {
    console.error("Failed to delete local images:", error)
  }
}

const DisplayLocalImages = () => {
  const [images, setImages] = useState<{ fileName: string; uri: string }[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      const localImages = await getAllLocalImages()
      setImages(localImages)
    }
    fetchImages()
  }, [])

  const handleDeleteAll = () => {
    Alert.alert(
      "Xóa tất cả hình ảnh",
      "Bạn có chắc chắn muốn xóa tất cả hình ảnh trong local?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => deleteAllLocalImages(setImages)
        }
      ]
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title="Xóa tất cả hình ảnh" onPress={handleDeleteAll} />
      <FlatList
        data={images}
        keyExtractor={(item) => item.fileName}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 5, aspectRatio: 1 }}>
            <Image
              source={{ uri: item.uri }}
              style={{ width: "100%", height: "100%", borderRadius: 8 }}
            />
            <Text style={{ textAlign: "center", fontSize: 12 }}>
              {item.fileName}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Không có hình ảnh nào trong local.
          </Text>
        }
      />
    </SafeAreaView>
  )
}

export default DisplayLocalImages

import * as ImagePicker from "expo-image-picker"

import { storage } from "@/configs/firebase"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable
} from "firebase/storage"
import { getMetadata } from "firebase/storage"

import { useCertificateStore } from "@/stores/certificateStore"

import { generateUUID } from "@/utils/helpers"

export const handleSelectImage = async (
  useLibrary: boolean,
  onUpload: (uri: string) => void
) => {
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
    onUpload(result.assets[0].uri)
  }
}

export const handleUploadImage = async (imageUri: string) => {
  try {
    console.log(`Starting to upload image: ${imageUri}`)

    const uuid = generateUUID()
    const fileName = `Monhealth/certificates/${uuid}`

    const storageRef = ref(storage, fileName)

    const currentImages = useCertificateStore.getState().imageUrls || []

    const newImage = {
      uri: imageUri,
      fileName,
      uploading: true,
      progress: 0
    }

    useCertificateStore
      .getState()
      .updateField("imageUrls", [...currentImages, newImage])

    const response = await fetch(imageUri)
    const blob = await response.blob()

    const uploadTask = uploadBytesResumable(storageRef, blob)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )

        useCertificateStore.getState().updateField(
          "imageUrls",
          useCertificateStore
            .getState()
            .imageUrls.map((img) =>
              img.fileName === fileName ? { ...img, progress } : img
            )
        )
      },
      (error) => {
        console.error("Error during upload:", error)

        useCertificateStore.getState().updateField(
          "imageUrls",
          useCertificateStore
            .getState()
            .imageUrls.filter((img) => img.fileName !== fileName)
        )

        alert("Tải lên không thành công. Vui lòng thử lại.")
      }
    )

    await uploadTask

    const downloadURL = await getDownloadURL(storageRef)
    console.log(`Upload completed for ${fileName}, final URL: ${downloadURL}`)

    useCertificateStore.getState().updateField(
      "imageUrls",
      useCertificateStore.getState().imageUrls.map((img) =>
        img.fileName === fileName
          ? {
              uri: downloadURL,
              fileName,
              uploading: false,
              progress: 100
            }
          : img
      )
    )

    return downloadURL
  } catch (error) {
    console.error("Error uploading image:", error)
    return null
  }
}

export const handleDeleteImage = async (fileName: string) => {
  try {
    console.log(`Starting to delete image with fileName: ${fileName}`)

    // Cập nhật trạng thái "deleting" trong store
    useCertificateStore.getState().updateField(
      "imageUrls",
      useCertificateStore
        .getState()
        .imageUrls.map((img) =>
          img.fileName === fileName
            ? { ...img, deleting: true, progress: 0 }
            : img
        )
    )

    const storageRef = ref(storage, fileName)

    // Kiểm tra xem ảnh có tồn tại trong Storage hay không
    try {
      await getMetadata(storageRef) // Nếu có lỗi ở đây, ảnh không tồn tại trên Storage
      console.log(`Image exists on Storage: ${fileName}`)

      // Nếu ảnh tồn tại trên Storage, xóa nó
      await deleteObject(storageRef)
      console.log(`File deleted successfully from Storage: ${fileName}`)
      return true
    } catch (metadataError) {
      // Nếu ảnh không tồn tại trên Storage (lỗi khi lấy metadata)
      console.log(
        `Image not found on Storage, removing from state: ${fileName}`
      )

      // Xóa ảnh trong useCertificateStore
      useCertificateStore.getState().updateField(
        "imageUrls",
        useCertificateStore
          .getState()
          .imageUrls.filter((img) => img.fileName !== fileName)
      )
      return true
    }
  } catch (error) {
    console.error("Error deleting image:", error)

    // Cập nhật lại trạng thái "deleting" thành false nếu có lỗi
    useCertificateStore.getState().updateField(
      "imageUrls",
      useCertificateStore
        .getState()
        .imageUrls.map((img) =>
          img.fileName === fileName ? { ...img, deleting: false } : img
        )
    )

    return false
  }
}
export const handleDeleteImageAndUpdateStore = async (
  fileName: string,
  setValue?: any
) => {
  const success = await handleDeleteImage(fileName)

  if (success) {
    const updatedImageUrls = useCertificateStore
      .getState()
      .imageUrls.filter((img) => img.fileName !== fileName)

    useCertificateStore.getState().updateField("imageUrls", updatedImageUrls)

    if (setValue) {
      const imageUris = updatedImageUrls.map((img) =>
        typeof img === "string" ? img : img.uri
      )
      setValue("imageUrls", imageUris)
    }
  }
}

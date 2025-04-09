import * as ImagePicker from "expo-image-picker"

import { storage } from "@/configs/firebase"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable
} from "firebase/storage"

import { useConsultantStore } from "@/stores/consultantStore"

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

    const currentImages = useConsultantStore.getState().imageUrls || []

    const newImage = {
      uri: imageUri,
      fileName,
      uploading: true,
      progress: 0
    }

    useConsultantStore
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

        useConsultantStore.getState().updateField(
          "imageUrls",
          useConsultantStore
            .getState()
            .imageUrls.map((img) =>
              img.fileName === fileName ? { ...img, progress } : img
            )
        )
      },
      (error) => {
        console.error("Error during upload:", error)

        useConsultantStore.getState().updateField(
          "imageUrls",
          useConsultantStore
            .getState()
            .imageUrls.filter((img) => img.fileName !== fileName)
        )

        alert("Tải lên không thành công. Vui lòng thử lại.")
      }
    )

    await uploadTask

    const downloadURL = await getDownloadURL(storageRef)
    console.log(`Upload completed for ${fileName}, final URL: ${downloadURL}`)

    useConsultantStore.getState().updateField(
      "imageUrls",
      useConsultantStore.getState().imageUrls.map((img) =>
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

    useConsultantStore.getState().updateField(
      "imageUrls",
      useConsultantStore
        .getState()
        .imageUrls.map((img) =>
          img.fileName === fileName
            ? { ...img, deleting: true, progress: 0 }
            : img
        )
    )
    const storageRef = ref(storage, fileName)

    await deleteObject(storageRef)
    console.log(`File deleted successfully: ${fileName}`)

    return true
  } catch (error) {
    console.error("Error deleting image:", error)

    useConsultantStore.getState().updateField(
      "imageUrls",
      useConsultantStore
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
    const updatedImageUrls = useConsultantStore
      .getState()
      .imageUrls.filter((img) => img.fileName !== fileName)

    useConsultantStore.getState().updateField("imageUrls", updatedImageUrls)

    if (setValue) {
      const imageUris = updatedImageUrls.map((img) =>
        typeof img === "string" ? img : img.uri
      )
      setValue("imageUrls", imageUris)
    }
  }
}

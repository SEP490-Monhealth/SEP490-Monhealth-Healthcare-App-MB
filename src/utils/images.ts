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

export const handleUploadImage = async (uri: string) => {
  if (!uri || typeof uri !== "string") {
    console.error("Invalid image URI")
    return
  }

  const uuid = generateUUID()
  const extension = uri.split(".").pop()
  const fileName = `${uuid}.${extension}`
  const storageRef = ref(storage, `Monhealth/certificates/${fileName}`)

  const newImage = { uri, fileName, uploading: true, progress: 0 }
  useConsultantStore.getState().updateField("imageUrls", [newImage], true)

  const response = await fetch(uri)
  const blob = await response.blob()

  const uploadTask = uploadBytesResumable(storageRef, blob)

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const uploadProgress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )

      useConsultantStore.getState().updateField(
        "imageUrls",
        useConsultantStore
          .getState()
          .imageUrls.map((img) =>
            img.fileName === fileName
              ? { ...img, progress: uploadProgress }
              : img
          )
      )
    },
    (error) => {
      console.error("Upload failed:", error)

      useConsultantStore.getState().updateField(
        "imageUrls",
        useConsultantStore
          .getState()
          .imageUrls.map((img) =>
            img.fileName === fileName ? { ...img, uploading: false } : img
          )
      )
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

      useConsultantStore.getState().updateField(
        "imageUrls",
        useConsultantStore
          .getState()
          .imageUrls.map((img) =>
            img.fileName === fileName
              ? { ...img, uri: downloadURL, uploading: false, progress: 100 }
              : img
          )
      )
    }
  )
}

export const handleDeleteImage = async (fileName: string) => {
  const { imageUrls, updateField } = useConsultantStore.getState()

  updateField(
    "imageUrls",
    imageUrls.map((img) =>
      img.fileName === fileName ? { ...img, deleting: true } : img
    )
  )

  const storageRef = ref(storage, `Monhealth/certificates/${fileName}`)

  try {
    await deleteObject(storageRef)
    console.log("File deleted successfully:", fileName)

    updateField(
      "imageUrls",
      imageUrls.filter((img) => img.fileName !== fileName)
    )
  } catch (error) {
    console.error("Failed to delete file:", error)
  }
}

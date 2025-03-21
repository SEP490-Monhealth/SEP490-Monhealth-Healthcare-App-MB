import { useState } from "react"

import { storage } from "@/configs/firebase"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable
} from "firebase/storage"

import { generateUUID } from "@/utils/helpers"

interface UploadState {
  uri: string
  fileName: string
  progress: number
  uploading: boolean
  deleting: boolean
}

export const useImageUpload = () => {
  const [images, setImages] = useState<UploadState[]>([])

  const uploadImage = async (uri: string) => {
    if (!uri) return

    const uuid = generateUUID()
    const extension = uri.split(".").pop()
    const fileName = `${uuid}.${extension}`
    const storageRef = ref(storage, `Monhealth/certificates/${fileName}`)

    const newImage: UploadState = {
      uri,
      fileName,
      progress: 0,
      uploading: true,
      deleting: false
    }

    setImages((prev) => [...prev, newImage])

    try {
      const response = await fetch(uri)
      const blob = await response.blob()

      const uploadTask = uploadBytesResumable(storageRef, blob)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )

          setImages((prev) =>
            prev.map((img) =>
              img.fileName === fileName ? { ...img, progress } : img
            )
          )
        },
        (error) => {
          console.error("Upload failed:", error)
          setImages((prev) =>
            prev.map((img) =>
              img.fileName === fileName ? { ...img, uploading: false } : img
            )
          )
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

          setImages((prev) =>
            prev.map((img) =>
              img.fileName === fileName
                ? { ...img, uri: downloadURL, uploading: false, progress: 100 }
                : img
            )
          )
        }
      )
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  const deleteImage = async (fileName: string) => {
    const storageRef = ref(storage, `Monhealth/certificates/${fileName}`)

    setImages((prev) =>
      prev.map((img) =>
        img.fileName === fileName ? { ...img, deleting: true } : img
      )
    )

    try {
      await deleteObject(storageRef)

      setImages((prev) => prev.filter((img) => img.fileName !== fileName))
    } catch (error) {
      console.error("Error deleting image:", error)
      setImages((prev) =>
        prev.map((img) =>
          img.fileName === fileName ? { ...img, deleting: false } : img
        )
      )
    }
  }

  return { images, uploadImage, deleteImage }
}

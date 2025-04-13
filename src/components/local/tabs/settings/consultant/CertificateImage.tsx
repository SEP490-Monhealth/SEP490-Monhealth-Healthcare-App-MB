import React from "react"

import { Image, TouchableOpacity } from "react-native"

interface CertificateImageProps {
  imageUrl: string
  onPress: () => void
}

export const CertificateImage = ({
  imageUrl,
  onPress
}: CertificateImageProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    className="overflow-hidden rounded-xl border border-border shadow-sm"
    style={{ width: "31%", aspectRatio: 1, margin: "1%" }}
  >
    <Image
      source={{ uri: imageUrl }}
      className="h-full w-full object-cover"
      resizeMode="cover"
    />
  </TouchableOpacity>
)

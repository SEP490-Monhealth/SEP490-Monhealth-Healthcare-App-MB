import React from "react"

import { Text, View } from "react-native"

import { HStack } from "@/components/global/atoms"

interface ListCertificateProps {
  label: string
  value: string
}

export const ListCertificate = ({ label, value }: ListCertificateProps) => {
  return (
    <HStack center className="justify-between pb-1 pt-1">
      <Text className="font-tmedium text-base text-accent">{label}</Text>
      <Text className="font-tmedium text-base text-primary">{value}</Text>
    </HStack>
  )
}

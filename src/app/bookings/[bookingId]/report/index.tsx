import React from "react"

import { Image, Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { Container, Content, Input, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useGetReportByBookingId } from "@/hooks/useReport"

const ReportDetailsScreen = () => {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>()

  const { data: reportData } = useGetReportByBookingId(bookingId)

  const currentReport = reportData?.[0]

  console.log(JSON.stringify(currentReport, null, 2))

  if (!reportData) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header back label="Báo cáo" />

      <Content className="pt-2">
        <VStack gap={12}>
          <Input disabled value={currentReport?.reason} label="Lý do" />

          {currentReport?.reason === "Khác (Thêm mô tả bên dưới)" && (
            <Input
              value={currentReport?.reason}
              label="Thông tin bổ sung"
              isMultiline
              numberOfLines={6}
            />
          )}

          <View>
            <Text className="mb-1 ml-1 font-tregular text-base text-primary">
              Hình ảnh
            </Text>

            <View className="flex-row flex-wrap gap-2">
              {currentReport?.imageUrls.map((uri, index) => (
                <View key={index} className="h-28 w-28">
                  <Image
                    source={{ uri }}
                    resizeMode="cover"
                    className="h-full w-full rounded-lg"
                  />
                </View>
              ))}
            </View>
          </View>
        </VStack>
      </Content>
    </Container>
  )
}

export default ReportDetailsScreen

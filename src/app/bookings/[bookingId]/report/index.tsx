import React from "react"

import { Image, Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import {
  Badge,
  Container,
  Content,
  HStack,
  Input,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { ErrorDisplay } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { getReportStatusMeta } from "@/constants/enum/Report"

import { useAuth } from "@/contexts/AuthContext"

import { useGetBookingById } from "@/hooks/useBooking"
import { useGetConsultantById } from "@/hooks/useConsultant"
import { useGetReportByBookingId } from "@/hooks/useReport"

import { formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":")
  return `${hour}h${minute}`
}

function ReportDetailsScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>()

  const { user } = useAuth()
  const userId = user?.userId

  const { data: bookingData } = useGetBookingById(bookingId)
  const { data: reportData } = useGetReportByBookingId(bookingId)
  const { data: consultantData } = useGetConsultantById(
    bookingData?.consultantId
  )

  if (!bookingData || !reportData || !consultantData) {
    return <LoadingScreen />
  }

  if (reportData.length === 0) {
    return (
      <Container>
        <Header back label="Báo cáo" />

        <ErrorDisplay
          imageSource={require("../../../../../public/images/monhealth-no-data-image.png")}
          title="Không có dữ liệu"
          description="Không tìm thấy báo cáo nào ở đây"
          marginTop={24}
        />
      </Container>
    )
  }

  const currentReport = reportData[0]

  const { label: reportStatusLabel, color: reportStatusColor } =
    getReportStatusMeta(currentReport?.status)

  return (
    <Container>
      <Header back label="Báo cáo" />

      <Content className="mt-2">
        <ScrollArea>
          <HStack className="justify-between">
            <Text className="font-tbold text-xl text-primary">
              Trạng thái báo cáo
            </Text>

            <Badge
              label={reportStatusLabel}
              background={reportStatusColor}
              color="#fff"
              rounded
            />
          </HStack>

          <View>
            <Section
              label={
                userId === bookingData.userId
                  ? "Chuyên viên tư vấn"
                  : "Người đặt lịch"
              }
            />
            {userId === bookingData.userId ? (
              <HStack center gap={20}>
                {bookingData.consultant.avatarUrl ? (
                  <Image
                    source={{ uri: bookingData.consultant.avatarUrl }}
                    className="h-24 w-24 rounded-2xl border border-border"
                  />
                ) : (
                  <View className="flex h-24 w-24 items-center justify-center rounded-xl border border-muted bg-border">
                    <Text className="font-tbold text-lg text-primary">
                      {getInitials(bookingData.consultant.fullName)}
                    </Text>
                  </View>
                )}

                <VStack>
                  <Text className="font-tbold text-2xl text-primary">
                    {bookingData.consultant.fullName}
                  </Text>

                  <Text className="font-tmedium text-base text-accent">
                    {formatTime(bookingData.startTime)} -{" "}
                    {formatTime(bookingData.endTime)},{" "}
                    {formatDate(bookingData.date)}
                  </Text>
                </VStack>
              </HStack>
            ) : (
              <HStack center gap={20}>
                {bookingData.member?.avatarUrl ? (
                  <Image
                    source={{ uri: bookingData.member.avatarUrl }}
                    className="h-24 w-24 rounded-2xl border border-border"
                  />
                ) : (
                  <View className="flex h-24 w-24 items-center justify-center rounded-xl border border-muted bg-border">
                    <Text className="font-tbold text-lg text-primary">
                      {getInitials(bookingData.member?.fullName)}
                    </Text>
                  </View>
                )}

                <VStack>
                  <Text className="font-tbold text-2xl text-primary">
                    {bookingData.member.fullName}
                  </Text>

                  <Text className="font-tmedium text-base text-accent">
                    {formatTime(bookingData.startTime)} -{" "}
                    {formatTime(bookingData.endTime)},{" "}
                    {formatDate(bookingData.date)}
                  </Text>
                </VStack>
              </HStack>
            )}
          </View>

          <View>
            <Section label="Lý do" />

            {currentReport?.reason.startsWith("Khác") ? (
              <Input
                value={currentReport?.reason}
                isMultiline
                numberOfLines={6}
              />
            ) : (
              <Input disabled value={currentReport?.reason} />
            )}
          </View>

          <View>
            <Section label="Hình ảnh" />

            <View className="flex-row flex-wrap gap-2">
              {currentReport?.imageUrls.map((uri, index) => (
                <View key={index} className="h-full w-full">
                  <Image
                    source={{ uri }}
                    resizeMode="cover"
                    className="h-full w-full rounded-lg border border-border"
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ReportDetailsScreen

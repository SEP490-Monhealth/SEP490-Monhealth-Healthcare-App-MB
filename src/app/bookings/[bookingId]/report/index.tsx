import React from "react"

import { Image, Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { CloseSquare, SearchStatus } from "iconsax-react-native"

import {
  Card,
  Container,
  Content,
  HStack,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { BookingItem, ErrorDisplay } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
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

  const { label: reportStatusLabel } = getReportStatusMeta(
    currentReport?.status
  )

  const reportItems = [
    {
      icon: <SearchStatus variant="Bold" size={20} color={COLORS.primary} />,
      label: "Trạng thái",
      value: reportStatusLabel
    },
    {
      icon: <CloseSquare variant="Bold" size={20} color={COLORS.primary} />,
      label: "Lý do",
      value: currentReport?.reason
    }
  ]

  return (
    <Container>
      <Header back label="Báo cáo" />

      <Content className="mt-2">
        <ScrollArea>
          <View>
            <Section
              label={
                userId === bookingData.userId
                  ? "Chuyên viên tư vấn"
                  : "Người đặt lịch"
              }
              margin={false}
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
                    {formatDate(bookingData.date)},{" "}
                    {formatTime(bookingData.startTime)} -{" "}
                    {formatTime(bookingData.endTime)}
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
                    {formatDate(bookingData.date)},{" "}
                    {formatTime(bookingData.startTime)} -{" "}
                    {formatTime(bookingData.endTime)}
                  </Text>
                </VStack>
              </HStack>
            )}
          </View>

          <View>
            <Section label="Chi tiết" />

            <Card>
              {reportItems.map((item, index) => {
                const isLast = index === reportItems.length - 1

                return (
                  <BookingItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    isLast={isLast}
                  />
                )
              })}
            </Card>
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

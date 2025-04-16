import React from "react"

import { Linking, Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { Card, Container, Content, ScrollArea } from "@/components/global/atoms"
import {
  BookingCard,
  ErrorDisplay,
  MeetingCard
} from "@/components/global/molecules"
import { BodyIndex } from "@/components/global/molecules/BodyIndex"
import { MetricItem } from "@/components/global/molecules/MetricItem"
import { Header, Section } from "@/components/global/organisms"

import { getGenderMeta } from "@/constants/enum/Gender"
import { getGoalTypeMeta } from "@/constants/enum/Goal"

import { useAuth } from "@/contexts/AuthContext"

import { useGetBookingsByUserIdAndConsultantId } from "@/hooks/useBooking"
import { useGetChatById } from "@/hooks/useChat"
import { useGetGoalsByUserId } from "@/hooks/useGoal"
import { useGetMetricsByUserId } from "@/hooks/useMetric"

import { toFixed } from "@/utils/formatters"

const ChatInformationScreen = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>()

  const { user } = useAuth()
  const userId = user?.userId

  const meetUrl = "https://meet.google.com/abc-defg-hij"

  const { data: chatData } = useGetChatById(chatId)
  const { data: bookingsData } = useGetBookingsByUserIdAndConsultantId(
    chatData?.userId,
    chatData?.consultantId
  )
  const { data: metricsData } = useGetMetricsByUserId(chatData?.userId)
  const { data: goalsData } = useGetGoalsByUserId(chatData?.userId)

  // console.log(JSON.stringify(bookingsData, null, 2))

  const handleViewMeetUrl = () => {
    Linking.openURL(meetUrl)
  }

  if (
    !chatData ||
    !bookingsData ||
    !metricsData ||
    !goalsData ||
    metricsData.length === 0 ||
    goalsData.length === 0
  ) {
    return <LoadingScreen />
  }

  const userMetric = metricsData[0]
  const userGoal = goalsData[0]

  const { label: genderLabel } = getGenderMeta(userMetric.gender)
  const { label: goalTypeLabel } = getGoalTypeMeta(userGoal.type)

  const basicMetrics = [
    { label: "Mục tiêu cân nặng", value: goalTypeLabel },
    { label: "Chỉ số khối cơ thể (BMI)", value: toFixed(userMetric.bmi) },
    { label: "Tỷ lệ trao đổi chất (BMR)", value: toFixed(userMetric.bmr) }
  ]

  return (
    <Container>
      <Header back label="Thông tin" />

      <Content className="mt-2">
        <ScrollArea>
          <View className="pb-12">
            <Section label="Link phòng họp" margin={false} />

            <MeetingCard meetUrl={meetUrl} onPress={handleViewMeetUrl} />

            {userId !== chatData?.userId && (
              <>
                <Section label="Thông tin người dùng" />

                <Card>
                  <BodyIndex
                    gender={genderLabel}
                    height={userMetric.height}
                    weight={userMetric.weight}
                  />

                  <Text className="mb-2 mt-6 font-tmedium text-base text-primary">
                    Chỉ số cơ thể
                  </Text>

                  {basicMetrics.map((item, index) => (
                    <MetricItem
                      key={index}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </Card>
              </>
            )}

            <Section label="Lịch sử đặt lịch" />

            {bookingsData && bookingsData.length > 0 ? (
              bookingsData.map((booking) => (
                <BookingCard
                  key={booking.bookingId}
                  variant="consultant"
                  name={booking.consultant.fullName}
                  date={booking.date}
                  startTime={booking.startTime}
                  endTime={booking.endTime}
                  notes={booking.notes}
                  status={booking.status}
                  cancellationReason={booking.cancellationReason}
                />
              ))
            ) : (
              <ErrorDisplay
                imageSource={require("../../../../../public/images/monhealth-no-data-image.png")}
                title="Không có dữ liệu"
                description="Không tìm thấy có lịch hẹn nào ở đây!"
                marginTop={12}
              />
            )}
          </View>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ChatInformationScreen

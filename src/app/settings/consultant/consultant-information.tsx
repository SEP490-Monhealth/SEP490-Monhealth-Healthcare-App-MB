import React, { useRef } from "react"

import {
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import {
  Award,
  CalendarCircle,
  CallCalling,
  ColorsSquare,
  Crown,
  HeartCircle,
  HeartTick,
  MedalStar,
  Profile2User,
  ProfileCircle,
  ReceiptDisscount,
  Sms,
  Star1,
  Verify
} from "iconsax-react-native"

import {
  Avatar,
  Badge,
  Card,
  Container,
  Content,
  ScrollArea,
  Sheet,
  SheetRefProps,
  SheetSelect,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { ListItem } from "@/components/local/tabs/settings"

import { COLORS } from "@/constants/color"
import { DATA } from "@/constants/data"

import { useAuth } from "@/contexts/AuthContext"

import { useGetConsultantById } from "@/hooks/useConsultant"

import { formatDate } from "@/utils/formatters"

function ConsultantInformationScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const consultantId = user?.consultantId
  const userRole = user?.role || ""

  const { data: consultantData, isLoading: isConsultantLoading } =
    useGetConsultantById(consultantId)

  const SheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = 180

  const openSheet = () => SheetRef.current?.scrollTo(-sheetHeight)

  // if (!consultantData || !isConsultantLoading) return <LoadingScreen />

  const userInfoList = [
    {
      label: consultantData?.createdAt
        ? formatDate(consultantData.createdAt)
        : "Không có ngày tạo",
      icon: CalendarCircle
    },
    { label: consultantData?.fullName, icon: ProfileCircle },
    { label: consultantData?.phoneNumber, icon: CallCalling },
    { label: consultantData?.email, icon: Sms },
    {
      label: consultantData?.isVerified ? "Đã xác thực" : "Chưa được xác thực",
      icon: Verify
    }
  ]

  const userMetricList = [
    {
      label: consultantData?.expertise,
      icon: HeartTick
    },
    { label: `${consultantData?.experience} năm`, icon: Crown },
    {
      label: `${consultantData?.bookingCount} lịch hẹn`,
      icon: Profile2User
    },
    {
      label: `${consultantData?.ratingCount} lượt đánh giá`,
      icon: MedalStar
    },
    {
      label: `${consultantData?.averageRating} đánh giá trung bình`,
      icon: Star1
    }
  ]

  const handleUpdateProfile = () => {
    router.push(`/consultant/${consultantId}`)
  }

  const handleUpdateBio = () => {
    router.push(`/consultant/${consultantId}`)
  }

  return (
    <TouchableWithoutFeedback>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header back label="Thông tin cá nhân" />

          <Content className="mt-2">
            <ScrollArea>
              <VStack gap={20} className="pb-20">
                <VStack center gap={12}>
                  <Avatar
                    source={consultantData?.avatarUrl}
                    alt={consultantData?.fullName}
                    size={150}
                    onPress={() => openSheet()}
                  />

                  <VStack center>
                    <Text className="font-tbold text-2xl text-primary">
                      {consultantData?.fullName}
                    </Text>

                    <Badge label={userRole} background="#16a34a" color="#fff" />
                  </VStack>
                </VStack>

                <View>
                  <Section
                    label="Tài khoản"
                    actionText="Cập nhật"
                    margin={false}
                    onPress={handleUpdateProfile}
                  />

                  <Card>
                    {userInfoList.map((item, index) => {
                      const Icon = item.icon

                      return (
                        <ListItem
                          key={index}
                          label={item.label}
                          startIcon={
                            <Icon
                              variant="Bold"
                              size={24}
                              color={COLORS.accent}
                            />
                          }
                          endIcon={<View></View>}
                          isBorder={false}
                        />
                      )
                    })}
                  </Card>
                </View>

                <View>
                  <Section label="Tổng quát" margin={false} />

                  <Card>
                    {userMetricList.map((item, index) => {
                      const Icon = item.icon

                      return (
                        <ListItem
                          key={index}
                          label={item.label}
                          startIcon={
                            <Icon
                              variant="Bold"
                              size={24}
                              color={COLORS.accent}
                            />
                          }
                          endIcon={<View></View>}
                          isBorder={false}
                        />
                      )
                    })}
                  </Card>
                </View>

                <View>
                  <Section label="Mô tả" margin={false} />

                  <Card>
                    <Text className="text-justify font-tregular text-base text-secondary">
                      {consultantData?.bio}
                    </Text>
                  </Card>
                </View>
              </VStack>
            </ScrollArea>
          </Content>
        </Container>

        <Sheet ref={SheetRef} dynamicHeight={sheetHeight}>
          {DATA.UPLOADS.map((option) => {
            const Icon = option.icon

            return (
              <SheetSelect
                key={option.value}
                label={option.label}
                icon={
                  <Icon variant="Bold" size={24} color={COLORS.secondary} />
                }
              />
            )
          })}
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default ConsultantInformationScreen

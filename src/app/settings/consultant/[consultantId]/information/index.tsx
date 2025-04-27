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
  Briefcase,
  CalendarCircle,
  CallCalling,
  Edit2,
  ProfileCircle,
  Sms,
  Verify
} from "iconsax-react-native"

import {
  Avatar,
  Card,
  Container,
  Content,
  HStack,
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
import { getConsultantVerificationStatusMeta } from "@/constants/enum/Consultant"

import { useAuth } from "@/contexts/AuthContext"

import { useGetConsultantById } from "@/hooks/useConsultant"

import { formatDate, toFixed } from "@/utils/formatters"

function ConsultantInformationScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId
  const consultantId = user?.consultantId

  const { data: consultantData, isLoading } = useGetConsultantById(consultantId)

  const SheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = 180

  const openSheet = () => SheetRef.current?.scrollTo(-sheetHeight)
  const closeSheet = () => SheetRef.current?.scrollTo(0)

  const handleUpdateConsultant = () => {
    router.push(`/settings/user/${userId}/information/update`)
  }

  const handleUpdateBio = () => {
    router.push(`/settings/consultant/${consultantId}/about/update`)
  }

  if (!consultantData || isLoading) return <LoadingScreen />

  const { label: verificationStatusLabel } =
    getConsultantVerificationStatusMeta(consultantData?.verificationStatus)

  const consultantInfoList = [
    { label: consultantData.bio, icon: Edit2 },
    { label: `Kinh nghiệm ${consultantData.experience} năm`, icon: Briefcase }
  ]

  const userInfoList = [
    { label: formatDate(consultantData.createdAt), icon: CalendarCircle },
    { label: consultantData?.fullName, icon: ProfileCircle },
    { label: consultantData?.phoneNumber, icon: CallCalling },
    { label: consultantData?.email, icon: Sms },
    { label: verificationStatusLabel, icon: Verify }
  ]

  return (
    <TouchableWithoutFeedback>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header back label="Hồ sơ" />

          <ScrollArea>
            <Content className="mt-2 pb-12">
              <VStack center gap={12}>
                <Avatar
                  source={consultantData.avatarUrl}
                  alt={consultantData.fullName}
                  size={150}
                  onPress={() => openSheet()}
                />

                <Text className="font-tbold text-2xl text-primary">
                  {consultantData.fullName}
                </Text>
              </VStack>

              <View>
                <Section label="Thông tin" />

                <Card>
                  <HStack className="justify-between">
                    <VStack center gap={8}>
                      <Text className="font-tmedium text-base text-accent">
                        Lịch hẹn
                      </Text>
                      <Text className="font-tbold text-lg text-primary">
                        {consultantData.bookingCount}
                      </Text>
                    </VStack>

                    <VStack center gap={8}>
                      <Text className="font-tmedium text-base text-accent">
                        Đánh giá
                      </Text>
                      <Text className="font-tbold text-lg text-primary">
                        {consultantData.ratingCount}
                      </Text>
                    </VStack>

                    <VStack center gap={8}>
                      <Text className="font-tmedium text-base text-accent">
                        Trung bình
                      </Text>
                      <Text className="font-tbold text-lg text-primary">
                        {toFixed(consultantData.averageRating)}
                      </Text>
                    </VStack>
                  </HStack>
                </Card>
              </View>

              <View>
                <Section
                  label="Giới thiệu"
                  actionText="Cập nhật"
                  onPress={handleUpdateBio}
                />

                <Card>
                  {consultantInfoList.map((item, index) => {
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
                <Section
                  label="Tài khoản"
                  actionText="Cập nhật"
                  onPress={handleUpdateConsultant}
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
            </Content>
          </ScrollArea>
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

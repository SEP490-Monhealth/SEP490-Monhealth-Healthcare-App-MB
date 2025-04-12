import React, { useRef } from "react"

import {
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import {
  CalendarCircle,
  CallCalling,
  Crown,
  HeartTick,
  MedalStar,
  Profile2User,
  ProfileCircle,
  Sms,
  Star1,
  Verify
} from "iconsax-react-native"

import {
  Avatar,
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
import { VerificationStatus } from "@/constants/enum/Consultant"

import { useAuth } from "@/contexts/AuthContext"

import { useGetConsultantById } from "@/hooks/useConsultant"

import { formatDate } from "@/utils/formatters"

function ConsultantInformationScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const consultantId = user?.consultantId

  const { data: consultantData, isLoading } = useGetConsultantById(consultantId)

  const SheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = 180

  const openSheet = () => SheetRef.current?.scrollTo(-sheetHeight)

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
      label:
        consultantData?.verificationStatus === VerificationStatus.Verified
          ? "Đã xác thực"
          : "Chưa được xác thực",
      icon: Verify
    }
  ]

  const handleUpdateConsultant = () => {
    router.push(`/settings/consultant/${consultantId}/information`)
  }

  if (!consultantData || isLoading) return <LoadingScreen />

  return (
    <TouchableWithoutFeedback>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header back label="Hồ sơ" />

          <Content className="mt-2">
            <ScrollArea>
              <VStack gap={20} className="pb-20">
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
                  <Section
                    label="Tài khoản"
                    actionText="Cập nhật"
                    margin={false}
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

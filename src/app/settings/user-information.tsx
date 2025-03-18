import React, { useRef } from "react"

import { SafeAreaView, Text, TouchableWithoutFeedback } from "react-native"

import { useRouter } from "expo-router"

import {
  AlignVertically,
  Award,
  CalendarCircle,
  CallCalling,
  Man,
  ProfileCircle,
  ProfileTick,
  Sms,
  Weight
} from "iconsax-react-native"
import { Instagram } from "lucide-react-native"

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

import { useAuth } from "@/contexts/AuthContext"

import { useGetMetricsByUserId } from "@/hooks/useMetric"
import { useGetUserById } from "@/hooks/useUser"

import { formatDate } from "@/utils/formatters"

import { LoadingScreen } from "../loading"

function UserInformationScreen() {
  const router = useRouter()
  const { user } = useAuth()
  const userId = user?.userId
  const subscriptionUser = user?.subscription

  const { data: userData, isLoading: isUserLoading } = useGetUserById(userId)
  const { data: metricData, isLoading: isMetricLoading } =
    useGetMetricsByUserId(userId)

  const ImageSheetRef = useRef<SheetRefProps>(null)
  const imageSheetHeight = 180

  const openImageSheet = () => {
    ImageSheetRef.current?.scrollTo(-imageSheetHeight)
  }

  const handleUpdateProfile = () => router.push(`/user/${userId}`)

  if (!userData || isUserLoading || !metricData || isMetricLoading)
    return <LoadingScreen />

  const userInfoList = [
    { label: userData.fullName, icon: ProfileCircle },
    { label: userData.phoneNumber, icon: CallCalling },
    { label: userData.email, icon: Sms },
    {
      label: userData.role === "User" ? "Thành viên hệ thống" : "Tư vấn viên",
      icon: ProfileTick
    },
    { label: subscriptionUser, icon: Award }
  ]

  const userMetricList = [
    {
      label: DATA.GENDERS.find((g) => g.value === metricData?.[0]?.gender)
        ?.label,
      icon:
        DATA.GENDERS.find((g) => g.value === metricData?.[0]?.gender)?.icon ||
        Man
    },
    { label: formatDate(metricData[0].dateOfBirth), icon: CalendarCircle },
    { label: `${metricData[0].height} cm`, icon: AlignVertically },
    { label: `${metricData[0].weight} kg`, icon: Weight }
  ]

  return (
    <TouchableWithoutFeedback>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header back label="Thông tin cá nhân" />

          <Content className="mt-2">
            <ScrollArea>
              <VStack gap={20} className="pb-20">
                <VStack center gap={15}>
                  <Avatar
                    source={userData.avatarUrl}
                    alt={userData.fullName}
                    size={150}
                    icon={
                      <Instagram
                        size={25}
                        strokeWidth={2}
                        color={COLORS.accent}
                        absoluteStrokeWidth
                      />
                    }
                    onPress={() => openImageSheet()}
                  />
                  <VStack center>
                    <Text className="font-tbold text-2xl text-primary">
                      {userData.fullName}
                    </Text>
                    <HStack center>
                      <Text className="text-center text-base text-secondary">
                        Tham gia từ
                      </Text>
                      <Text className="text-center font-tmedium text-base text-primary">
                        {formatDate(userData.createdAt)}
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>

                <VStack>
                  <Section
                    label="Thông tin tài khoản"
                    actionText="Chỉnh sửa"
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
                          endIcon={<Text></Text>}
                          isBorder={false}
                        />
                      )
                    })}
                  </Card>
                </VStack>

                <VStack>
                  <Section label="Thông tin cá nhân" margin={false} />

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
                          endIcon={<Text></Text>}
                          isBorder={false}
                        />
                      )
                    })}
                  </Card>
                </VStack>
              </VStack>
            </ScrollArea>
          </Content>
        </Container>

        <Sheet ref={ImageSheetRef} dynamicHeight={imageSheetHeight}>
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

export default UserInformationScreen

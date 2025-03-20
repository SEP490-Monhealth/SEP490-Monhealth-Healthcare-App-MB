import React, { useRef } from "react"

import {
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { useRouter } from "expo-router"

import {
  AlignVertically,
  Award,
  Calendar,
  CalendarCircle,
  CallCalling,
  Man,
  ProfileCircle,
  Sms,
  Weight
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

import { useGetMetricsByUserId } from "@/hooks/useMetric"
import { useGetUserById } from "@/hooks/useUser"

import { formatDate } from "@/utils/formatters"
import { getSubscriptionColor } from "@/utils/helpers"

import { LoadingScreen } from "../loading"

function UserInformationScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId
  const userSubscription = user?.subscription

  const { data: userData, isLoading: isUserLoading } = useGetUserById(userId)
  const { data: metricData, isLoading: isMetricLoading } =
    useGetMetricsByUserId(userId)

  const SheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = 180

  const openSheet = () => SheetRef.current?.scrollTo(-sheetHeight)

  if (!userData || isUserLoading || !metricData || isMetricLoading)
    return <LoadingScreen />

  const userInfoList = [
    { label: formatDate(userData.createdAt), icon: CalendarCircle },
    { label: userData.fullName, icon: ProfileCircle },
    { label: userData.phoneNumber, icon: CallCalling },
    { label: userData.email, icon: Sms },
    { label: userSubscription, icon: Award }
  ]

  const userMetricList = [
    {
      label: DATA.GENDERS.find((g) => g.value === metricData[0]?.gender)?.label,
      icon:
        DATA.GENDERS.find((g) => g.value === metricData[0]?.gender)?.icon || Man
    },
    { label: formatDate(metricData[0].dateOfBirth), icon: Calendar },
    { label: `${metricData[0].height} cm`, icon: AlignVertically },
    { label: `${metricData[0].weight} kg`, icon: Weight }
  ]

  const handleUpdateProfile = () => router.push(`/users/${userId}`)

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
                    source={userData.avatarUrl}
                    alt={userData.fullName}
                    size={150}
                    onPress={() => openSheet()}
                  />

                  <VStack center>
                    <Text className="font-tbold text-2xl text-primary">
                      {userData.fullName}
                    </Text>

                    <Badge
                      label={userData?.role}
                      background={getSubscriptionColor(userData?.role)}
                      color="#fff"
                    />
                  </VStack>
                </VStack>

                <View>
                  <Section
                    label="Tài khoản"
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
                          endIcon={<View></View>}
                          isBorder={false}
                        />
                      )
                    })}
                  </Card>
                </View>

                <View>
                  <Section label="Sức khỏe" margin={false} />

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

export default UserInformationScreen

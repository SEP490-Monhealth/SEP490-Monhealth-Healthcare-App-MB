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
  Award,
  Calendar,
  CalendarCircle,
  CallCalling,
  CommandSquare,
  ProfileCircle,
  Ruler,
  Slash,
  Sms
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
import { getGenderMeta } from "@/constants/enum/Gender"
import { getGoalTypeMeta } from "@/constants/enum/Goal"

import { useAuth } from "@/contexts/AuthContext"

import { useGetAllergiesByUserId } from "@/hooks/useAllergy"
import { useGetGoalsByUserId } from "@/hooks/useGoal"
import { useGetMetricsByUserId } from "@/hooks/useMetric"
import { useGetUserById } from "@/hooks/useUser"

import { formatDate } from "@/utils/formatters"
import { getSubscriptionColor } from "@/utils/helpers"

function UserInformationScreen() {
  const router = useRouter()
  const { userId } = useLocalSearchParams<{ userId: string }>()

  const { user } = useAuth()
  const userSubscription = user?.subscription

  const SheetRef = useRef<SheetRefProps>(null)

  const { data: userData } = useGetUserById(userId)
  const { data: metricData } = useGetMetricsByUserId(userId)
  const { data: goalData } = useGetGoalsByUserId(userId)
  const { data: allergiesData } = useGetAllergiesByUserId(userId)

  const sheetHeight = 180

  const openSheet = () => SheetRef.current?.scrollTo(-sheetHeight)

  if (!userData || !metricData || !goalData || !allergiesData) {
    return <LoadingScreen />
  }

  const gender = getGenderMeta(metricData[0].gender)
  const goalType = getGoalTypeMeta(goalData[0].type)

  const userInfoList = [
    { label: formatDate(userData?.createdAt), icon: CalendarCircle },
    { label: userData?.fullName, icon: ProfileCircle },
    { label: userData?.email, icon: Sms },
    { label: userData?.phoneNumber, icon: CallCalling },
    { label: userSubscription, icon: Award }
  ]

  const userMetricList = [
    { label: gender.label, icon: gender.icon },
    { label: formatDate(metricData[0].dateOfBirth), icon: Calendar },
    { label: `${metricData[0].height} cm`, icon: Ruler },
    { label: `${metricData[0].weight} kg`, icon: CommandSquare },
    { label: `${goalType.label}`, icon: goalType.icon }
  ]

  const allergiesNames =
    allergiesData?.map((item) => item.name).join(", ") || "Không có"

  const handleUpdateInformation = () => {
    router.push(`/settings/user/${userId}/information/update`)
  }

  const handleUpdateMetric = () => {
    router.push(
      `/settings/user/${userId}/metrics/${metricData[0]?.metricId}/update`
    )
  }

  const handleUpdateAllergies = () => {
    router.push(`/settings/user/${userId}/allergies/update`)
  }

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
                    actionText="Cập nhật"
                    margin={false}
                    onPress={handleUpdateInformation}
                  />

                  <Card>
                    {userInfoList.map((item, index) => {
                      const Icon = item.icon

                      return (
                        <ListItem
                          key={index}
                          label={item.label}
                          startIcon={
                            Icon ? (
                              <Icon
                                variant="Bold"
                                size={24}
                                color={COLORS.accent}
                              />
                            ) : null
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
                    label="Sức khỏe"
                    actionText="Cập nhật"
                    margin={false}
                    onPress={handleUpdateMetric}
                  />

                  <Card>
                    {userMetricList.map((item, index) => {
                      const Icon = item.icon

                      return (
                        <ListItem
                          key={index}
                          label={item.label}
                          startIcon={
                            Icon ? (
                              <Icon
                                variant="Bold"
                                size={24}
                                color={COLORS.accent}
                              />
                            ) : null
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
                    label="Dị ứng"
                    actionText="Cập nhật"
                    margin={false}
                    onPress={handleUpdateAllergies}
                  />

                  <Card>
                    <ListItem
                      label={allergiesNames}
                      startIcon={
                        <Slash variant="Bold" size={24} color={COLORS.accent} />
                      }
                      endIcon={<View></View>}
                      isBorder={false}
                    />
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

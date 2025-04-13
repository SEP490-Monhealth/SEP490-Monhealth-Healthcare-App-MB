import React from "react"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { Setting } from "iconsax-react-native"

import {
  Chip,
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { ErrorDisplay } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useGetAllergiesByUserId } from "@/hooks/useUserAllergy"

function UserAllergiesScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>()

  const { data: allergiesData, isLoading: isAllergiesLoading } =
    useGetAllergiesByUserId(userId)

  if (isAllergiesLoading) {
    return <LoadingScreen />
  }

  if (!allergiesData || allergiesData.length === 0) {
    return (
      <Container>
        <Header
          back
          label="Dị ứng của tôi"
          action={{
            icon: <Setting size={24} color={COLORS.primary} />,
            href: `/settings/user/${userId}/allergies/update`
          }}
        />
        <Content className="mt-2">
          <ErrorDisplay
            imageSource={require("../../../../../../public/images/monhealth-no-data-image.png")}
            title="Không có dữ liệu"
            description="Không tìm thấy có danh sách dị ứng nào ở đây!"
            marginTop={12}
          />
        </Content>
      </Container>
    )
  }

  return (
    <Container>
      <Header
        back
        label="Dị ứng của tôi"
        action={{
          icon: <Setting size={24} color={COLORS.primary} />,
          href: `/settings/user/${userId}/allergies/update`
        }}
      />
      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={12} className="pb-20">
            {allergiesData.map((allergy) => (
              <Chip
                key={allergy.allergyId}
                size="lg"
                border
                borderWidth={2}
                label={allergy.name}
                description={allergy.description}
                selected={true}
              />
            ))}
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default UserAllergiesScreen

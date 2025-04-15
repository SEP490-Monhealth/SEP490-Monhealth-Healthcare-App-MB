import React from "react"

import { Linking, Text, View } from "react-native"

import { LoadingScreen } from "@/app/loading"
import { Crown1, Edit2, Zoom } from "iconsax-react-native"

import {
  Card,
  Container,
  Content,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { CertificateItem } from "@/components/local/tabs/settings/consultant"

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import { useGetConsultantById } from "@/hooks/useConsultant"

function AboutConsultantScreen() {
  const { user } = useAuth()
  const consultantId = user?.consultantId

  const { data: consultantData, isLoading } = useGetConsultantById(consultantId)

  if (!consultantData || isLoading) return <LoadingScreen />

  const linkMeet = "https://meet.google.com/phm-iunw-nij"

  const aboutItems = [
    {
      icon: <Crown1 variant="Bold" size="24" color={COLORS.primary} />,
      label: "Kinh nghiệm",
      value: `${consultantData.experience} năm`
    },
    {
      icon: <Zoom variant="Bold" size="24" color={COLORS.primary} />,
      label: "Link gặp mặt",
      value: linkMeet
    }
  ]

  const handleLinking = (meeting: string) => {
    Linking.openURL(meeting)
  }

  return (
    <Container>
      <Header
        back
        label="Mô tả"
        action={{
          icon: <Edit2 variant="Bold" size="20" color={COLORS.primary} />,
          href: `/settings/consultant/${consultantId}/about/update`
        }}
      />

      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={20} className="pb-20">
            <View>
              <Section label="Giới thiệu" margin={false} />
              <Card>
                <Text className="font-tregular text-base text-secondary">
                  {consultantData.bio}
                </Text>
              </Card>
            </View>
            <View>
              <Section label="Kinh nghiệm" margin={false} />
              <Card>
                {aboutItems.map((item, index) => (
                  <CertificateItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    onPress={() => handleLinking(item.value)}
                  />
                ))}
              </Card>
            </View>
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default AboutConsultantScreen

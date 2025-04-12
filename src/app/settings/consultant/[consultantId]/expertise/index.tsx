import React from "react"

import { Image, Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { Setting } from "iconsax-react-native"

import {
  Badge,
  Card,
  Container,
  Content,
  HStack,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { ListCertificate } from "@/components/local/tabs/settings"

import { COLORS } from "@/constants/color"

import { useGetCertificatesByConsultantId } from "@/hooks/useCertificate"

import { formatDate } from "@/utils/formatters"

function ExpertiseConsultantScreen() {
  const { consultantId } = useLocalSearchParams() as {
    consultantId: string
  }

  const { data: certificatesData, isLoading: isCertificatesLoading } =
    useGetCertificatesByConsultantId(consultantId)

  if (!certificatesData || isCertificatesLoading) return <LoadingScreen />

  const certificateData = certificatesData[0]

  const expertiseDescription =
    "Tư vấn cải thiện chất lượng giấc ngủ và khắc phục các rối loạn giấc ngủ nhẹ."

  const certificateList = [
    {
      label: "Số hiệu:",
      value: certificateData.number
    },
    {
      label: "Tên:",
      value: certificateData.name
    },
    {
      label: "Ngày cấp:",
      value: formatDate(certificateData.issueDate)
    },
    {
      label: "Ngày hết hạn:",
      value: formatDate(certificateData.expiryDate || "Vĩnh viễn")
    },
    {
      label: "Nơi cấp:",
      value: certificateData.issuedBy
    }
  ]

  return (
    <Container>
      <Header
        back
        label="Năng lực chuyên môn"
        action={{
          icon: <Setting variant="Bold" size={24} color={COLORS.primary} />,
          href: `/settings/consultant/${consultantId}/expertise/update`
        }}
      />

      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={20} className="pb-20">
            <VStack>
              <Section label="Chuyên môn bản thân" margin={false} />
              <Card>
                <VStack gap={10}>
                  <HStack center className="justify-between">
                    <Text className="font-tbold text-xl text-primary">
                      {certificateData.expertiseName}
                    </Text>
                    <Badge
                      label={
                        certificateData.isVerified ? "Xác thực" : "Chưa duyệt"
                      }
                      background={
                        certificateData.isVerified
                          ? COLORS.primary
                          : COLORS.destructive
                      }
                      color="#fff"
                      rounded
                    />
                  </HStack>

                  <Text className="text-justify font-tmedium text-sm text-accent">
                    {expertiseDescription}
                  </Text>
                </VStack>
              </Card>
            </VStack>

            <VStack>
              <Section label="Chứng chỉ bản thân" margin={false} />

              <Card>
                {certificateList.map((item, index) => {
                  return (
                    <ListCertificate
                      key={index}
                      label={item.label}
                      value={item.value}
                    />
                  )
                })}
              </Card>
            </VStack>

            <VStack>
              <Section label="Hình ảnh chứng chỉ" margin={false} />

              <View className="-mt-2 flex-row flex-wrap">
                {certificateData.imageUrls.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className="rounded-xl border border-border"
                      style={{ width: "30%", aspectRatio: 1, margin: "1.5%" }}
                    >
                      <Image
                        source={{ uri: item }}
                        className="h-full w-full rounded-xl object-cover"
                      />
                    </View>
                  )
                })}
              </View>
            </VStack>
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ExpertiseConsultantScreen

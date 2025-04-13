import React from "react"

import { Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import {
  Building,
  Calendar,
  DocumentText,
  Edit2,
  Medal
} from "iconsax-react-native"

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

import {
  CertificateImage,
  CertificateItem
} from "@/components/local/tabs/settings/consultant"

import { COLORS } from "@/constants/color"

import { useGetCertificatesByConsultantId } from "@/hooks/useCertificate"

import { formatDate } from "@/utils/formatters"

function ExpertiseScreen() {
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const { data: certificatesData, isLoading: isCertificatesLoading } =
    useGetCertificatesByConsultantId(consultantId)

  if (!certificatesData || isCertificatesLoading) return <LoadingScreen />

  const certificateData = certificatesData[0]

  const certificateItems = [
    {
      icon: <DocumentText variant="Bold" size="24" color={COLORS.primary} />,
      label: "Số chứng chỉ",
      value: certificateData.number
    },
    {
      icon: <Medal variant="Bold" size="24" color={COLORS.primary} />,
      label: "Tên chứng chỉ",
      value: certificateData.name
    },
    {
      icon: <Calendar variant="Bold" size="24" color={COLORS.primary} />,
      label: "Ngày cấp",
      value: formatDate(certificateData.issueDate)
    },
    {
      icon: <Calendar variant="Bold" size="24" color={COLORS.primary} />,
      label: "Ngày hết hạn",
      value: certificateData.expiryDate
        ? formatDate(certificateData.expiryDate)
        : "Không giới hạn"
    },
    {
      icon: <Building variant="Bold" size="24" color={COLORS.primary} />,
      label: "Nơi cấp",
      value: certificateData.issuedBy
    }
  ]

  const handleViewImage = (imageUrl: string) => {
    console.log("View image:", imageUrl)
  }

  return (
    <Container>
      <Header
        back
        label="Chuyên môn"
        action={{
          icon: <Edit2 variant="Bold" size="20" color={COLORS.primary} />,
          href: `/settings/consultant/${consultantId}/expertise/update`
        }}
      />

      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={20} className="pb-12">
            <View>
              <Section label="Chuyên môn" margin={false} />

              <Card className="p-4">
                <VStack gap={12}>
                  <HStack center className="justify-between">
                    <Text className="font-tbold text-xl text-primary">
                      {certificateData.expertiseName}
                    </Text>

                    <Badge
                      label={
                        certificateData.isVerified
                          ? "Đã xác thực"
                          : "Chưa xác thực"
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

                  <Text className="font-tregular text-base text-secondary">
                    {certificateData.expertiseDescription}
                  </Text>
                </VStack>
              </Card>
            </View>

            <View>
              <Section label="Thông tin chứng chỉ" margin={false} />

              <Card>
                {certificateItems.map((item, index) => (
                  <CertificateItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </Card>
            </View>

            <VStack gap={8}>
              <Section label="Hình ảnh chứng chỉ" margin={false} />

              <View className="flex-row flex-wrap gap-2">
                {certificateData.imageUrls?.map((imageUrl, index) => (
                  <CertificateImage
                    key={index}
                    imageUrl={imageUrl}
                    onPress={() => handleViewImage(imageUrl)}
                  />
                ))}
              </View>
            </VStack>
          </VStack>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ExpertiseScreen

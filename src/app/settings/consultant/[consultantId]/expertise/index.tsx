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

  const currentCertificateData = certificatesData[0]

  const certificateItems = [
    {
      icon: <DocumentText variant="Bold" size="24" color={COLORS.primary} />,
      label: "Số chứng chỉ",
      value: currentCertificateData.number
    },
    {
      icon: <Medal variant="Bold" size="24" color={COLORS.primary} />,
      label: "Tên chứng chỉ",
      value: currentCertificateData.name
    },
    {
      icon: <Calendar variant="Bold" size="24" color={COLORS.primary} />,
      label: "Ngày cấp",
      value: formatDate(currentCertificateData.issueDate)
    },
    {
      icon: <Calendar variant="Bold" size="24" color={COLORS.primary} />,
      label: "Ngày hết hạn",
      value: currentCertificateData.expiryDate
        ? formatDate(currentCertificateData.expiryDate)
        : "Không giới hạn"
    },
    {
      icon: <Building variant="Bold" size="24" color={COLORS.primary} />,
      label: "Nơi cấp",
      value: currentCertificateData.issuedBy
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
                      {currentCertificateData.expertiseName}
                    </Text>

                    <Badge
                      label={
                        currentCertificateData.isVerified
                          ? "Đã xác thực"
                          : "Chưa xác thực"
                      }
                      background={
                        currentCertificateData.isVerified
                          ? COLORS.primary
                          : COLORS.destructive
                      }
                      color="#fff"
                      rounded
                    />
                  </HStack>

                  <Text className="font-tregular text-base text-secondary">
                    {currentCertificateData.expertiseDescription}
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
                {currentCertificateData.imageUrls?.map((imageUrl, index) => (
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

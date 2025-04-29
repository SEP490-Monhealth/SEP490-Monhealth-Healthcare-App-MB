import React from "react"

import { Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import {
  Building,
  CalendarAdd,
  CalendarRemove,
  Edit2,
  Personalcard,
  Teacher,
  Verify
} from "iconsax-react-native"

import {
  Card,
  Container,
  Content,
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
      icon: <Personalcard variant="Bold" size="24" color={COLORS.primary} />,
      label: "Số chứng chỉ",
      value: currentCertificateData.number
    },
    {
      icon: <Teacher variant="Bold" size="24" color={COLORS.primary} />,
      label: "Tên chứng chỉ",
      value: currentCertificateData.name
    },
    {
      icon: <CalendarAdd variant="Bold" size="24" color={COLORS.primary} />,
      label: "Ngày cấp",
      value: formatDate(currentCertificateData.issueDate)
    },
    {
      icon: <CalendarRemove variant="Bold" size="24" color={COLORS.primary} />,
      label: "Ngày hết hạn",
      value: currentCertificateData.expiryDate
        ? formatDate(currentCertificateData.expiryDate)
        : "Không giới hạn"
    },
    {
      icon: <Building variant="Bold" size="24" color={COLORS.primary} />,
      label: "Nơi cấp",
      value: currentCertificateData.issuedBy
    },
    {
      icon: <Verify variant="Bold" size="24" color={COLORS.primary} />,
      label: "Xác thực",
      value: currentCertificateData.isVerified ? "Đã xác thực" : "Chưa xác thực"
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
        <ScrollArea className="pb-12">
          <Section label="Chuyên môn" margin={false} />

          <Card>
            <VStack>
              <Text className="font-tbold text-xl text-primary">
                {currentCertificateData.expertiseName}
              </Text>

              <Text className="font-tregular text-base text-secondary">
                {currentCertificateData.expertiseDescription}
              </Text>
            </VStack>
          </Card>

          <Section label="Chứng chỉ" />

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

          <Section label="Hình ảnh" />

          <View className="flex-row flex-wrap gap-2">
            {currentCertificateData.imageUrls?.map((imageUrl, index) => (
              <CertificateImage
                key={index}
                imageUrl={imageUrl}
                onPress={() => handleViewImage(imageUrl)}
              />
            ))}
          </View>
        </ScrollArea>
      </Content>
    </Container>
  )
}

export default ExpertiseScreen

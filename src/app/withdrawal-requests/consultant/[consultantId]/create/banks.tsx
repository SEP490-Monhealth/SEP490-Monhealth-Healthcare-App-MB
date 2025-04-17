import React from "react"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { Container, Content, VStack } from "@/components/global/atoms"
import { BankCard, ErrorDisplay } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { useGetConsultantBanksByConsultantId } from "@/hooks/useConsultantBank"

import { ConsultantBankType } from "@/schemas/consultantBankSchema"

interface ConsultantBanksScreenProps {}

const ConsultantBanksScreen = ({}: ConsultantBanksScreenProps) => {
  const router = useRouter()
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const { data: consultantBanksData, isLoading: isConsultantBanksLoading } =
    useGetConsultantBanksByConsultantId(consultantId)

  const handleSelectBank = (bank: ConsultantBankType) => {
    router.replace({
      pathname: `/withdrawal-requests/consultant/${consultantId}/create`,
      params: {
        consultantBankId: bank.consultantBankId,
        accountNumber: bank.number
      }
    })
  }

  if (!consultantBanksData || isConsultantBanksLoading) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header back label="Ngân hàng" />

      <Content className="mt-2">
        {consultantBanksData && consultantBanksData.length > 0 ? (
          <VStack gap={12}>
            {consultantBanksData.map((bank) => (
              <BankCard
                key={bank.consultantBankId}
                name={bank.name}
                shortName={bank.number}
                logoUrl={bank.bank.logoUrl}
                addNewButton
                onPress={() => handleSelectBank(bank)}
              />
            ))}
          </VStack>
        ) : (
          <ErrorDisplay
            imageSource={require("../../../../../../public/images/monhealth-no-data-image.png")}
            title="Không có dữ liệu"
            description="Không tìm thấy có ngân hàng nào ở đây!"
            marginTop={12}
          />
        )}
      </Content>
    </Container>
  )
}

export default ConsultantBanksScreen

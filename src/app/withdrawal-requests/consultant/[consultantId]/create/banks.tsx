import React from "react"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"

import { Container, Content, VStack } from "@/components/global/atoms"
import { BankCard, ErrorDisplay } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { useGetConsultantBanksByConsultantId } from "@/hooks/useConsultantBank"

import { ConsultantBankType } from "@/schemas/consultantBankSchema"

import { useWithdrawalRequestStore } from "@/stores/withdrawalRequestStore"

const ConsultantBanksScreen = () => {
  const router = useRouter()
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const { consultantBankId, updateField } = useWithdrawalRequestStore()

  const { data: consultantBanksData } =
    useGetConsultantBanksByConsultantId(consultantId)

  const handleSelectBank = (bank: ConsultantBankType) => {
    updateField("consultantBankId", bank.consultantBankId)
    updateField("accountNumber", bank.number)

    updateField("name", bank.bank.name)
    updateField("shortName", bank.bank.shortName)
    updateField("logoUrl", bank.bank.logoUrl)
    router.back()
  }

  if (!consultantBanksData) {
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
                isSelected={bank.consultantBankId === consultantBankId}
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

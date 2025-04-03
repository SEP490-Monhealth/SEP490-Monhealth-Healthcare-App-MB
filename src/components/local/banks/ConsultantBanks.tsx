import React, { useRef, useState } from "react"

import { Dimensions, FlatList, Text, View } from "react-native"

import { Card, VStack } from "@/components/global/atoms"
import { ConsultantBankCard } from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { ConsultantBankType } from "@/schemas/consultantBankSchema"

interface ConsultantBanksProps {
  consultantBanks: ConsultantBankType[] | undefined
  isLoading: boolean
  onOpenSheet: (consultantBank: ConsultantBankType) => void
}

const { width } = Dimensions.get("window")
const CARD_WIDTH = width * 0.9 - 4

export const ConsultantBanks = ({
  consultantBanks,
  isLoading,
  onOpenSheet
}: ConsultantBanksProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index)
      }
    }
  ).current

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current

  const renderBankCard = ({ item }: { item: ConsultantBankType }) => (
    <View style={{ width: CARD_WIDTH, marginRight: 12 }}>
      <ConsultantBankCard
        key={item.consultantBankId}
        bank={item.bank}
        number={item.number}
        name={item.name}
        isDefault={item.isDefault}
        onMorePress={() => onOpenSheet(item)}
      />
    </View>
  )

  const renderPagination = () => {
    if (!consultantBanks || consultantBanks.length <= 1) return null

    return (
      <View className="flex-row justify-center">
        {consultantBanks.map((_, index) => (
          <View
            key={index}
            className={`mx-1 h-3 rounded-full ${
              activeIndex === index ? "w-9 bg-primary" : "w-3 bg-gray-200"
            }`}
          />
        ))}
      </View>
    )
  }

  return (
    <>
      <Section label="Danh sách tài khoản" margin={false} />

      {isLoading ? (
        <Card>
          <VStack gap={12} className="items-center py-6">
            <Text className="font-tmedium text-accent">Đang tải...</Text>
          </VStack>
        </Card>
      ) : consultantBanks && consultantBanks.length > 0 ? (
        <VStack gap={12}>
          <FlatList
            data={consultantBanks}
            renderItem={renderBankCard}
            keyExtractor={(item) => item.consultantBankId.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval={CARD_WIDTH + 12}
            decelerationRate="fast"
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
          {renderPagination()}
        </VStack>
      ) : (
        <ConsultantBankCard />
      )}
    </>
  )
}

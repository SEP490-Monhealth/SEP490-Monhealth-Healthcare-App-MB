import React, { useEffect, useMemo, useState } from "react"

import { FlatList, Keyboard, View } from "react-native"
import { ActivityIndicator } from "react-native"

import { SearchNormal1 } from "iconsax-react-native"

import { Input } from "@/components/global/atoms"
import {
  BankCard,
  ErrorDisplay,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useGetAllBanks } from "@/hooks/useBank"
import { useDebounce } from "@/hooks/useDebounce"

import { BankType } from "@/schemas/bankSchema"

import { useBankStore } from "@/stores/bankStore"

interface BankSelectionProps {
  setValue: any
  setIsLoading?: (isLoading: boolean) => void
}

function BankSelection({ setValue, setIsLoading }: BankSelectionProps) {
  const { updateField } = useBankStore()

  const [banksData, setBanksData] = useState<BankType[]>([])
  const [page, setPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [selectedBank, setSelectedBank] = useState<string | null>(null)

  const limit = 10

  const debouncedSearch = useDebounce(searchQuery)

  const { data, isLoading, refetch } = useGetAllBanks(
    page,
    limit,
    debouncedSearch,
    true
  )

  useEffect(() => {
    if (setIsLoading) {
      setIsLoading(isLoading && banksData.length === 0)
    }
  }, [isLoading, banksData, setIsLoading])

  useEffect(() => {
    if (data?.banks) {
      setBanksData((prev) =>
        page === 1 ? data.banks : [...prev, ...data.banks]
      )
      setHasMore(page * limit < data.totalItems)
    }
  }, [data, page])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  useEffect(() => {
    if (!isLoading && isRefreshing) {
      setIsRefreshing(false)
    }
  }, [isLoading, isRefreshing])

  const loadMoreData = () => {
    if (!hasMore || isLoading) return
    setPage((prev) => prev + 1)
  }

  const onEndReached = () => {
    if (isLoading || !hasMore) return
    Keyboard.dismiss()
    loadMoreData()
  }

  const onRefresh = () => {
    setIsRefreshing(true)
    Keyboard.dismiss()
    setPage(1)
    refetch()
    setIsRefreshing(false)
  }

  const handleSelectBank = (bankId: string) => {
    if (selectedBank === bankId) {
      setSelectedBank(null)
      setValue("bankId", null)
      updateField("bankId", "")
    } else {
      setSelectedBank(bankId)
      setValue("bankId", bankId)
      updateField("bankId", bankId)
    }
  }

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader>
        <Section label="Danh sách ngân hàng" />
      </ListHeader>
    )
  }, [])

  if (banksData.length === 0 && isLoading) {
    return null
  }

  return (
    <View className="px-6">
      <Input
        value={searchQuery}
        placeholder="Tìm kiếm ngân hàng..."
        onChangeText={(text) => setSearchQuery(text)}
        startIcon={<SearchNormal1 size={20} color={COLORS.primary} />}
        canClearText
      />

      <FlatList
        data={banksData || []}
        keyExtractor={(item, index) => `${item.bankId}-${index}`}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={FlatListHeader}
        renderItem={({ item }) => (
          <BankCard
            name={item.name}
            shortName={item.shortName}
            logoUrl={item.logoUrl}
            isSelected={item.bankId === selectedBank}
            addNewButton
            onPress={() => handleSelectBank(item.bankId)}
          />
        )}
        ListFooterComponent={
          hasMore ? (
            <ListFooter>
              <ActivityIndicator color={COLORS.primary} />
            </ListFooter>
          ) : (
            <ListFooter />
          )
        }
        ListEmptyComponent={
          <ErrorDisplay
            imageSource={require("../../../../../../public/images/monhealth-no-data-image.png")}
            title="Không có dữ liệu"
            description="Không tìm thấy có ngân hàng nào ở đây!"
            marginTop={24}
          />
        }
        ItemSeparatorComponent={() => <View className="h-3" />}
      />
    </View>
  )
}

export default BankSelection

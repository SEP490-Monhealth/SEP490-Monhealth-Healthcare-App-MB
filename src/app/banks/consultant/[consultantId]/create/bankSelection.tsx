import React, { useEffect, useMemo, useState } from "react"

import { FlatList, Keyboard, Text, View } from "react-native"
import { ActivityIndicator } from "react-native"
import { TouchableOpacity } from "react-native"

import { SearchNormal1 } from "iconsax-react-native"
import { Control, FieldValues } from "react-hook-form"

import { HStack, Input } from "@/components/global/atoms"
import {
  BankCard,
  CustomHeader,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"

import { COLORS } from "@/constants/color"

import { useGetAllBanks } from "@/hooks/useBank"
import { useDebounce } from "@/hooks/useDebounce"

import { BankType } from "@/schemas/bankSchema"

import { useSelectBankStore } from "@/stores/bankStore"

interface BankSelectionProps {
  control: Control<FieldValues>
  errors: any
  setValue: any
}

function BankSelection({ control, errors, setValue }: BankSelectionProps) {
  const [banksData, setBanksData] = useState<BankType[]>([])
  const [page, setPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const limit = 10
  const debouncedSearch = useDebounce(searchQuery)

  const { data, isLoading } = useGetAllBanks(page, limit, debouncedSearch, true)

  const { code, shortName } = useSelectBankStore()

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
    setIsRefreshing(false)
  }

  const handleDelete = () => {
    useSelectBankStore.getState().reset()

    setValue("bank", "", { shouldValidate: true })
  }

  const handleSelectBank = (
    code: string,
    name: string,
    shortName: string,
    logoUrl: string
  ) => {
    useSelectBankStore.getState().updateBank("code", code)
    useSelectBankStore.getState().updateBank("name", name)
    useSelectBankStore.getState().updateBank("shortName", shortName)
    useSelectBankStore.getState().updateBank("logoUrl", logoUrl)

    setValue("bank", code, { shouldValidate: true })
  }

  console.log(errors)

  const FlatListHeader = useMemo(() => {
    return (
      <ListHeader>
        <HStack center className="justify-between">
          <Text
            className={`font-base py-4 text-lg ${
              errors.bank ? "text-destructive" : "text-primary"
            }`}
          >
            Chọn ngân hàng của bạn
          </Text>

          <TouchableOpacity activeOpacity={0.8} onPress={handleDelete}>
            <Text className="font-tregular text-base text-accent">Xóa</Text>
          </TouchableOpacity>
        </HStack>
      </ListHeader>
    )
  }, [code, shortName, errors.bank?.message])

  return (
    <View className="px-6 pb-4">
      <CustomHeader
        back={false}
        content={
          <Input
            value={searchQuery}
            placeholder="Tìm kiếm ngân hàng..."
            onChangeText={(text) => setSearchQuery(text)}
            startIcon={<SearchNormal1 size={20} color={COLORS.primary} />}
            canClearText
          />
        }
      />

      <FlatList
        data={banksData || []}
        keyExtractor={(item, index) => `${item.bankId}-${index}`}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        removeClippedSubviews
        updateCellsBatchingPeriod={50}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={FlatListHeader}
        renderItem={({ item }) => (
          <BankCard
            code={item.code}
            name={item.name}
            shortName={item.shortName}
            logoUrl={item.logoUrl}
            onPress={() => {
              handleSelectBank(
                item.code,
                item.name,
                item.shortName,
                item.logoUrl
              )
            }}
          />
        )}
        ListFooterComponent={
          hasMore ? (
            <ListFooter>
              <ActivityIndicator color={COLORS.primary} />
            </ListFooter>
          ) : (
            <ListFooter className="pb-28" />
          )
        }
        ItemSeparatorComponent={() => <View className="h-3" />}
      />
    </View>
  )
}

export default BankSelection

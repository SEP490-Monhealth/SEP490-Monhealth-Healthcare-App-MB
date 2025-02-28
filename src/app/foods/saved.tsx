import React, { useState } from "react"

import { FlatList, View } from "react-native"

import { Button, Container, Content, Modal } from "@/components/global/atoms"
import {
  ErrorDisplay,
  FoodCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { useStorage } from "@/contexts/StorageContext"

import { useRouterHandlers } from "@/hooks/useRouter"

function FoodSavedScreen() {
  const { handleViewFood } = useRouterHandlers()
  const { savedFoods, clearSavedFoods } = useStorage()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onRefresh = async () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const handleClear = () => {
    setIsModalVisible(true)
  }

  return (
    <>
      <Container>
        <Header back label="Món ăn đã lưu" />

        <Content className="mt-2">
          <FlatList
            data={savedFoods || []}
            keyExtractor={(item) => item.foodId}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={<ListHeader />}
            renderItem={({ item }) => (
              <FoodCard
                name={item.name}
                calories={item.nutrition.calories}
                size={item.portion.size}
                weight={item.portion.weight}
                unit={item.portion.unit}
                onPress={() => handleViewFood(item.foodId)}
              />
            )}
            ListEmptyComponent={() => (
              <ErrorDisplay
                imageSource={require("../../../public/images/monhealth-no-data-image.png")}
                title="Chưa có món ăn"
                description="Bạn chưa lưu món ăn nào. Hãy bắt đầu ngay!"
                marginTop={24}
              />
            )}
            ListFooterComponent={<ListFooter />}
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </Content>

        {savedFoods.length > 0 && (
          <Button
            variant="danger"
            size="lg"
            onPress={handleClear}
            className="absolute bottom-4 left-6 right-6 w-full"
          >
            Xóa tất cả
          </Button>
        )}
      </Container>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Xóa món ăn đã lưu"
        description="Bạn có chắc chắn muốn xóa tất cả món ăn đã lưu không?"
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={clearSavedFoods}
      />
    </>
  )
}

export default FoodSavedScreen

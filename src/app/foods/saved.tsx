import React, { useState } from "react"

import { Alert, FlatList, View } from "react-native"

import { Edit2 } from "iconsax-react-native"

import { Button, Container, Content } from "@/components/global/atoms"
import {
  ErrorDisplay,
  FoodCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

import { useSaveFoods } from "@/contexts/SaveFoodContext"

import { useRouterHandlers } from "@/hooks/useRouter"

function FoodSavedScreen() {
  const { handleViewFood } = useRouterHandlers()
  const { saveFoodsData, clearFoodSaved } = useSaveFoods()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = async () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const handleClearSavedFood = () => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa tất cả món ăn đã lưu?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Xóa",
          onPress: clearFoodSaved,
          style: "destructive"
        }
      ],
      { cancelable: true }
    )
  }

  return (
    <Container>
      <Header
        back
        label="Món ăn đã lưu"
        action={{
          icon: <Edit2 variant="Bold" size={20} color={COLORS.primary} />
        }}
      />

      <Content className="mt-2">
        <FlatList
          data={saveFoodsData || []}
          keyExtractor={(item) => item.foodId}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={<ListHeader />}
          renderItem={({ item }) => (
            <FoodCard
              key={item.foodId}
              variant="add"
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
              title="Không có dữ liệu"
              description="Bạn chưa lưu món ăn nào trong danh sách. Hãy thêm món ăn yêu
                  thích của bạn!"
              marginTop={24}
            />
          )}
          ListFooterComponent={<ListFooter />}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>

      {saveFoodsData.length > 0 && (
        <Button
          variant="danger"
          size="lg"
          onPress={handleClearSavedFood}
          className="absolute bottom-4 left-6 right-6 w-full"
        >
          Xóa tất cả
        </Button>
      )}
    </Container>
  )
}

export default FoodSavedScreen

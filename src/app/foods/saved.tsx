import React, { useState } from "react"

import { Alert, Animated, FlatList, View } from "react-native"

import { Edit2 } from "iconsax-react-native"

import { Button, Container, Content, VStack } from "@/components/global/atoms"
import { FoodCard, ListFooter } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/app"

import { useSaveFoods } from "@/contexts/SaveFoodContext"

import { useAnimation } from "@/hooks/useAnimation"

function FoodSavedScreen() {
  const { saveFoodsData, clearFoodSaved } = useSaveFoods()

  const { fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim } =
    useAnimation()

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
    <Container className="flex-1">
      <Header
        back
        label="Món ăn đã lưu"
        action={{
          icon: <Edit2 variant="Bold" size={20} color={COLORS.primary} />
        }}
      />

      <Content className="mt-2 flex-1 items-center justify-center">
        {saveFoodsData.length > 0 ? (
          <FlatList
            data={saveFoodsData || []}
            keyExtractor={(item) => item.foodId}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            renderItem={({ item }) => (
              <FoodCard
                key={item.foodId}
                variant="add"
                foodId={item.foodId}
                name={item.name}
                calories={item.nutrition.calories}
                size={item.portion.size}
                weight={item.portion.weight}
                unit={item.portion.unit}
              />
            )}
            ListFooterComponent={<ListFooter />}
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        ) : (
          <VStack center gap={20}>
            <View className="w-full items-center">
              <Animated.Image
                source={require("../../../public/images/monhealth-no-data-image.png")}
                style={{
                  width: 320,
                  height: 320,
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }]
                }}
              />
            </View>

            <VStack>
              <Animated.Text
                style={{
                  opacity: textFadeAnim,
                  transform: [{ translateY: textTranslateAnim }]
                }}
                className="text-center font-tbold text-3xl text-primary"
              >
                Không có dữ liệu
              </Animated.Text>

              <Animated.Text
                style={{
                  opacity: textFadeAnim,
                  transform: [{ translateY: textTranslateAnim }]
                }}
                className="text-center font-tmedium text-lg text-secondary"
              >
                Bạn chưa lưu món ăn nào trong danh sách
              </Animated.Text>
            </VStack>
          </VStack>
        )}
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

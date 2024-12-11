import React, { useState } from "react"

import { FlatList, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { SearchNormal1 } from "iconsax-react-native"

import { Container, Content, Input } from "@/components/global/atoms"
import { FoodCard, ListHeader } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/appConstants"
import { suggestedMeals } from "@/constants/meals"

import { getMealTypeName } from "@/utils/helpers"

function UpdateMealScreen() {
  const { mealId } = useLocalSearchParams() as { mealId: string }

  const [foodsData, setFoodsData] = useState(suggestedMeals)

  return (
    <Container>
      <Header back title={getMealTypeName(mealId)} />

      <Content margin={false}>
        <FlatList
          data={foodsData}
          ListHeaderComponent={() => (
            <ListHeader>
              <Input
                value={""}
                placeholder="Nhập tên món ăn..."
                iconStart={<SearchNormal1 size={20} color={COLORS.primary} />}
              />

              <Section title="Chỉnh sửa thực đơn" />
            </ListHeader>
          )}
          renderItem={({ item }) => (
            <FoodCard
              key={item.foodId}
              foodName={item.foodName}
              calories={item.calories}
              portionSize={item.portionSize}
              portionWeight={item.portionWeight}
              measurementUnit={item.measurementUnit}
            />
          )}
          keyExtractor={(item) => item.foodId}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default UpdateMealScreen

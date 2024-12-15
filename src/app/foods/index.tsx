import React, { useState } from "react"

import { FlatList, View } from "react-native"

import { Add, SearchNormal1 } from "iconsax-react-native"

import { Container, Content, Input } from "@/components/global/atoms"
import { FoodCard, ListFooter, ListHeader } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/appConstants"
import { sampleFoodsData } from "@/constants/foods"

function FoodsScreen() {
  const foodsData = sampleFoodsData

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = async () => {
    setIsRefreshing(true)

    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  return (
    <Container>
      <Header
        back
        title="Thức ăn"
        action={{
          icon: <Add size={24} color={COLORS.primary} />,
          url: `/foods/create`
        }}
      />

      <Content>
        <FlatList
          data={foodsData}
          keyExtractor={(item) => item.foodId}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => (
            <ListHeader>
              <Input
                value={""}
                onChangeText={() => {}}
                placeholder="Tìm kiếm tên thức ăn..."
                iconStart={<SearchNormal1 size={20} color={COLORS.primary} />}
              />

              <Section title="Danh sách thức ăn" />
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
          ListFooterComponent={<ListFooter />}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      </Content>
    </Container>
  )
}

export default FoodsScreen

import React, { useState } from "react"

import { FlatList, View } from "react-native"

import { Add } from "iconsax-react-native"

import { Container, Content, Schedule, VStack } from "@/components/global/atoms"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/global/atoms"
import { FoodCard, ListFooter } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/appConstants"
import { sampleFoodsData } from "@/constants/foods"

const TabContent = ({ mealsData }: { mealsData: typeof sampleFoodsData }) => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = async () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  return (
    <FlatList
      data={mealsData}
      keyExtractor={(item) => item.foodId}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      renderItem={({ item }) => (
        <FoodCard
          key={item.foodId}
          variant="more"
          foodId={item.foodId}
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
  )
}

function ScheduleScreen() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const foodsData = sampleFoodsData

  return (
    <Container>
      <Header
        title="Thực đơn"
        action={{
          icon: <Add size={24} color={COLORS.primary} />,
          url: "/foods"
        }}
      />

      <Content>
        <VStack center gap={20} className="mt-4 pb-16">
          <Schedule initialDate={currentDate} />

          <Tabs defaultValue="breakfast" className="w-full">
            <TabsList gap={24}>
              <TabsTrigger value="breakfast">Bữa sáng</TabsTrigger>
              <TabsTrigger value="lunch">Bữa trưa</TabsTrigger>
              <TabsTrigger value="dinner">Bữa tối</TabsTrigger>
              <TabsTrigger value="snack">Bữa phụ</TabsTrigger>
            </TabsList>

            <TabsContent value="breakfast">
              <TabContent mealsData={foodsData} />
            </TabsContent>
            <TabsContent value="lunch">
              <TabContent mealsData={foodsData} />
            </TabsContent>
            <TabsContent value="dinner">
              <TabContent mealsData={foodsData} />
            </TabsContent>
            <TabsContent value="snack">
              <TabContent mealsData={foodsData} />
            </TabsContent>
          </Tabs>
        </VStack>
      </Content>
    </Container>
  )
}

export default ScheduleScreen

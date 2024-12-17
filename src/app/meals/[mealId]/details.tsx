import React, { useMemo, useState } from "react"

import { FlatList, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import LoadingScreen from "@/app/loading"
import { Setting4 } from "iconsax-react-native"

import { Container, Content } from "@/components/global/atoms"
import {
  ArcProgress,
  FoodCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { NutritionSummary } from "@/components/local/meals"

import { COLORS } from "@/constants/appConstants"
import { sampleMealsData } from "@/constants/meals"

import { getMealTypeName } from "@/utils/helpers"

function MealDetailsScreen() {
  const { mealId } = useLocalSearchParams() as { mealId: string }
  const [isRefreshing, setIsRefreshing] = useState(false)

  const mealData = useMemo(
    () => sampleMealsData.find((meal) => meal.mealId === mealId),
    [mealId]
  )

  const calorieValue = useMemo(
    () =>
      mealData?.mealFoods.reduce((total, food) => total + food.calories, 0) ||
      0,
    [mealData]
  )

  const totalCalories = 2499
  const progress = Math.min((calorieValue / totalCalories) * 100, 100)

  const onRefresh = async () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  if (!mealData) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header
        back
        title={getMealTypeName(mealData?.mealType || "")}
        action={{
          icon: <Setting4 variant="Bold" size={24} color={COLORS.primary} />,
          url: `/(tabs)/schedule`
        }}
      />

      <Content margin={false}>
        <FlatList
          data={mealData?.mealFoods}
          keyExtractor={(item) => item.foodId}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => (
            <ListHeader>
              <ArcProgress
                size={240}
                width={14}
                fill={progress}
                arcSweepAngle={260}
                rotation={230}
                centerCircle
                calorieValue={calorieValue}
                maxCalories={totalCalories}
                label="Kcal"
              />

              <NutritionSummary nutritionData={mealData} />

              <Section title="Chi tiết bữa ăn" />
            </ListHeader>
          )}
          renderItem={({ item }) => (
            <FoodCard
              key={item.foodId}
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
      </Content>
    </Container>
  )
}

export default MealDetailsScreen

// import React, { useEffect, useMemo, useState } from "react"

// import { FlatList, Text, View } from "react-native"

// import { useLocalSearchParams } from "expo-router"

// import { Setting4 } from "iconsax-react-native"

// import { Container, Content } from "@/components/global/atoms"
// import {
//   ArcProgress,
//   FoodCard,
//   ListFooter,
//   ListHeader
// } from "@/components/global/molecules"
// import { Header, Section } from "@/components/global/organisms"

// import { COLORS } from "@/constants/appConstants"
// import { eatenMeals, sampleMealsData } from "@/constants/meals"

// import { toFixed2 } from "@/utils/formatters"
// import { getMealTypeName } from "@/utils/helpers"

// function MealDetailsScreen() {
//   const { mealId } = useLocalSearchParams() as { mealId: string }
//   const [isRefreshing, setIsRefreshing] = useState(false)
//   const [selectedFoods, setSelectedFoods] = useState<{
//     [foodId: string]: boolean
//   }>({})

//   const eatenFoodIds = useMemo(() => {
//     const ids: Set<string> = new Set()
//     eatenMeals.forEach((meal) => {
//       meal.mealFoods.forEach((food) => {
//         ids.add(food.foodId)
//       })
//     })
//     return ids
//   }, [])

//   const meal = useMemo(
//     () => sampleMealsData.find((meal) => meal.mealId === mealId),
//     [mealId]
//   )

//   const mealFoods = useMemo(() => {
//     if (!meal) return []
//     return meal.mealFoods.map((food) => ({
//       ...food,
//       checked: eatenFoodIds.has(food.foodId)
//     }))
//   }, [meal, eatenFoodIds])

//   const combinedMeals = useMemo(() => {
//     const allFoods = [...(mealFoods || [])]
//     eatenMeals.forEach((eatenMeal) => {
//       eatenMeal.mealFoods.forEach((eatenFood) => {
//         if (!allFoods.some((food) => food.foodId === eatenFood.foodId)) {
//           allFoods.push({ ...eatenFood, checked: true })
//         }
//       })
//     })
//     return allFoods
//   }, [mealFoods, eatenMeals])

//   useEffect(() => {
//     const initialSelectedFoods: { [foodId: string]: boolean } = {}
//     combinedMeals.forEach((food) => {
//       if (eatenFoodIds.has(food.foodId)) {
//         initialSelectedFoods[food.foodId] = true
//       }
//     })
//     setSelectedFoods(initialSelectedFoods)
//   }, [combinedMeals, eatenFoodIds])

//   const calorieValue = useMemo(() => {
//     return combinedMeals
//       .filter((food) => selectedFoods[food.foodId])
//       .reduce((total, food) => total + food.calories, 0)
//   }, [combinedMeals, selectedFoods])

//   const totalProtein = useMemo(() => {
//     return toFixed2(
//       combinedMeals
//         .filter((food) => selectedFoods[food.foodId])
//         .reduce((total, food) => total + (food.protein || 0), 0)
//     )
//   }, [combinedMeals, selectedFoods])

//   const totalCarbs = useMemo(() => {
//     return toFixed2(
//       combinedMeals
//         .filter((food) => selectedFoods[food.foodId])
//         .reduce((total, food) => total + (food.carbs || 0), 0)
//     )
//   }, [combinedMeals, selectedFoods])

//   const totalFat = useMemo(() => {
//     return toFixed2(
//       combinedMeals
//         .filter((food) => selectedFoods[food.foodId])
//         .reduce((total, food) => total + (food.fat || 0), 0)
//     )
//   }, [combinedMeals, selectedFoods])

//   const totalFiber = useMemo(() => {
//     return toFixed2(
//       combinedMeals
//         .filter((food) => selectedFoods[food.foodId])
//         .reduce((total, food) => total + (food.fiber || 0), 0)
//     )
//   }, [combinedMeals, selectedFoods])

//   const totalSugar = useMemo(() => {
//     return toFixed2(
//       combinedMeals
//         .filter((food) => selectedFoods[food.foodId])
//         .reduce((total, food) => total + (food.sugar || 0), 0)
//     )
//   }, [combinedMeals, selectedFoods])

//   const totalCalories = 2499
//   const progress = Math.min((calorieValue / totalCalories) * 100, 100)

//   const onCheckChange = (foodId: string, checked: boolean) => {
//     setSelectedFoods((prevSelected) => ({
//       ...prevSelected,
//       [foodId]: checked
//     }))
//   }

//   const onRefresh = async () => {
//     setIsRefreshing(true)
//     setTimeout(() => {
//       setIsRefreshing(false)
//     }, 1000)
//   }

//   return (
//     <Container>
//       <Header
//         back
//         title={getMealTypeName(meal?.mealType ?? "")}
//         action={{
//           icon: <Setting4 variant="Bold" size={24} color={COLORS.primary} />,
//           url: `/meals/${mealId}/update-meal`
//         }}
//       />

//       <Content margin={false}>
//         <FlatList
//           data={combinedMeals}
//           ListHeaderComponent={() => (
//             <ListHeader>
//               <ArcProgress
//                 size={240}
//                 width={14}
//                 fill={progress}
//                 arcSweepAngle={260}
//                 rotation={230}
//                 centerCircle={true}
//                 calorieValue={calorieValue}
//                 maxCalories={totalCalories}
//                 label="Calories"
//               />

//               <HStack center className="justify-between px-2">
//                 <NutrientCard label="Protein" value={mealData?.protein || 0} />
//                 <NutrientCard label="Carbs" value={mealData?.carbs || 0} />
//                 <NutrientCard label="Fat" value={mealData?.fat || 0} />
//                 <NutrientCard label="Fiber" value={mealData?.fiber || 0} />
//                 <NutrientCard label="Sugar" value={mealData?.sugar || 0} />
//               </HStack>

//               <Section title="Chi tiết bữa ăn" />
//             </ListHeader>
//           )}
//           renderItem={({ item }) => (
//             <FoodCard
//               key={item.foodId}
//               variant="checkbox"
//               checked={selectedFoods[item.foodId] ?? item.checked}
//               onCheckChange={(checked) => onCheckChange(item.foodId, checked)}
//               foodName={item.foodName}
//               calories={item.calories}
//               portionSize={item.portionSize}
//               portionWeight={item.portionWeight}
//               measurementUnit={item.measurementUnit}
//             />
//           )}
//           ListFooterComponent={<ListFooter />}
//           keyExtractor={(item) => item.foodId}
//           onRefresh={onRefresh}
//           refreshing={isRefreshing}
//           showsVerticalScrollIndicator={false}
//           showsHorizontalScrollIndicator={false}
//           ItemSeparatorComponent={() => <View className="h-3" />}
//         />
//       </Content>
//     </Container>
//   )
// }

// export default MealDetailsScreen

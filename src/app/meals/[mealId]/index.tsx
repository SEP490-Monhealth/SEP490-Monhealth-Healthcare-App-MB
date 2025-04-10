import React, { useCallback, useMemo, useRef, useState } from "react"

import {
  FlatList,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native"
import { Swipeable } from "react-native-gesture-handler"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingOverlay, LoadingScreen } from "@/app/loading"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import { Add, Minus, Trash } from "iconsax-react-native"
import { MoreHorizontal } from "lucide-react-native"

import {
  Container,
  Content,
  Sheet,
  SheetRefProps,
  SheetSelect
} from "@/components/global/atoms"
import { Modal } from "@/components/global/atoms/Modal"
import {
  ArcProgress,
  FoodCard,
  ListFooter,
  ListHeader
} from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { NutritionSummary } from "@/components/local/meals"

import { COLORS } from "@/constants/color"
import { DATA } from "@/constants/data"
import { MealTypeEnum } from "@/constants/enum/Food"

import { useAuth } from "@/contexts/AuthContext"

import { useGetNutritionGoal } from "@/hooks/useGoal"
import {
  useGetMealById,
  useGetMealFoodsByMealId,
  useUpdateMealFoodQuantity,
  useUpdateMealFoodStatus
} from "@/hooks/useMeal"

import { formatDateY } from "@/utils/formatters"
import { getMealTypeName } from "@/utils/helpers"

const MealFoodOptions = React.memo(
  ({ onIncrease, onDecrease, onDelete, quantity }: any) => {
    return [
      {
        label: "Tăng số lượng",
        icon: <Add size={24} color={COLORS.primary} />,
        onPress: onIncrease,
        disabled: false
      },
      {
        label: "Giảm số lượng",
        icon: <Minus size={24} color={COLORS.primary} />,
        onPress: onDecrease,
        disabled: quantity <= 1
      },
      {
        label: "Xóa món ăn",
        icon: <Trash variant="Bold" size={24} color={COLORS.destructive} />,
        onPress: onDelete,
        disabled: false
      }
    ].map((option, index) => (
      <SheetSelect
        key={index}
        label={option.label}
        icon={option.icon}
        onPress={option.onPress}
        disabled={option.disabled}
      />
    ))
  }
)

const RenderRightActions = React.memo(({ onPress }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      className="h-full w-20 items-center justify-center rounded-2xl border border-border bg-primary"
    >
      <MoreHorizontal size={24} color="white" />
    </TouchableOpacity>
  )
})

function MealDetailsScreen() {
  const router = useRouter()

  const SheetRef = useRef<SheetRefProps>(null)
  const swipeableRef = useRef<Swipeable>(null)

  const { user } = useAuth()
  const userId = user?.userId

  const { mealId } = useLocalSearchParams() as { mealId: string }

  const today = formatDateY(new Date())

  const { mutate: updateMealFoodStatus } = useUpdateMealFoodStatus()
  const { mutate: updateMealFoodQuantity } = useUpdateMealFoodQuantity()

  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedMealFoodId, setSelectedMealFoodId] = useState<string | null>(
    null
  )
  const [currentMealFoodId, setCurrentMealFoodId] = useState<string | null>(
    null
  )

  const { data: goalData, isLoading: isLoadingGoal } =
    useGetNutritionGoal(userId)

  const {
    data: mealData,
    isLoading: isLoadingMeal,
    refetch: mealRefetch
  } = useGetMealById(mealId)

  const {
    data: mealFoodsData,
    isLoading: isLoadingMealFoods,
    refetch: mealFoodRefetch
  } = useGetMealFoodsByMealId(mealId)

  const mealType = useMemo(
    () => mealData?.type || MealTypeEnum.Breakfast,
    [mealData]
  )

  const caloriesRatio =
    DATA.MEALS.find((meal) => meal.value === mealType)?.ratio || 0

  const caloriesGoal = ((goalData?.caloriesGoal ?? 0) * caloriesRatio) / 100

  const calorieValue = mealData?.nutrition.calories || 0
  const progress = Math.min((calorieValue / caloriesGoal) * 100, 100)

  const prefillReady = useMemo(
    () => isFetching === 0 && isMutating === 0,
    [isFetching, isMutating]
  )

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await Promise.all([mealRefetch(), mealFoodRefetch()])
    setIsRefreshing(false)
  }, [mealRefetch, mealFoodRefetch])

  const openSheet = useCallback(() => {
    SheetRef.current?.scrollTo(-240)
    swipeableRef.current?.close()
  }, [])

  const closeSheet = useCallback(() => {
    SheetRef.current?.scrollTo(0)
    swipeableRef.current?.close()
  }, [])

  const handleUpdateMealFoodStatus = useCallback(
    (mealFoodId: string) => {
      if (!userId) return

      updateMealFoodStatus({ mealFoodId, mealId, userId, today })
    },
    [mealId, userId, today, updateMealFoodStatus]
  )

  const handleQuantityChange = useCallback(
    (mealFoodId: string, change: number) => {
      if (!userId) return

      const currentFood = mealFoodsData?.find(
        (food) => food.mealFoodId === mealFoodId
      )

      if (currentFood) {
        updateMealFoodQuantity({
          mealFoodId,
          quantity: currentFood.quantity + change,
          mealId,
          userId,
          today
        })
      }
    },
    [userId, mealFoodsData, mealId, today, updateMealFoodQuantity]
  )

  const handleDeleteMealFood = useCallback(() => {
    if (!selectedMealFoodId || !userId) return

    updateMealFoodQuantity(
      { mealFoodId: selectedMealFoodId, quantity: 0, mealId, userId, today },
      {
        onSuccess: () => {
          setIsModalVisible(false)
          setSelectedMealFoodId(null)
          closeSheet()
        }
      }
    )
  }, [
    selectedMealFoodId,
    userId,
    mealId,
    today,
    updateMealFoodQuantity,
    closeSheet
  ])

  const handleOpenDeleteModal = useCallback((mealFoodId: string) => {
    setSelectedMealFoodId(mealFoodId)
    setIsModalVisible(true)
  }, [])

  const handleViewFood = (foodId: string) => {
    router.push(`/foods/${foodId}`)
  }

  if (
    !goalData ||
    isLoadingGoal ||
    !mealData ||
    isLoadingMeal ||
    !mealFoodsData ||
    isLoadingMealFoods
  ) {
    return <LoadingScreen />
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <LoadingOverlay visible={isFetching > 0 || isMutating > 0} />

          <Header
            back
            label={getMealTypeName("vi", mealType)}
            action={{
              icon: <Add size={24} color={COLORS.primary} />,
              href: "/foods"
            }}
          />

          <Content className="mt-4">
            <FlatList
              data={mealFoodsData || []}
              keyExtractor={(item, index) => `${item.foodId}-${index}`}
              onRefresh={onRefresh}
              refreshing={isRefreshing}
              showsVerticalScrollIndicator={false}
              initialNumToRender={10}
              maxToRenderPerBatch={5}
              windowSize={5}
              removeClippedSubviews
              ListHeaderComponent={() => (
                <ListHeader>
                  <ArcProgress
                    size={240}
                    width={14}
                    fill={progress}
                    prefill={prefillReady}
                    arcSweepAngle={260}
                    rotation={230}
                    centerCircle
                    value={calorieValue}
                    maxValue={caloriesGoal}
                    label="kcal"
                  />

                  <NutritionSummary nutritionData={mealData.nutrition} />

                  <Section label="Chi tiết bữa ăn" />
                </ListHeader>
              )}
              renderItem={({ item }) => (
                <Swipeable
                  ref={swipeableRef}
                  renderRightActions={() => (
                    <RenderRightActions
                      onPress={() => {
                        setCurrentMealFoodId(item.mealFoodId)
                        openSheet()
                      }}
                    />
                  )}
                  overshootRight={false}
                  overshootLeft={false}
                  rightThreshold={40}
                  friction={2}
                >
                  <FoodCard
                    variant="checkbox"
                    name={item.name}
                    calories={item.nutrition?.calories}
                    quantity={item.quantity}
                    size={item.portion?.size}
                    weight={item.portion?.weight}
                    unit={item.portion?.unit}
                    recommended={item.isRecommended}
                    status={item.isCompleted}
                    onPress={() => handleViewFood(item.foodId)}
                    onStatusPress={() =>
                      handleUpdateMealFoodStatus(item.mealFoodId)
                    }
                  />
                </Swipeable>
              )}
              ListFooterComponent={<ListFooter />}
              ItemSeparatorComponent={() => <View className="h-3" />}
            />
          </Content>
        </Container>

        <Sheet ref={SheetRef} dynamicHeight={240}>
          {currentMealFoodId && (
            <MealFoodOptions
              onIncrease={() => handleQuantityChange(currentMealFoodId, 1)}
              onDecrease={() => handleQuantityChange(currentMealFoodId, -1)}
              onDelete={() => handleOpenDeleteModal(currentMealFoodId)}
              quantity={
                mealFoodsData?.find(
                  (food) => food.mealFoodId === currentMealFoodId
                )?.quantity || 1
              }
            />
          )}
        </Sheet>

        <Modal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title="Xóa món ăn"
          description="Bạn có chắc chắn muốn xóa món ăn này không?"
          confirmText="Xóa"
          cancelText="Hủy"
          onConfirm={handleDeleteMealFood}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default MealDetailsScreen

import React from "react"

import { Image, Text, View } from "react-native"

import { useRouter } from "expo-router"

import {
  ChatMonAIType,
  FoodType,
  MessageType,
  isAIMessage
} from "@/types/mon-ai"

import { VStack } from "@/components/global/atoms"
import { FoodCard } from "@/components/global/molecules/FoodCard"

import { cn } from "@/lib/utils"

import { MessageContent } from "./MessageContent"

interface MessageItemProps {
  item: MessageType
  userId?: string
}

export const MessageItem = ({ item, userId }: MessageItemProps) => {
  const router = useRouter()

  if (!item) return null

  const isSent = item.sender === userId

  const getFoodItems = (content: ChatMonAIType["content"]): FoodType[] => {
    if (!content.mealPlan || !content.mealPlan.meal) return []

    const allItems: FoodType[] = []

    if (content.mealPlan.meal.breakfast?.items?.length) {
      allItems.push(...content.mealPlan.meal.breakfast.items)
    }

    if (content.mealPlan.meal.lunch?.items?.length) {
      allItems.push(...content.mealPlan.meal.lunch.items)
    }

    if (content.mealPlan.meal.dinner?.items?.length) {
      allItems.push(...content.mealPlan.meal.dinner.items)
    }

    if (content.mealPlan.meal.snack?.items?.length) {
      allItems.push(...content.mealPlan.meal.snack.items)
    }

    return allItems
  }

  const handleViewFood = (foodId: string) => {
    router.push(`/foods/${foodId}`)
  }

  return (
    <View className="mb-4">
      <View
        className={cn(
          "mb-2 flex-row items-end",
          isSent ? "justify-end" : "justify-start"
        )}
      >
        {!isSent && (
          <Image
            source={require("../../../../../public/images/avatars/mon-ai/mon-ai-avatar.jpg")}
            className="mr-2 h-10 w-10 rounded-full"
          />
        )}

        <View
          className={cn(
            "rounded-2xl px-4 py-3",
            isSent ? "self-end bg-primary" : "self-start bg-muted"
          )}
          style={{ maxWidth: "80%" }}
        >
          {isAIMessage(item) ? (
            <MessageContent content={item.content} />
          ) : (
            <Text
              className={cn(
                "font-tregular text-base",
                isSent ? "text-white" : "text-primary"
              )}
            >
              {item.content}
            </Text>
          )}
        </View>
      </View>

      {isAIMessage(item) && item.content.mealPlan && (
        <View className="mt-4">
          {getFoodItems(item.content).length > 0 && (
            <VStack gap={8}>
              {getFoodItems(item.content).map((foodItem) => (
                <FoodCard
                  key={foodItem.foodId}
                  variant="default"
                  name={foodItem.name}
                  calories={foodItem.nutrition.calories}
                  quantity={0}
                  size={foodItem.portion.size}
                  weight={foodItem.portion.weight}
                  unit={foodItem.portion.unit}
                  onPress={() => handleViewFood(foodItem.foodId)}
                />
              ))}
            </VStack>
          )}
        </View>
      )}
    </View>
  )
}

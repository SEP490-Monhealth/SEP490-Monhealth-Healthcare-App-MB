import { Text, View } from "react-native"

import { ChatMonAIType } from "@/types/chat"

interface MessageContentProps {
  content: ChatMonAIType["content"]
}

export const MessageContent = ({ content }: MessageContentProps) => {
  if (content.health_or_fitness === false) {
    return (
      <View className="flex flex-col gap-2">
        {content.GeneralAdvice && (
          <Text className="font-tregular text-base text-primary">
            {content.GeneralAdvice}
          </Text>
        )}
      </View>
    )
  }

  return (
    <View className="flex flex-col gap-2">
      {/* Summary */}
      {content.SummaryConversation && (
        <Text className="font-tregular text-base text-primary">
          {content.SummaryConversation}
        </Text>
      )}

      {/* Meal Plan */}
      {content.mealPlan && (
        <View className="mt-2">
          <Text className="font-tmedium text-base text-primary">
            Kế hoạch ăn uống:
          </Text>
          <Text className="mt-1 font-tregular text-base text-primary">
            {content.mealPlan.detail}
          </Text>

          {/* Meals */}
          {content.mealPlan.meal && (
            <View className="mt-2">
              {/* Breakfast */}
              {content.mealPlan.meal.breakfast?.items.length > 0 && (
                <View className="mt-1">
                  <Text className="font-tmedium text-base text-primary">
                    Bữa sáng:
                  </Text>
                  {content.mealPlan.meal.breakfast.items.map((item) => (
                    <Text
                      key={item.foodId}
                      className="font-tregular text-base text-primary"
                    >
                      • {item.name} ({item.portion.size})
                    </Text>
                  ))}
                </View>
              )}

              {/* Lunch */}
              {content.mealPlan.meal.lunch?.items.length > 0 && (
                <View className="mt-1">
                  <Text className="font-tmedium text-base text-primary">
                    Bữa trưa:
                  </Text>
                  {content.mealPlan.meal.lunch.items.map((item) => (
                    <Text
                      key={item.foodId}
                      className="font-tregular text-base text-primary"
                    >
                      • {item.name} ({item.portion.size})
                    </Text>
                  ))}
                </View>
              )}

              {/* Dinner */}
              {content.mealPlan.meal.dinner?.items.length > 0 && (
                <View className="mt-1">
                  <Text className="font-tmedium text-base text-primary">
                    Bữa tối:
                  </Text>
                  {content.mealPlan.meal.dinner.items.map((item) => (
                    <Text
                      key={item.foodId}
                      className="font-tregular text-base text-primary"
                    >
                      • {item.name} ({item.portion.size})
                    </Text>
                  ))}
                </View>
              )}

              {/* Snacks */}
              {content.mealPlan.meal.snack?.items.length > 0 && (
                <View className="mt-1">
                  <Text className="font-tmedium text-base text-primary">
                    Bữa phụ:
                  </Text>
                  {content.mealPlan.meal.snack.items.map((item) => (
                    <Text
                      key={item.foodId}
                      className="font-tregular text-base text-primary"
                    >
                      • {item.name} ({item.portion.size})
                    </Text>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      )}

      {/* Workout Routine */}
      {content.workoutRoutine && content.workoutRoutine.length > 0 && (
        <View className="mt-2">
          <Text className="font-tmedium text-base text-primary">
            Kế hoạch tập luyện:
          </Text>
          {content.workoutRoutine.map((routine, index) => (
            <View key={index} className="mt-1">
              <Text className="font-tmedium text-base text-primary">
                {routine.stage}:
              </Text>
              {routine.exercises.map((exercise, exIndex) => (
                <Text
                  key={exIndex}
                  className="font-tregular text-base text-primary"
                >
                  • {exercise.name} - {exercise.sets} set x {exercise.reps} lần{" "}
                  {` (nghỉ 60 giây giữa các set)`}{" "}
                  {exercise.duration && `(${exercise.duration} phút)`}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* General Advice */}
      {content.GeneralAdvice && (
        <View className="mt-2">
          <Text className="font-tmedium text-base text-primary">
            Lời khuyên:
          </Text>
          <Text className="font-tregular text-base text-primary">
            {content.GeneralAdvice}
          </Text>
        </View>
      )}
    </View>
  )
}

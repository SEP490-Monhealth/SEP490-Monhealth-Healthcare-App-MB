import React from "react"

import { Text } from "react-native"

import { Star, StarHalf } from "lucide-react-native"

import { COLORS } from "@/constants/color"

import { HStack } from "../atoms"

interface RatingStarsProps {
  rating: number
  count?: number
  showRating?: boolean
  showCount?: boolean
}

export const RatingStars = ({
  rating,
  count,
  showRating = false,
  showCount = false
}: RatingStarsProps) => {
  return (
    <HStack center>
      {Array.from({ length: 5 })
        .map((_, index) => {
          const starValue = index + 1

          if (rating >= starValue) {
            return (
              <Star
                key={index}
                size={14}
                fill={COLORS.PRIMARY.lemon}
                color={COLORS.PRIMARY.lemon}
              />
            )
          } else if (rating >= starValue - 0.5) {
            return (
              <StarHalf
                key={index}
                size={14}
                fill={COLORS.PRIMARY.lemon}
                color={COLORS.PRIMARY.lemon}
              />
            )
          }
          return null
        })
        .filter(Boolean)}

      {(showRating || count) && (
        <Text className="font-tmedium text-sm text-accent">
          {showRating && `(${rating.toFixed(1)})`}
          {count && ` (${count}${showCount ? " đánh giá" : ""})`}
        </Text>
      )}
    </HStack>
  )
}

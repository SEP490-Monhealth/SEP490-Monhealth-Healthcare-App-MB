import React, { useCallback, useEffect, useState } from "react"

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import { useLocalSearchParams } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { Star } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Chip,
  Container,
  Content,
  ErrorText,
  HStack,
  Input,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { sampleBookingsData } from "@/constants/bookings"
import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import { CreateReviewType, createReviewSchema } from "@/schemas/reviewSchema"

const quickReviewsData = [
  "Dịch vụ tuyệt vời",
  "Rất hài lòng",
  "Tư vấn tốt",
  "Hỗ trợ nhiệt tình",
  "Tốt hơn mong đợi",
  "Tuyệt vời"
]

function ReviewCreateScreen() {
  const { bookingId } = useLocalSearchParams() as { bookingId: string }
  const bookingData = sampleBookingsData.find(
    (bookingData) => bookingData.bookingId === bookingId
  )
  const { user } = useAuth()
  const userId = user?.userId

  const [ratingNumber, setRatingNumber] = useState(0)
  const [selectedReviews, setSelectedReviews] = useState<string[]>([])

  const handleRating = (ratingValue: number) => {
    setRatingNumber(ratingValue)
    setValue("rating", ratingValue)
  }

  const handleSelectQuick = (quickly: string) => {
    setSelectedReviews((prev) =>
      prev.includes(quickly)
        ? prev.filter((item) => item !== quickly)
        : [...prev, quickly]
    )
  }

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateReviewType>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      bookingId: bookingData?.bookingId,
      consultantId: bookingData?.consultantId,
      userId: userId,
      rating: 0,
      comment: ""
    }
  })

  const onSubmit = async (reviewData: CreateReviewType) => {
    const comment = `${reviewData.comment}. ${selectedReviews.join(" - ")}`

    const finalData = { ...reviewData, comment: comment }

    console.log("Final Data:", JSON.stringify(finalData, null, 2))
  }

  return (
    <Container>
      <Header back label="Phản hồi" />

      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={10} className="pb-40">
            <Text className="text-justify font-tregular text-base text-secondary">
              Những đánh giá và phản hồi của bạn sẽ góp phần cải thiện chất
              lượng dịch vụ của tư vấn viên, giúp mang lại trải nghiệm tốt hơn
            </Text>

            <VStack center gap={10}>
              <Image
                source={{ uri: bookingData?.consultantAvatar }}
                className="h-32 w-32 rounded-2xl border border-border"
              />

              <VStack center gap={12}>
                <Text className="font-tbold text-2xl text-primary">
                  {bookingData?.consultant}
                </Text>

                <HStack gap={8}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      activeOpacity={0.7}
                      onPress={() => handleRating(star)}
                    >
                      <Star
                        size={24}
                        fill={
                          star <= ratingNumber
                            ? COLORS.PRIMARY.lemon
                            : COLORS.border
                        }
                        color={
                          star <= ratingNumber
                            ? COLORS.PRIMARY.lemon
                            : COLORS.border
                        }
                      />
                    </TouchableOpacity>
                  ))}
                </HStack>

                {errors.rating?.message && (
                  <ErrorText text={errors.rating.message} />
                )}
              </VStack>
            </VStack>

            <VStack gap={20}>
              <View className="flex-row flex-wrap gap-2">
                {quickReviewsData.map((review) => (
                  <Chip
                    key={review}
                    label={review}
                    selected={selectedReviews.includes(review)}
                    onPress={() => handleSelectQuick(review)}
                  />
                ))}
              </View>

              <Section label="Phản hồi của bạn" margin={false} />

              <Controller
                name="comment"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    placeholder="Nhập phản hồi của bạn"
                    onChangeText={onChange}
                    isMultiline
                    numberOfLines={6}
                    canClearText
                    keyboardType="default"
                    errorMessage={errors.comment?.message}
                  />
                )}
              />
            </VStack>
          </VStack>
        </ScrollArea>

        <Button
          size="lg"
          onPress={handleSubmit(onSubmit)}
          className="absolute bottom-4 w-full"
        >
          Phản hồi
        </Button>
      </Content>
    </Container>
  )
}

export default ReviewCreateScreen

import React, { useRef, useState } from "react"

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity
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
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { sampleBookingsData } from "@/constants/bookings"
import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import { CreateReviewType, createReviewSchema } from "@/schemas/reviewSchema"

const quickReviewsData = [
  "Chuyên nghiệp",
  "Nhiệt tình",
  "Đúng giờ",
  "Thân thiện",
  "Hữu ích",
  "Giải pháp thực tế",
  "Phản hồi nhanh"
]

function ReviewCreateScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>()

  const { user } = useAuth()
  const userId = user?.userId

  const scrollViewRef = useRef<ScrollView>(null)

  const bookingData = sampleBookingsData.find(
    (bookingData) => bookingData.bookingId === bookingId
  )

  const [ratingNumber, setRatingNumber] = useState<number>(0)
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
    const comment = `${selectedReviews.join(" - ")}. ${reviewData.comment}`

    const finalData = { ...reviewData, comment: comment }

    console.log("Final Data:", JSON.stringify(finalData, null, 2))
  }

  const scrollToInput = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 50)
  }

  return (
    <Container>
      <Header back label="Phản hồi" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20}
      >
        <Content className="mt-2">
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <VStack className="pb-20">
              <VStack center gap={20}>
                <Text className="text-tregular text-center text-base text-secondary">
                  Hãy giúp chúng tôi cải thiện bằng cách cho chúng tôi biết cuộc
                  hẹn của bạn với chuyên gia tư vấn diễn ra như thế nào
                </Text>

                <VStack center gap={12}>
                  <VStack center gap={8}>
                    <Image
                      source={{ uri: bookingData?.consultantAvatar }}
                      className="h-32 w-32 rounded-2xl border border-border"
                    />

                    <Text className="font-tbold text-xl text-primary">
                      {bookingData?.consultant}
                    </Text>
                  </VStack>

                  <VStack center gap={12}>
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
              </VStack>

              <Section label="Điểm nổi bật" margin={false} />

              <HStack
                gap={8}
                className="flex-row flex-wrap justify-center gap-y-3"
              >
                {quickReviewsData.map((review) => (
                  <Chip
                    key={review}
                    label={review}
                    selected={selectedReviews.includes(review)}
                    onPress={() => handleSelectQuick(review)}
                  />
                ))}
              </HStack>

              <Section label="Chi tiết phản hồi" />

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
                    errorMessage={errors.comment?.message}
                    onFocus={scrollToInput}
                  />
                )}
              />
            </VStack>
          </ScrollView>

          <Button
            size="lg"
            onPress={handleSubmit(onSubmit)}
            className="absolute bottom-4 w-full"
          >
            Phản hồi
          </Button>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}

export default ReviewCreateScreen

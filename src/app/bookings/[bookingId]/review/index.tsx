import React, { useEffect, useRef, useState } from "react"

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { Fontisto } from "@expo/vector-icons"
import { zodResolver } from "@hookform/resolvers/zod"
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

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import { useGetBookingById } from "@/hooks/useBooking"
import { useCreateReview } from "@/hooks/useReview"

import { CreateReviewType, createReviewSchema } from "@/schemas/reviewSchema"

import { getInitials } from "@/utils/helpers"

const quickReviewsData = [
  "Chuyên nghiệp",
  "Nhiệt tình",
  "Đúng giờ",
  "Thân thiện",
  "Hữu ích",
  "Giải pháp thực tế",
  "Phản hồi nhanh"
]

function BookingReviewScreen() {
  const router = useRouter()
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>()

  const { user } = useAuth()
  const userId = user?.userId

  const scrollViewRef = useRef<ScrollView>(null)

  const { mutate: createReview } = useCreateReview()

  const { data: bookingData, isLoading } = useGetBookingById(bookingId)

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
    reset,
    formState: { errors }
  } = useForm<CreateReviewType>({
    resolver: zodResolver(createReviewSchema)
  })

  useEffect(() => {
    if (bookingId && bookingData && userId) {
      reset({
        bookingId: bookingId,
        consultantId: bookingData.consultantId,
        userId: userId,
        rating: 0,
        comment: ""
      })
    }
  }, [bookingId, bookingData, userId, reset])

  const onSubmit = async (reviewData: CreateReviewType) => {
    Keyboard.dismiss()

    const comment =
      selectedReviews.length > 0
        ? `${selectedReviews.join(" - ")}. ${reviewData.comment}`
        : reviewData.comment

    const finalData = reviewData.comment
      ? { ...reviewData, comment: comment }
      : { ...reviewData }

    // console.log("Final Data:", JSON.stringify(finalData, null, 2))

    await createReview(finalData, {
      onSuccess: () => {
        router.back()
      }
    })
  }

  // console.log(errors)

  const scrollToInput = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 50)
  }

  if (!bookingData || isLoading) {
    return <LoadingScreen />
  }

  return (
    <Container>
      <Header back label="Đánh giá" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 20}
      >
        <Content className="mt-2">
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 60 }}
          >
            <VStack gap={32}>
              <VStack>
                <VStack center gap={20}>
                  <VStack center gap={12}>
                    <VStack center gap={8}>
                      {bookingData.consultant.avatarUrl ? (
                        <Image
                          source={{ uri: bookingData.consultant.avatarUrl }}
                          className="h-32 w-32 rounded-2xl border border-border"
                        />
                      ) : (
                        <View className="flex h-32 w-32 items-center justify-center rounded-xl border border-muted bg-border">
                          <Text className="font-tbold text-lg text-primary">
                            {getInitials(bookingData.consultant.fullName)}
                          </Text>
                        </View>
                      )}

                      <Text className="font-tbold text-xl text-primary">
                        {bookingData?.consultant.fullName}
                      </Text>
                    </VStack>

                    <VStack center gap={12}>
                      <HStack gap={8}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <TouchableOpacity
                            key={star}
                            activeOpacity={0.8}
                            onPress={() => handleRating(star)}
                          >
                            <Fontisto
                              name="star"
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
                        <ErrorText error={errors.rating.message} />
                      )}
                    </VStack>
                  </VStack>

                  <Text className="text-tregular text-center text-base text-secondary">
                    Hãy giúp chúng tôi cải thiện bằng cách cho chúng tôi biết
                    cuộc hẹn của bạn với chuyên gia tư vấn diễn ra như thế nào
                  </Text>
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

                <Section label="Chi tiết đánh giá" />

                <Controller
                  name="comment"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      placeholder="Nhập đánh giá của bạn"
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

              <Button onPress={handleSubmit(onSubmit)} className="w-full">
                Đánh giá
              </Button>
            </VStack>
          </ScrollView>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}

export default BookingReviewScreen

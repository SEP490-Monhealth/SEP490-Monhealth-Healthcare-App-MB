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
  HStack,
  Input,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { sampleBookingsData } from "@/constants/bookings"

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
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)

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

  const handleKeyboardDidShow = useCallback(() => {
    setIsKeyboardVisible(true)
  }, [])

  const handleKeyboardDidHide = useCallback(() => {
    setIsKeyboardVisible(false)
  }, [])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardDidShow
    )
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardDidHide
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [handleKeyboardDidShow, handleKeyboardDidHide])

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
    const finalData = {
      ...reviewData,
      comment: `${reviewData.comment}. ${selectedReviews.join(", ")}`
    }
    console.log("Final Data:", JSON.stringify(finalData, null, 2))
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Container>
        <Header back label="Phản hồi" />

        <Content className="mt-2">
          <ScrollArea>
            <VStack gap={10} className="pb-40">
              <Text className="text-justify font-tregular text-base text-secondary">
                Những đánh giá và phản hồi của bạn sẽ góp phần cải thiện chất
                lượng dịch vụ của tư vấn viên, giúp mang lại trải nghiệm tốt
                hơn.
              </Text>
              <VStack center gap={10}>
                <Image
                  source={{ uri: bookingData?.consultantAvatar }}
                  className="rounded-2xl border border-border"
                  style={{ height: 150, width: 150 }}
                />
                <VStack center>
                  <Text className="font-tbold text-2xl text-primary">
                    {bookingData?.consultant}
                  </Text>

                  <HStack gap={10}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity
                        key={star}
                        onPress={() => handleRating(star)}
                      >
                        <Star
                          size={30}
                          fill={star <= ratingNumber ? "#eab308" : "#e2e8f0"}
                          color={star <= ratingNumber ? "#eab308" : "#e2e8f0"}
                        />
                      </TouchableOpacity>
                    ))}
                  </HStack>
                  <Text className="font-tregular text-destructive">
                    {errors.rating?.message}
                  </Text>
                </VStack>
              </VStack>

              <VStack>
                <Section label="Đánh giá của bạn" margin={false} />
                <VStack gap={20}>
                  <View className="flex-row flex-wrap gap-2">
                    {quickReviewsData.map((review) => (
                      <Chip
                        key={review}
                        label={review}
                        border
                        borderWidth={1}
                        size="sm"
                        selected={selectedReviews.includes(review)}
                        onPress={() => handleSelectQuick(review)}
                      />
                    ))}
                  </View>

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
                        keyboardType="default"
                        errorMessage={errors.comment?.message}
                        className="mb-20"
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                      />
                    )}
                  />
                </VStack>
              </VStack>
            </VStack>
          </ScrollArea>
        </Content>
        {!isKeyboardVisible && !isInputFocused && (
          <Button size="lg" onPress={handleSubmit(onSubmit)} className="mb-4">
            Đánh giá
          </Button>
        )}
      </Container>
    </KeyboardAvoidingView>
  )
}

export default ReviewCreateScreen

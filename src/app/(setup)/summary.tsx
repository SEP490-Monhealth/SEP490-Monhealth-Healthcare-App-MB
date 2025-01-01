import React, { useState } from "react"

import { Animated, Image, Text, TextInput, View } from "react-native"

import { Button, Calories, Container, VStack } from "@/components/global/atoms"

import { useAnimation } from "@/hooks/useAnimation"

function SetupSummary() {
  const { fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim } =
    useAnimation()

  const [caloriesInput, setCaloriesInput] = useState(2200)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleFinished = () => {
    console.log(caloriesInput)
  }

  return (
    <Container>
      <View className="flex-1 justify-center">
        <VStack gap={40} center className="pb-36">
          <Animated.Image
            source={require("../../../public/images/monhealth-fire-image.png")}
            style={{
              width: 240,
              height: 240,
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }}
          />

          <VStack center>
            {isEditing ? (
              <View className="pb-16">
                <TextInput
                  className="h-16 w-48 border-b border-border text-center font-tbold text-5xl text-primary"
                  keyboardType="numeric"
                  maxLength={4}
                  value={String(caloriesInput)}
                  onChangeText={(text) => setCaloriesInput(Number(text) || 0)}
                />
              </View>
            ) : (
              <>
                <Calories caloriesInput={caloriesInput} />

                <View className="flex-row items-end">
                  <Text className="font-tbold text-6xl text-primary">
                    {caloriesInput}
                  </Text>
                  <Text className="pb-3 font-tmedium text-base text-accent">
                    kcal
                  </Text>
                </View>

                <Button
                  variant="secondary"
                  size="lg"
                  onPress={() => setIsEditing(true)}
                >
                  Chỉnh sửa
                </Button>
              </>
            )}
          </VStack>
        </VStack>
      </View>

      <Button
        size="lg"
        className="mb-4"
        onPress={isEditing ? handleSave : handleFinished}
      >
        {isEditing ? "Cập nhật" : "Tiếp tục"}
      </Button>
    </Container>
  )
}

export default SetupSummary

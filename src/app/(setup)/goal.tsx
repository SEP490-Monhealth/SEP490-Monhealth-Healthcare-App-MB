import React, { useState } from "react"

import { Image, TextInput, View } from "react-native"

import { Button, Calories, Container, VStack } from "@/components/global/atoms"

function GoalScreen() {
  const [caloriesInput, setCaloriesInput] = useState(2200)

  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleFinished = () => {
    console.log(caloriesInput)
  }
  return (
    <Container className="flex-1">
      <View className="flex-1 justify-center pb-10">
        <VStack gap={40} center className="pb-36">
          <Image
            source={require("../../../public/images/monhealth-fire-image.png")}
            className="object-cover"
            style={{ width: 260, height: 260 }}
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
                <Button
                  variant="secondary"
                  size="lg"
                  onPress={() => setIsEditing(true)}
                  className="w-36"
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
        className="absolute bottom-4 left-6 right-6 w-full"
        onPress={isEditing ? handleSave : handleFinished}
      >
        {isEditing ? "Cập nhật" : "Tiếp tục"}
      </Button>
    </Container>
  )
}

export default GoalScreen

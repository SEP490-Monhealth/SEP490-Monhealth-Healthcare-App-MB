import React from "react"

import { Animated, Text, View } from "react-native"

import { Button, Container, Content, VStack } from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useSaveFoods } from "@/contexts/SaveContext"

import { useAnimation } from "@/hooks/useAnimation"

import { SavedFoods } from "./SavedFoods"

function SaveFoodScreen() {
  const { fadeAnim, scaleAnim, textFadeAnim, textTranslateAnim } =
    useAnimation()

  const { saveFoods, clearSaved } = useSaveFoods()

  const handleClearSaved = () => {
    clearSaved()
  }

  return (
    <Container className="flex-1">
      <Header back label="Danh sách đã lưu" />
      <Content className="flex-1 items-center justify-center">
        {saveFoods.length > 0 ? (
          <SavedFoods foodsData={saveFoods} />
        ) : (
          <>
            <VStack center gap={20}>
              <View>
                <Animated.Image
                  source={require("../../../public/images/no-data-image.png")}
                  style={{
                    width: 320,
                    height: 320,
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }]
                  }}
                />
              </View>

              <VStack>
                <Animated.Text
                  style={{
                    opacity: textFadeAnim,
                    transform: [{ translateY: textTranslateAnim }]
                  }}
                  className="text-center font-tbold text-3xl text-primary"
                >
                  Không có dữ liệu
                </Animated.Text>

                <Animated.Text
                  style={{
                    opacity: textFadeAnim,
                    transform: [{ translateY: textTranslateAnim }]
                  }}
                  className="text-center font-tmedium text-lg text-secondary"
                >
                  Bạn chưa lưu món ăn nào trong danh sách
                </Animated.Text>
              </VStack>
            </VStack>
          </>
        )}
      </Content>

      {saveFoods.length > 0 && (
        <Button
          size="lg"
          variant="danger"
          onPress={handleClearSaved}
          className="absolute bottom-4 left-6 right-6 w-full"
        >
          Xóa tất cả
        </Button>
      )}
    </Container>
  )
}

export default SaveFoodScreen

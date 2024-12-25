import React, { useEffect, useRef, useState } from "react"

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native"
import { ScrollView } from "react-native"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Card,
  Content,
  HStack,
  Input,
  Select,
  Sheet,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"
import ShowMoreSection from "@/components/global/atoms/ShowMore"
import { Header } from "@/components/global/organisms"

import {
  CreateFoodStep2Type,
  createFoodStep2Schema
} from "@/schemas/foodSchema"

function NutritionFood() {
  const SheetRef = useRef<SheetRefProps>(null)

  const [selectedUnit, setSelectedUnit] = useState("g")
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  const onUnitSelect = (unit: string) => {
    setSelectedUnit(unit)
    setValue("portion.unit", unit)
    closeSheet()
  }

  const openSheet = () => {
    SheetRef.current?.scrollTo(-250)
  }

  const closeSheet = () => {
    SheetRef.current?.scrollTo(0)
  }

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      () => setIsKeyboardVisible(true)
    )
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => setIsKeyboardVisible(false)
    )

    return () => {
      keyboardWillShowListener.remove()
      keyboardWillHideListener.remove()
    }
  }, [])

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateFoodStep2Type>({
    resolver: zodResolver(createFoodStep2Schema),
    defaultValues: {
      portion: {
        size: "",
        weight: 100,
        unit: "g"
      },
      nutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fiber: 0,
        sugar: 0,
        fat: 0,
        saturatedFat: 0,
        unsaturatedFat: 0,
        cholesterol: 0,
        sodium: 0,
        potassium: 0,
        calcium: 0,
        iron: 0,
        vitaminA: 0,
        vitaminB1: 0,
        vitaminB2: 0,
        vitaminC: 0,
        vitaminD: 0,
        vitaminE: 0
      }
    }
  })

  const onSubmit = (data: CreateFoodStep2Type) => {
    console.log(data)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView className="h-full bg-background">
          <ScrollView showsVerticalScrollIndicator={false} className="px-6">
            <Header back label="Thêm khẩu phần" />
            <Content>
              <VStack gap={20} className="mt-2">
                <Text className="font-tmedium text-xl text-primary">
                  Khẩu phần ăn
                </Text>
                <VStack gap={8}>
                  <Controller
                    name="portion.size"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value}
                        onChangeText={onChange}
                        placeholder="Nhập khẩu phần ăn"
                        keyboardType="default"
                        errorMessage={errors.portion?.size?.message}
                      />
                    )}
                  />

                  <HStack center gap={8}>
                    <View style={{ flex: 1 }}>
                      <Controller
                        name="portion.weight"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            value={value.toString()}
                            onChangeText={(text) =>
                              onChange(parseFloat(text) || 0)
                            }
                            placeholder="1"
                            keyboardType="numeric"
                            clearText={false}
                            errorMessage={errors.portion?.weight?.message}
                          />
                        )}
                      />
                    </View>

                    <View style={{ flex: 3 }}>
                      <Select
                        defaultValue="Chọn khẩu phần ăn"
                        value={selectedUnit}
                        onPress={openSheet}
                      />
                    </View>
                  </HStack>
                </VStack>
                <Text className="font-tmedium text-xl text-primary">
                  Thông tin dinh dưỡng
                </Text>
                <VStack gap={8}>
                  <Controller
                    name="nutrition.calories"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value.toString()}
                        onChangeText={(text) => onChange(parseFloat(text) || 0)}
                        placeholder="0"
                        keyboardType="numeric"
                        iconStart={<Text>Năng lượng(Calories)</Text>}
                        iconEnd={<Text>(kcal)</Text>}
                        textRight
                        clearText={false}
                        errorMessage={errors.nutrition?.calories?.message}
                      />
                    )}
                  />

                  <Controller
                    name="nutrition.protein"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value.toString()}
                        onChangeText={(text) => onChange(parseFloat(text) || 0)}
                        placeholder="0"
                        keyboardType="numeric"
                        iconStart={<Text>Chất đạm (Protein)</Text>}
                        iconEnd={<Text>(g)</Text>}
                        textRight
                        clearText={false}
                        errorMessage={errors.nutrition?.protein?.message}
                      />
                    )}
                  />

                  <Controller
                    name="nutrition.carbs"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value.toString()}
                        onChangeText={(text) => onChange(parseFloat(text) || 0)}
                        placeholder="0"
                        keyboardType="numeric"
                        iconStart={<Text>Tinh bột (Carbs)</Text>}
                        iconEnd={<Text>(g)</Text>}
                        textRight
                        clearText={false}
                        errorMessage={errors.nutrition?.carbs?.message}
                      />
                    )}
                  />

                  <Controller
                    name="nutrition.fiber"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value.toString()}
                        onChangeText={(text) => onChange(parseFloat(text) || 0)}
                        placeholder="0"
                        keyboardType="numeric"
                        iconStart={<Text>Chất xơ</Text>}
                        iconEnd={<Text>(g)</Text>}
                        textRight
                        clearText={false}
                        errorMessage={errors.nutrition?.fiber?.message}
                      />
                    )}
                  />

                  <Controller
                    name="nutrition.sugar"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value.toString()}
                        onChangeText={(text) => onChange(parseFloat(text) || 0)}
                        placeholder="0"
                        keyboardType="numeric"
                        iconStart={<Text>Đường</Text>}
                        iconEnd={<Text>(g)</Text>}
                        textRight
                        clearText={false}
                        errorMessage={errors.nutrition?.fiber?.message}
                      />
                    )}
                  />

                  <Controller
                    name="nutrition.fat"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value.toString()}
                        onChangeText={(text) => onChange(parseFloat(text) || 0)}
                        placeholder="0"
                        keyboardType="numeric"
                        iconStart={<Text>Chất béo (Fat)</Text>}
                        iconEnd={<Text>(g)</Text>}
                        textRight
                        clearText={false}
                        errorMessage={errors.nutrition?.fat?.message}
                      />
                    )}
                  />
                  <ShowMoreSection
                    titleMore="Dinh dưỡng bổ sung"
                    titleHidden="Ẩn bớt"
                  >
                    <VStack gap={8}>
                      <Controller
                        name="nutrition.saturatedFat"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            value={value?.toString() || ""}
                            onChangeText={(text) =>
                              onChange(parseFloat(text) || 0)
                            }
                            placeholder="0"
                            keyboardType="numeric"
                            iconStart={<Text>Chất béo bão hòa</Text>}
                            iconEnd={<Text>(g)</Text>}
                            textRight
                            clearText={false}
                            errorMessage={
                              errors.nutrition?.saturatedFat?.message
                            }
                          />
                        )}
                      />

                      <Controller
                        name="nutrition.unsaturatedFat"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            value={value?.toString() || ""}
                            onChangeText={(text) =>
                              onChange(parseFloat(text) || 0)
                            }
                            placeholder="0"
                            keyboardType="numeric"
                            iconStart={<Text>Chất béo không bão hòa</Text>}
                            iconEnd={<Text>(g)</Text>}
                            textRight
                            clearText={false}
                            errorMessage={
                              errors.nutrition?.unsaturatedFat?.message
                            }
                          />
                        )}
                      />

                      <Controller
                        name="nutrition.cholesterol"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            value={value?.toString() || ""}
                            onChangeText={(text) =>
                              onChange(parseFloat(text) || 0)
                            }
                            placeholder="0"
                            keyboardType="numeric"
                            iconStart={<Text>Mỡ máu</Text>}
                            iconEnd={<Text>(g)</Text>}
                            textRight
                            clearText={false}
                            errorMessage={
                              errors.nutrition?.unsaturatedFat?.message
                            }
                          />
                        )}
                      />

                      <Controller
                        name="nutrition.sodium"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            value={value?.toString() || ""}
                            onChangeText={(text) =>
                              onChange(parseFloat(text) || 0)
                            }
                            placeholder="0"
                            keyboardType="numeric"
                            iconStart={<Text>Natri</Text>}
                            iconEnd={<Text>(g)</Text>}
                            textRight
                            clearText={false}
                            errorMessage={errors.nutrition?.sodium?.message}
                          />
                        )}
                      />

                      <Controller
                        name="nutrition.calcium"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            value={value?.toString() || ""}
                            onChangeText={(text) =>
                              onChange(parseFloat(text) || 0)
                            }
                            placeholder="0"
                            keyboardType="numeric"
                            iconStart={<Text>Canxi</Text>}
                            iconEnd={<Text>(g)</Text>}
                            textRight
                            clearText={false}
                            errorMessage={errors.nutrition?.calcium?.message}
                          />
                        )}
                      />

                      <Controller
                        name="nutrition.iron"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            value={value?.toString() || ""}
                            onChangeText={(text) =>
                              onChange(parseFloat(text) || 0)
                            }
                            placeholder="0"
                            keyboardType="numeric"
                            iconStart={<Text>Sắt</Text>}
                            iconEnd={<Text>(g)</Text>}
                            textRight
                            clearText={false}
                            errorMessage={errors.nutrition?.iron?.message}
                          />
                        )}
                      />

                      <Controller
                        name="nutrition.vitaminA"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            value={value?.toString() || ""}
                            onChangeText={(text) =>
                              onChange(parseFloat(text) || 0)
                            }
                            placeholder="0"
                            keyboardType="numeric"
                            iconStart={<Text>Vitamin A</Text>}
                            iconEnd={<Text>(g)</Text>}
                            textRight
                            clearText={false}
                            errorMessage={errors.nutrition?.vitaminA?.message}
                          />
                        )}
                      />

                      <Controller
                        name="nutrition.vitaminB1"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            value={value?.toString() || ""}
                            onChangeText={(text) =>
                              onChange(parseFloat(text) || 0)
                            }
                            placeholder="0"
                            keyboardType="numeric"
                            iconStart={<Text>Vitamin B1</Text>}
                            iconEnd={<Text>(g)</Text>}
                            textRight
                            clearText={false}
                            errorMessage={errors.nutrition?.vitaminB1?.message}
                          />
                        )}
                      />

                      <Controller
                        name="nutrition.vitaminB2"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            value={value?.toString() || ""}
                            onChangeText={(text) =>
                              onChange(parseFloat(text) || 0)
                            }
                            placeholder="0"
                            keyboardType="numeric"
                            iconStart={<Text>Vitamin B2</Text>}
                            iconEnd={<Text>(g)</Text>}
                            textRight
                            clearText={false}
                            errorMessage={errors.nutrition?.vitaminB2?.message}
                          />
                        )}
                      />

                      <Controller
                        name="nutrition.vitaminC"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            value={value?.toString() || ""}
                            onChangeText={(text) =>
                              onChange(parseFloat(text) || 0)
                            }
                            placeholder="0"
                            keyboardType="numeric"
                            iconStart={<Text>Vitamin C</Text>}
                            iconEnd={<Text>(g)</Text>}
                            textRight
                            clearText={false}
                            errorMessage={errors.nutrition?.vitaminC?.message}
                          />
                        )}
                      />

                      <Controller
                        name="nutrition.vitaminD"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            value={value?.toString() || ""}
                            onChangeText={(text) =>
                              onChange(parseFloat(text) || 0)
                            }
                            placeholder="0"
                            keyboardType="numeric"
                            iconStart={<Text>Vitamin D</Text>}
                            iconEnd={<Text>(g)</Text>}
                            textRight
                            clearText={false}
                            errorMessage={errors.nutrition?.vitaminD?.message}
                          />
                        )}
                      />

                      <Controller
                        name="nutrition.vitaminE"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            value={value?.toString() || ""}
                            onChangeText={(text) =>
                              onChange(parseFloat(text) || 0)
                            }
                            placeholder="0"
                            keyboardType="numeric"
                            iconStart={<Text>Vitamin E</Text>}
                            iconEnd={<Text>(g)</Text>}
                            textRight
                            clearText={false}
                            errorMessage={errors.nutrition?.vitaminE?.message}
                          />
                        )}
                      />
                    </VStack>
                  </ShowMoreSection>
                </VStack>
              </VStack>
            </Content>
          </ScrollView>
          {!isKeyboardVisible && (
            <Button
              size="lg"
              onPress={handleSubmit(onSubmit)}
              className="absolute bottom-10 left-4 right-4"
            >
              Thêm mới
            </Button>
          )}
          <Sheet ref={SheetRef}>
            <VStack gap={10}>
              <TouchableOpacity onPress={() => onUnitSelect("g")}>
                <Text
                  className={`rounded-xl border border-border px-4 py-6 font-tmedium text-base ${selectedUnit === "g" ? "bg-primary text-white" : "bg-muted text-primary"}`}
                >
                  g (Gram)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onUnitSelect("ml")}>
                <Text
                  className={`rounded-xl border border-border px-4 py-6 font-tmedium text-base ${selectedUnit === "ml" ? "bg-primary text-white" : "bg-muted text-primary"}`}
                >
                  ml (Milliliter)
                </Text>
              </TouchableOpacity>
            </VStack>
          </Sheet>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default NutritionFood

import React, { useRef, useState } from "react"

import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { zodResolver } from "@hookform/resolvers/zod"
import { Home2, Link } from "iconsax-react-native"
import { Controller, useForm, useWatch } from "react-hook-form"

import {
  Button,
  Container,
  HStack,
  Input,
  ScrollArea,
  Select,
  Sheet,
  SheetItem,
  SheetRefProps,
  Toggle,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { PricingTypeEnum, TypeEnum } from "@/constants/enums"

import {
  CreateUpdateServiceType,
  createUpdateServiceSchema
} from "@/schemas/serviceSchema"

import { ChipService } from "./ServiceChip"

function CreateServiceScreen() {
  const PricingTypeSheetRef = useRef<SheetRefProps>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPricingType, setSelectedPricingType] =
    useState<PricingTypeEnum | null>(PricingTypeEnum.Hour)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateUpdateServiceType>({
    resolver: zodResolver(createUpdateServiceSchema),
    defaultValues: {
      name: "",
      type: TypeEnum.Online,
      description: "",
      price: 0,
      pricingType: PricingTypeEnum.Hour,
      duration: 0,
      onlineLink: "",
      address: "",
      visitHome: false,
      maxDistance: 0
    }
  })

  const openPricingTypeSheet = () => PricingTypeSheetRef.current?.scrollTo(-180)
  const closePricingTypeSheet = () => PricingTypeSheetRef.current?.scrollTo(0)

  const handleSelectPricingType = (pricingType: PricingTypeEnum) => {
    setSelectedPricingType(pricingType)
    setValue("pricingType", pricingType)
  }

  const formattedPricingTypeData = [
    { value: PricingTypeEnum.Hour, label: "Giờ" },
    { value: PricingTypeEnum.Session, label: "Buổi" }
  ]

  const type = useWatch({ control, name: "type" })

  const onSubmit = async (serviceData: CreateUpdateServiceType) => {
    setIsLoading(true)
    console.log(serviceData)
    setIsLoading(false)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header back label="Tạo dịch vụ mới" />
          <ScrollArea>
            <VStack className="mt-2">
              <VStack gap={12} className="pb-40">
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      placeholder="Nhập tên dịch vụ"
                      onChangeText={onChange}
                      keyboardType="default"
                      canClearText
                      errorMessage={errors.name?.message}
                    />
                  )}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      placeholder="Mô tả chi tiết về dịch vụ mà bạn cung cấp"
                      onChangeText={onChange}
                      keyboardType="default"
                      numberOfLines={5}
                      isMultiline
                      canClearText
                      errorMessage={errors.description?.message}
                    />
                  )}
                />

                <HStack center gap={8}>
                  <View style={{ flex: 2 }}>
                    <Controller
                      name="price"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          value={value ? value.toString() : ""}
                          placeholder="Nhập giá dịch vụ"
                          onChangeText={(text) => {
                            const numericValue = text ? parseFloat(text) : 0
                            onChange(numericValue)
                          }}
                          keyboardType="numeric"
                          endIcon={
                            <Text className="font-tregular text-sm text-accent">
                              VND
                            </Text>
                          }
                          canClearText
                          errorMessage={errors.price?.message}
                        />
                      )}
                    />
                  </View>

                  <View style={{ flex: 1.5 }}>
                    <Select
                      value={
                        selectedPricingType !== null
                          ? formattedPricingTypeData.find(
                              (item) => item.value === selectedPricingType
                            )?.label
                          : "Chọn loại"
                      }
                      onPress={openPricingTypeSheet}
                    />
                  </View>
                </HStack>

                <Controller
                  name="duration"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value ? value.toString() : ""}
                      placeholder="Nhập thời gian dịch vụ"
                      onChangeText={(text) => {
                        const numericValue = text ? parseFloat(text) : 0
                        onChange(numericValue)
                      }}
                      keyboardType="numeric"
                      endIcon={
                        <Text className="font-tregular text-sm text-accent">
                          phút
                        </Text>
                      }
                      canClearText
                      errorMessage={errors.duration?.message}
                    />
                  )}
                />

                <VStack gap={4}>
                  <Text className="font-tregular text-lg text-secondary">
                    Chọn loại dịch vụ
                  </Text>
                  <HStack>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <View className="flex-1 flex-row gap-6">
                          <ChipService
                            label="Online"
                            icon={<Link size={20} />}
                            isSelected={value === TypeEnum.Online}
                            onPress={() => onChange(TypeEnum.Online)}
                          />
                          <ChipService
                            label="Offline"
                            icon={<Home2 size={20} />}
                            isSelected={value === TypeEnum.Offline}
                            onPress={() => onChange(TypeEnum.Offline)}
                          />
                        </View>
                      )}
                    />
                  </HStack>
                </VStack>

                {type === TypeEnum.Online && (
                  <Controller
                    name="onlineLink"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value}
                        placeholder="Nhập link Google Meet"
                        onChangeText={onChange}
                        keyboardType="default"
                        canClearText
                        errorMessage={errors.onlineLink?.message}
                      />
                    )}
                  />
                )}

                {type === TypeEnum.Offline && (
                  <VStack gap={12}>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          value={value}
                          placeholder="Nhập địa chỉ"
                          onChangeText={onChange}
                          keyboardType="default"
                          canClearText
                          errorMessage={errors.address?.message}
                        />
                      )}
                    />

                    <Controller
                      name="maxDistance"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          value={value ? value.toString() : ""}
                          placeholder="Khoảng cách hỗ trợ dịch vụ tối đa"
                          onChangeText={(text) => {
                            const numericValue = text ? parseFloat(text) : 0
                            onChange(numericValue)
                          }}
                          keyboardType="numeric"
                          endIcon={
                            <Text className="font-tregular text-sm text-accent">
                              km
                            </Text>
                          }
                          canClearText
                          errorMessage={errors.maxDistance?.message}
                        />
                      )}
                    />

                    <HStack center className="px-1">
                      <Text className="flex-1 font-tregular text-lg text-secondary">
                        Hỗ trợ tận nhà
                      </Text>

                      <Controller
                        name="visitHome"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Toggle value={value} onValueChange={onChange} />
                        )}
                      />
                    </HStack>
                  </VStack>
                )}
              </VStack>
            </VStack>
          </ScrollArea>
          <Button
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
            className="mb-4"
          >
            {!isLoading && "Tạo dịch vụ"}
          </Button>
        </Container>

        <Sheet ref={PricingTypeSheetRef} dynamicHeight={180}>
          {formattedPricingTypeData.map((pricingType) => (
            <SheetItem
              key={pricingType.value}
              item={pricingType.label}
              isSelected={selectedPricingType === pricingType.value}
              onSelect={() => {
                if (selectedPricingType !== pricingType.value) {
                  handleSelectPricingType(pricingType.value)
                }
                closePricingTypeSheet()
              }}
            />
          ))}
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default CreateServiceScreen

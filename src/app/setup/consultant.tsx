import React, { useEffect, useRef, useState } from "react"

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback
} from "react-native"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  Input,
  ScrollArea,
  Select,
  Sheet,
  SheetItem,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"
import { StepHeader } from "@/components/global/molecules"
import { Header } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import {
  CreateCertificateType,
  createCertificateSchema
} from "@/schemas/certificateSchema"

import { useConsultantSetupStore } from "@/stores/consultantSetupStore"

import { formatISODate, formatUTCDate } from "@/utils/formatters"

const expertiseData = [
  { label: "Dinh dưỡng", value: "Nutrition" },
  { label: "Thể chất", value: "Workout" },
  { label: "Giảm cân", value: "WeightLoss" },
  { label: "Tăng cân", value: "WeightGain" }
]

function SetupExpertise() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId

  const ExpertiseSheetRef = useRef<SheetRefProps>(null)
  const DateSheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = 280

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [inputDateType, setInputDateType] = useState<
    "issueDate" | "expiryDate"
  >()

  const { expertise, name, issueDate, expiryDate, images, updateField } =
    useConsultantSetupStore()

  const formData = {
    userId,
    expertise,
    name,
    issueDate,
    expiryDate,
    images: images.map((image) => image.uri)
  }

  const {
    control,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCertificateType>({
    resolver: zodResolver(createCertificateSchema),
    defaultValues: formData
  })

  const expertiseValue = watch("expertise")

  useEffect(() => {
    if (images.length > 0) {
      updateField("images", images)
    }
  }, [])

  const openExpertiseSheet = () =>
    ExpertiseSheetRef.current?.scrollTo(-sheetHeight)
  const openDateSheet = (inputType: "issueDate" | "expiryDate") => {
    setInputDateType(inputType)
    DateSheetRef.current?.scrollTo(-sheetHeight)
  }

  const closeSheet = () => {
    ExpertiseSheetRef.current?.scrollTo(0)
    DateSheetRef.current?.scrollTo(0)
  }

  const handleSelectDate = (_: DateTimePickerEvent, date?: Date) => {
    if (date && inputDateType) {
      const isoDate = formatUTCDate(date)
      setSelectedDate(date)
      setValue(inputDateType, isoDate)
    }
  }

  const handleSelectExpertise = (value: string) => {
    setValue("expertise", value)
    updateField("expertise", value)
    closeSheet()
  }

  const handleCertificateUpload = (expertise: string) => {
    router.push({
      pathname: "/(consultant-setup)/certificate-upload",
      params: { expertise }
    })
  }

  const onSubmit = async (data: CreateCertificateType) => {
    // console.log(JSON.stringify(data, null, 2))

    Object.entries(data).forEach(([key, value]) => {
      if (value) updateField(key, value)
    })

    console.log(
      "Updated store:",
      JSON.stringify(useConsultantSetupStore(), null, 2)
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header back />

          <Content className="mt-4">
            <ScrollArea>
              <StepHeader
                title="Chứng chỉ chuyên môn"
                description="Vui lòng nhập thông tin chứng chỉ chuyên môn của bạn"
              />

              <VStack gap={12}>
                <Controller
                  name="expertise"
                  control={control}
                  render={({ field: { value } }) => {
                    const selectedLabel = expertiseData.find(
                      (item) => item.value === value
                    )?.label

                    return (
                      <Select
                        defaultValue="Chọn chuyên môn"
                        value={selectedLabel}
                        onPress={openExpertiseSheet}
                      />
                    )
                  }}
                />

                <VStack>
                  <Button
                    disabled={!expertiseValue}
                    variant="secondary"
                    onPress={() => {
                      const expertise = getValues("expertise")
                      if (expertise) {
                        handleCertificateUpload(expertise)
                      }
                    }}
                  >
                    Thêm hình ảnh
                  </Button>

                  {images.length > 0 ? (
                    images
                      .filter((image) => image && image.uri)
                      .map((image, index) => (
                        <Text
                          key={index}
                          className="font-tregular text-base text-secondary"
                        >
                          {image.fileName}
                        </Text>
                      ))
                  ) : (
                    <Text className="font-tregular text-gray-500">
                      Không có hình ảnh nào để hiển thị
                    </Text>
                  )}
                </VStack>

                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      placeholder="Nhập tên chứng chỉ"
                      onChangeText={onChange}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />

                <Controller
                  name="issueDate"
                  control={control}
                  render={({ field: { value } }) => (
                    <Input
                      disabled
                      value={value ? formatISODate(value, "dd/MM/yyyy") : ""}
                      placeholder="Nhập ngày cấp"
                      onPress={() => openDateSheet("issueDate")}
                      errorMessage={errors.issueDate?.message}
                    />
                  )}
                />

                <Controller
                  name="expiryDate"
                  control={control}
                  render={({ field: { value } }) => (
                    <Input
                      disabled
                      value={value ? formatISODate(value, "dd/MM/yyyy") : ""}
                      placeholder="Nhập ngày hết hạn"
                      onPress={() => openDateSheet("expiryDate")}
                      errorMessage={errors.expiryDate?.message}
                    />
                  )}
                />
              </VStack>
            </ScrollArea>

            <Button
              size="lg"
              onPress={handleSubmit(onSubmit)}
              className="bottom-4"
            >
              Gửi yêu cầu
            </Button>
          </Content>
        </Container>

        <Sheet ref={ExpertiseSheetRef} dynamicHeight={sheetHeight}>
          {expertiseData.map((expertise) => (
            <SheetItem
              key={expertise.value}
              item={expertise.label}
              isSelected={getValues("expertise") === expertise.value}
              onSelect={() => handleSelectExpertise(expertise.value)}
            />
          ))}
        </Sheet>

        <Sheet ref={DateSheetRef} dynamicHeight={sheetHeight}>
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="spinner"
            minimumDate={
              inputDateType === "expiryDate" &&
              getValues("issueDate") &&
              !isNaN(new Date(getValues("issueDate")).getTime())
                ? new Date(getValues("issueDate"))
                : new Date(1904, 0, 1)
            }
            maximumDate={new Date()}
            onChange={handleSelectDate}
            locale="vi"
          />
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default SetupExpertise

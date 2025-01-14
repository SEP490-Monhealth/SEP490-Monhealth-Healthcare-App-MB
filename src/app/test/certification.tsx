import React, { useRef, useState } from "react"

import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { zodResolver } from "@hookform/resolvers/zod"
import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"
import {
  CalendarAdd,
  CalendarRemove,
  PictureFrame,
  Trello
} from "iconsax-react-native"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Content,
  Input,
  Sheet,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"

import { COLORS } from "@/constants/app"

import {
  CreateCertificateType,
  createCertificateSchema
} from "@/schemas/certificateSchema"

import { convertToISOString, formatDate } from "@/utils/formatters"

function CertificationScreen() {
  const SheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = 300

  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentInputType, setCurrentInputType] = useState<
    "issueDate" | "expiryDate"
  >()

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCertificateType>({
    resolver: zodResolver(createCertificateSchema),
    defaultValues: {
      userId: "ID khải tỏi đẹp trai",
      name: "",
      issueDate: "",
      expiryDate: "",
      images: "https://example.com/image.png"
    }
  })

  const openSheet = (inputType: "issueDate" | "expiryDate") => {
    setCurrentInputType(inputType)
    SheetRef.current?.scrollTo(-sheetHeight)
  }

  const handleDateChange = (_: DateTimePickerEvent, date?: Date) => {
    if (date && currentInputType) {
      setSelectedDate(date)
      setValue(currentInputType, formatDate(date))
    }
  }

  const onSubmit = async (certificationData: CreateCertificateType) => {
    setIsLoading(true)
    const preparedData = {
      ...certificationData,
      issueDate: convertToISOString(certificationData.issueDate),
      expiryDate: convertToISOString(certificationData.expiryDate)
    }

    console.log(preparedData)

    setIsLoading(false)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="h-full flex-1 bg-background">
        <View className="flex-1 px-6">
          <Content className="mt-2">
            <View>
              <Text className="mb-2 font-tbold text-3xl text-primary">
                Chuyên môn và chứng chỉ
              </Text>
              <Text className="font-tregular text-xl text-accent">
                Hãy chọn lĩnh vực chuyên môn của bạn và tải lên chứng chỉ để tôi
                xác minh
              </Text>

              <VStack gap={12} className="mt-8">
                <Controller
                  name="images"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      placeholder="Nhập hình ảnh"
                      onChangeText={onChange}
                      keyboardType="default"
                      startIcon={
                        <PictureFrame
                          variant="Bold"
                          size={20}
                          color={COLORS.primary}
                        />
                      }
                      errorMessage={errors.images?.message}
                    />
                  )}
                />

                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      placeholder="Nhập tên chứng chỉ"
                      onChangeText={onChange}
                      keyboardType="default"
                      startIcon={
                        <Trello
                          variant="Bold"
                          size={20}
                          color={COLORS.primary}
                        />
                      }
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
                      value={value}
                      placeholder="Nhập ngày cấp"
                      startIcon={
                        <CalendarAdd
                          variant="Bold"
                          size={20}
                          color={COLORS.primary}
                        />
                      }
                      onPress={() => openSheet("issueDate")}
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
                      value={value}
                      placeholder="Nhập ngày hết hạn"
                      startIcon={
                        <CalendarRemove
                          variant="Bold"
                          size={20}
                          color={COLORS.primary}
                        />
                      }
                      onPress={() => openSheet("expiryDate")}
                      errorMessage={errors.expiryDate?.message}
                    />
                  )}
                />
              </VStack>

              <Button
                loading={isLoading}
                onPress={handleSubmit(onSubmit)}
                className="mt-8"
              >
                {!isLoading && "Tiếp tục"}
              </Button>

              <Text className="mt-4 text-center font-tregular text-primary">
                *Vui lòng đảm bảo chứng chỉ hợp lệ trước khi tiếp tục
              </Text>
            </View>
          </Content>
        </View>

        <Sheet ref={SheetRef} dynamicHeight={sheetHeight}>
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="spinner"
            minimumDate={new Date(1904, 0, 1)}
            maximumDate={new Date()}
            onChange={handleDateChange}
            locale="vi"
          />
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default CertificationScreen

import React, { useRef, useState } from "react"

import { Text, View } from "react-native"

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
  Container,
  Content,
  Input,
  Sheet,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"
import { StepHeader } from "@/components/global/molecules"

import { COLORS } from "@/constants/app"

import {
  CreateCertificateType,
  createCertificateSchema
} from "@/schemas/certificateSchema"

import { convertToISOString, formatDate } from "@/utils/formatters"

function CertificationScreen() {
  const SheetRef = useRef<SheetRefProps>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentInputType, setCurrentInputType] = useState<
    "issueDate" | "expiryDate"
  >()

  const sheetHeight = 280

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
    <>
      <Container dismissKeyboard>
        <Content className="mt-2 justify-center">
          <VStack gap={64}>
            <View>
              <StepHeader
                title="Chuyên môn và chứng chỉ"
                description="Hãy chọn lĩnh vực chuyên môn của bạn và tải lên chứng chỉ để tôi xác minh"
              />

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
                      value={value}
                      placeholder="Nhập ngày cấp"
                      editable={false}
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
                      value={value}
                      placeholder="Nhập ngày hết hạn"
                      editable={false}
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
          </VStack>
        </Content>
      </Container>

      <Sheet ref={SheetRef}>
        <View className="mb-10 items-center justify-center">
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
        </View>
      </Sheet>
    </>
  )
}

export default CertificationScreen

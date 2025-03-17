import React, { useEffect, useRef, useState } from "react"

import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { LoadingScreen } from "@/app/loading"
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
  Sheet,
  SheetRefProps,
  SheetSelect,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { DATA } from "@/constants/data"
import { GenderEnum } from "@/constants/enum/Gender"

import { useAuth } from "@/contexts/AuthContext"

import { useGetMetricsByUserId, useUpdateMetric } from "@/hooks/useMetric"

import { UpdateMetricType, updateMetricSchema } from "@/schemas/metricSchema"

import { formatISODate, formatUTCDate } from "@/utils/formatters"

function MetricUserScreen() {
  const { user } = useAuth()
  const userId = user?.userId

  const { data: metricData, isLoading: isMetricLoading } =
    useGetMetricsByUserId(userId)

  const { mutate: updateMetric } = useUpdateMetric()

  const DateSheetRef = useRef<SheetRefProps>(null)
  const GenderSheetRef = useRef<SheetRefProps>(null)
  const ActivitySheetRef = useRef<SheetRefProps>(null)

  if (!metricData || isMetricLoading) return <LoadingScreen />

  useEffect(() => {
    if (metricData[0].dateOfBirth) {
      setSelectedDate(new Date(metricData[0].dateOfBirth))
    }
  }, [metricData])

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const dateSheetHeight = 300
  const genderSheetHeight = 180
  const activitySheetHeight = 350

  const genderEnumToLabel = (genderValue: GenderEnum | undefined) => {
    return (
      DATA.GENDERS.find((gender) => gender.value === genderValue)?.label || ""
    )
  }

  const activityLevelValueToLabel = (value: number | undefined): string => {
    return (
      DATA.ACTIVITY_LEVELS.find((level) => level.value === value)?.label || ""
    )
  }

  const openDobSheet = () => {
    DateSheetRef.current?.scrollTo(-dateSheetHeight)
  }

  const openGenderSheet = () => {
    GenderSheetRef.current?.scrollTo(-genderSheetHeight)
  }

  const openActivitySheet = () => {
    ActivitySheetRef.current?.scrollTo(-activitySheetHeight)
  }

  const handleDateSelect = (_: DateTimePickerEvent, date?: Date) => {
    if (date) {
      const isoDate = formatUTCDate(date)
      setSelectedDate(date)
      setValue("dateOfBirth", isoDate)
    }
  }

  const handleGenderSelect = (genderValue: GenderEnum) => {
    setValue("gender", genderValue)
    GenderSheetRef.current?.scrollTo(0)
  }

  const handleActivitySelect = (activityValue: number) => {
    setValue("activityLevel", activityValue)
    ActivitySheetRef.current?.scrollTo(0)
  }

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UpdateMetricType>({
    resolver: zodResolver(updateMetricSchema),
    defaultValues: {
      dateOfBirth: metricData[0].dateOfBirth,
      gender: metricData[0].gender,
      height: metricData[0].height,
      weight: metricData[0].weight,
      activityLevel: metricData[0].activityLevel
    }
  })

  const onSubmit = async (data: UpdateMetricType) => {
    // updateMetric({
    //   metricId: metricData[0].metricId,
    //   userId: userId!,
    //   updateData: data
    // })
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header back label="Cập nhật thông số" />

          <Content className="mt-2">
            <ScrollArea>
              <VStack gap={12}>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field: { value } }) => (
                    <Input
                      disabled
                      value={value ? formatISODate(value, "dd/MM/yyyy") : ""}
                      label="Ngày sinh"
                      onPress={() => openDobSheet()}
                      canClearText
                      errorMessage={errors.dateOfBirth?.message}
                    />
                  )}
                />

                <Controller
                  name="gender"
                  control={control}
                  render={({ field: { value } }) => (
                    <Input
                      disabled
                      value={genderEnumToLabel(value)}
                      label="Giới tính"
                      onPress={() => openGenderSheet()}
                      canClearText
                      errorMessage={errors.gender?.message}
                    />
                  )}
                />

                <Controller
                  name="height"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value ? value.toString() : ""}
                      label="Chiều cao"
                      onChangeText={(text) => {
                        const numericValue = parseFloat(text)
                        onChange(isNaN(numericValue) ? 0 : numericValue)
                      }}
                      keyboardType="phone-pad"
                      endIcon={
                        <Text className="font-tregular text-sm text-accent">
                          cm
                        </Text>
                      }
                      canClearText
                      errorMessage={errors.height?.message}
                    />
                  )}
                />

                <Controller
                  name="weight"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value ? value.toString() : ""}
                      label="Cân nặng"
                      onChangeText={(text) => {
                        const numericValue = parseFloat(text)
                        onChange(isNaN(numericValue) ? 0 : numericValue)
                      }}
                      keyboardType="phone-pad"
                      endIcon={
                        <Text className="font-tregular text-sm text-accent">
                          kg
                        </Text>
                      }
                      canClearText
                      errorMessage={errors.weight?.message}
                    />
                  )}
                />

                <Controller
                  name="activityLevel"
                  control={control}
                  render={({ field: { value } }) => (
                    <Input
                      disabled
                      value={activityLevelValueToLabel(value)}
                      label="Mức độ hoạt động"
                      onPress={() => openActivitySheet()}
                      canClearText
                      errorMessage={errors.activityLevel?.message}
                    />
                  )}
                />
              </VStack>
            </ScrollArea>
          </Content>

          <Button size="lg" onPress={handleSubmit(onSubmit)} className="mb-4">
            Cập nhật
          </Button>
        </Container>

        <Sheet ref={DateSheetRef} dynamicHeight={dateSheetHeight}>
          <VStack center>
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="spinner"
              maximumDate={new Date()}
              onChange={handleDateSelect}
              locale="vi"
            />
          </VStack>
        </Sheet>

        <Sheet ref={GenderSheetRef} dynamicHeight={genderSheetHeight}>
          {DATA.GENDERS.map((option) => {
            return (
              <SheetSelect
                key={option.value}
                label={option.label}
                onPress={() => handleGenderSelect(option.value)}
              />
            )
          })}
        </Sheet>

        <Sheet ref={ActivitySheetRef} dynamicHeight={activitySheetHeight}>
          {DATA.ACTIVITY_LEVELS.map((option) => {
            return (
              <SheetSelect
                key={option.value}
                label={option.label}
                onPress={() => handleActivitySelect(option.value)}
              />
            )
          })}
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default MetricUserScreen

import React, { useEffect, useRef, useState } from "react"

import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

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
  Select,
  Sheet,
  SheetItem,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { DATA } from "@/constants/data"
import { GoalTypeEnum } from "@/constants/enum/Goal"

import { useGetGoalsByUserId } from "@/hooks/useGoal"
import { useGetMetricsByUserId, useUpdateMetric } from "@/hooks/useMetric"

import {
  CreateUpdateMetricType,
  createUpdateMetricSchema
} from "@/schemas/metricSchema"

import { formatDate, formatUTCDate } from "@/utils/formatters"

const MetricUpdateScreen = () => {
  const router = useRouter()
  const { userId } = useLocalSearchParams<{ userId: string }>()

  const { data: metricsData, isLoading: isMetricsLoading } =
    useGetMetricsByUserId(userId)
  const { data: goalsData, isLoading: isGoalsLoading } =
    useGetGoalsByUserId(userId)

  const { mutate: updateMetric } = useUpdateMetric(userId)

  const DateOfBirthRef = useRef<SheetRefProps>(null)
  const GenderRef = useRef<SheetRefProps>(null)
  const ActivityLevelRef = useRef<SheetRefProps>(null)
  const GoalTypeRef = useRef<SheetRefProps>(null)
  const CaloriesRatioRef = useRef<SheetRefProps>(null)

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<CreateUpdateMetricType>({
    resolver: zodResolver(createUpdateMetricSchema),
    defaultValues: {
      userId: userId,
      dateOfBirth: "",
      gender: 0,
      height: 0,
      weight: 0,
      activityLevel: 0,
      goalType: 0,
      weightGoal: 0,
      caloriesRatio: 10
    }
  })

  useEffect(() => {
    if (metricsData && goalsData) {
      const metricData = metricsData[0]
      const goalData = goalsData[0]

      reset({
        userId: userId,
        dateOfBirth: metricData.dateOfBirth,
        gender: metricData.gender,
        height: metricData.height,
        weight: metricData.weight,
        activityLevel: metricData.activityLevel,
        goalType: goalData.type,
        weightGoal: goalData.weightGoal,
        caloriesRatio: goalData.caloriesRatio
      })

      // cập nhật các state tương ứng nếu muốn
      setDob(metricData.dateOfBirth)
      setGender(metricData.gender)
      setActivityLevel(metricData.activityLevel)
      setGoalType(goalData.type)
      setCaloriesRatio(goalData.caloriesRatio)
    }
  }, [metricsData, goalsData])

  if (!metricsData || isMetricsLoading || !goalsData || isGoalsLoading) {
    return <LoadingScreen />
  }

  const metricData = metricsData[0]
  const goalData = goalsData[0]

  const [selectedDob, setDob] = useState<string | Date>(metricData.dateOfBirth)
  const [selectedGender, setGender] = useState<number>(metricData.gender)
  const [selectedActivityLevel, setActivityLevel] = useState<number>(
    metricData.activityLevel
  )
  const [selectedGoalType, setGoalType] = useState<number>(goalData.type)
  const [selectedCaloriesRatio, setCaloriesRatio] = useState<
    number | undefined
  >(goalData.caloriesRatio)

  const filteredCaloriesRatio =
    selectedGoalType === GoalTypeEnum.WeightLoss
      ? DATA.CALORIES_RATIO.slice(0, 3)
      : selectedGoalType === GoalTypeEnum.Maintenance
        ? DATA.CALORIES_RATIO.slice(3, 4)
        : selectedGoalType === GoalTypeEnum.WeightGain
          ? DATA.CALORIES_RATIO.slice(4, 7)
          : []

  const openSheetDateOfBirth = () => DateOfBirthRef.current?.scrollTo(-320)
  const openSheetGender = () => GenderRef.current?.scrollTo(-180)
  const openSheetActivity = () => ActivityLevelRef.current?.scrollTo(-320)
  const openSheetGoalType = () => GoalTypeRef.current?.scrollTo(-200)
  const openSheetCaloriesRatio = () => {
    if (filteredCaloriesRatio.length === 3) {
      CaloriesRatioRef.current?.scrollTo(-240)
    } else {
      CaloriesRatioRef.current?.scrollTo(-120)
    }
  }

  const closeSheet = () => {
    DateOfBirthRef.current?.scrollTo(0)
    GenderRef.current?.scrollTo(0)
    ActivityLevelRef.current?.scrollTo(0)
    GoalTypeRef.current?.scrollTo(0)
    CaloriesRatioRef.current?.scrollTo(0)
  }

  const onSubmit = async (updatedData: CreateUpdateMetricType) => {
    updateMetric(updatedData, {
      onSuccess: () => router.back()
    })
  }

  const onChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      const formattedDate = formatUTCDate(selectedDate)
      setValue("dateOfBirth", formattedDate)
      setDob(selectedDate)
    }
  }

  const onGenderSelect = (gender: number) => {
    setValue("gender", gender)
    setGender(gender)
    closeSheet()
  }

  const onActivityLevelSelect = (activityLevel: number) => {
    setValue("activityLevel", activityLevel)
    setActivityLevel(activityLevel)
    closeSheet()
  }

  const onGoalTypeSelect = (goalType: number) => {
    setValue("goalType", goalType)
    setGoalType(goalType)
    setCaloriesRatio(undefined)
    setValue("caloriesRatio", 10)
    closeSheet()
  }

  const onCaloriesRatioSelect = (caloriesRatio: number) => {
    setValue("caloriesRatio", caloriesRatio)
    setCaloriesRatio(caloriesRatio)
    closeSheet()
  }

  const dobLabel = formatDate(selectedDob)
  const genderLabel =
    DATA.GENDERS.find((gender) => gender.value === selectedGender)?.label || ""
  const activityLevelLabel =
    DATA.ACTIVITY_LEVELS.find((level) => level.value === selectedActivityLevel)
      ?.label || ""
  const goalTypeLabel =
    DATA.GOALS.find((goalType) => goalType.value === selectedGoalType)?.label ||
    ""
  const caloriesRatioLabel =
    DATA.CALORIES_RATIO.find((item) => item.value === selectedCaloriesRatio)
      ?.label || ""

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="h-full flex-1 bg-background">
        <Container>
          <Header back label="Cập nhật sức khỏe" />
          <Content className="mt-2">
            <ScrollArea>
              <VStack gap={12} className="pb-20">
                <Select
                  label="Ngày sinh"
                  defaultValue="Chọn ngày sinh"
                  value={dobLabel}
                  onPress={openSheetDateOfBirth}
                  errorMessage={errors.dateOfBirth?.message}
                />
                <Select
                  label="Giới tính"
                  defaultValue="Chọn giới tính"
                  value={genderLabel}
                  onPress={openSheetGender}
                />
                <Controller
                  name="height"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value?.toString() || ""}
                      label="Chiều cao"
                      placeholder="VD: 170"
                      onChangeText={(text) => onChange(parseFloat(text) || 0)}
                      keyboardType="decimal-pad"
                      endIcon={
                        <Text className="font-tregular text-sm text-accent">
                          cm
                        </Text>
                      }
                      canClearText
                      alwaysShowEndIcon
                      errorMessage={errors.height?.message}
                    />
                  )}
                />
                <Controller
                  name="weight"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value?.toString() || ""}
                      label="Cân nặng"
                      placeholder="VD: 60"
                      onChangeText={(text) => onChange(parseFloat(text) || 0)}
                      keyboardType="decimal-pad"
                      endIcon={
                        <Text className="font-tregular text-sm text-accent">
                          kg
                        </Text>
                      }
                      canClearText
                      alwaysShowEndIcon
                      errorMessage={errors.weight?.message}
                    />
                  )}
                />
                <Select
                  label="Mục tiêu"
                  defaultValue="Chọn mục tiêu"
                  value={goalTypeLabel}
                  onPress={openSheetGoalType}
                />
                <Controller
                  name="weightGoal"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      disabled
                      value={value?.toString() || ""}
                      label="Cân nặng mục tiêu"
                      placeholder="VD: 60"
                      onChangeText={(text) => onChange(parseFloat(text) || 0)}
                      keyboardType="decimal-pad"
                      endIcon={
                        <Text className="font-tregular text-sm text-accent">
                          kg
                        </Text>
                      }
                      canClearText
                      alwaysShowEndIcon
                      errorMessage={errors.weightGoal?.message}
                    />
                  )}
                />
                <Select
                  label="Mức độ hoạt động"
                  defaultValue="Chọn mức độ hoạt động"
                  value={activityLevelLabel}
                  onPress={openSheetActivity}
                />
                <VStack>
                  <Select
                    label="Tốc độ tăng cân"
                    defaultValue="Chọn tốc độ"
                    value={caloriesRatioLabel}
                    onPress={openSheetCaloriesRatio}
                  />
                  {errors.caloriesRatio?.message && (
                    <Text className="ml-1 font-tregular text-sm text-destructive">
                      Tốc độ tăng cân không được bỏ trống
                    </Text>
                  )}
                </VStack>
              </VStack>
            </ScrollArea>
          </Content>
          <Button size="lg" onPress={handleSubmit(onSubmit)} className="mb-4">
            Cập nhật
          </Button>
        </Container>

        {/* Sheets */}
        <Sheet ref={GenderRef} dynamicHeight={180}>
          {DATA.GENDERS.map((gender) => (
            <SheetItem
              key={gender.value}
              item={gender.label}
              isSelected={selectedGender === gender.value}
              onSelect={() => onGenderSelect(gender.value)}
            />
          ))}
        </Sheet>
        <Sheet ref={DateOfBirthRef} dynamicHeight={300}>
          <View className="items-center">
            <DateTimePicker
              value={new Date(selectedDob)}
              mode="date"
              display="spinner"
              onChange={onChange}
              minimumDate={new Date(1904, 0, 1)}
              maximumDate={new Date()}
              locale="vi"
            />
          </View>
        </Sheet>
        <Sheet ref={ActivityLevelRef} dynamicHeight={300}>
          {DATA.ACTIVITY_LEVELS.map((activity) => (
            <SheetItem
              key={activity.value}
              item={activity.label}
              isSelected={selectedActivityLevel === activity.value}
              onSelect={() => onActivityLevelSelect(activity.value)}
            />
          ))}
        </Sheet>
        <Sheet ref={GoalTypeRef} dynamicHeight={400}>
          {DATA.GOALS.map((goalType) => (
            <SheetItem
              key={goalType.value}
              item={goalType.label}
              isSelected={selectedGoalType === goalType.value}
              onSelect={() => onGoalTypeSelect(goalType.value)}
            />
          ))}
        </Sheet>
        <Sheet ref={CaloriesRatioRef} dynamicHeight={400}>
          {filteredCaloriesRatio.map((caloriesRatio) => (
            <SheetItem
              key={caloriesRatio.value}
              item={caloriesRatio.label}
              isSelected={selectedCaloriesRatio === caloriesRatio.value}
              onSelect={() => onCaloriesRatioSelect(caloriesRatio.value)}
            />
          ))}
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default MetricUpdateScreen

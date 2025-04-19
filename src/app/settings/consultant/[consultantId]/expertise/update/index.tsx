import React, { useEffect, useRef, useState } from "react"

import {
  ActivityIndicator,
  Image,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { zodResolver } from "@hookform/resolvers/zod"
import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"
import { GalleryAdd } from "iconsax-react-native"
import { X } from "lucide-react-native"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Card,
  Container,
  Content,
  ErrorText,
  Input,
  ScrollArea,
  Select,
  Sheet,
  SheetItem,
  SheetRefProps,
  SheetSelect,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"
import { DATA } from "@/constants/data"

import { useGetCertificatesByConsultantId } from "@/hooks/useCertificate"
import { useGetAllExpertise, useUpdateExpertise } from "@/hooks/useExpertise"

import {
  ExpertiseUpdateType,
  expertiseUpdateSchema
} from "@/schemas/expertiseSchema"

import { useCertificateStore } from "@/stores/certificateStore"

import { handleDeleteImageAndUpdateStore } from "@/utils/certificate"
import { handleSelectImage, handleUploadImage } from "@/utils/certificate"
import { formatDate, formatUTCDate } from "@/utils/formatters"

function ExpertiseUpdateScreen() {
  const router = useRouter()

  const { consultantId } = useLocalSearchParams() as {
    consultantId: string
  }

  const { data: expertiseData, isLoading: isExpertiseLoading } =
    useGetAllExpertise(1, 100)

  const { data: certificatesData, isLoading: isCertificatesLoading } =
    useGetCertificatesByConsultantId(consultantId)

  const { mutate: updateExpertise } = useUpdateExpertise()

  const ExpertiseRef = useRef<SheetRefProps>(null)
  const IssueDateRef = useRef<SheetRefProps>(null)
  const ExpiryDateRef = useRef<SheetRefProps>(null)
  const UploadSheetRef = useRef<SheetRefProps>(null)

  const certificateData = certificatesData?.[0]

  const [selectedExpertise, setSelectedExpertise] = useState<
    string | undefined
  >(certificateData?.expertiseName)
  const [selectedIssueDate, setSelectedIssueDate] = useState<
    string | Date | undefined
  >(certificateData?.issueDate)
  const [selectedExpiryDate, setSelectedExpiryDate] = useState<
    string | Date | undefined
  >(certificateData?.expiryDate)
  const [selectedImageUrls] = useState<string[] | undefined>(
    certificateData?.imageUrls
  )

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ExpertiseUpdateType>({
    resolver: zodResolver(expertiseUpdateSchema),
    defaultValues: {
      expertise: certificateData?.expertiseName,
      number: certificateData?.number,
      certificate: certificateData?.name,
      issueDate: certificateData?.issueDate,
      expiryDate: certificateData?.expiryDate,
      issuedBy: certificateData?.issuedBy,
      imageUrls: certificateData?.imageUrls
    }
  })

  const { imageUrls, updateField } = useCertificateStore()

  useEffect(() => {
    if (selectedImageUrls) {
      const formattedImageUrls = selectedImageUrls.map((url) => ({
        uri: url,
        fileName: url.split("/").pop()?.split("?")[0] || "unknown",
        uploading: false,
        progress: 100
      }))

      updateField("imageUrls", formattedImageUrls)
    }
  }, [selectedImageUrls, updateField])

  useEffect(() => {
    const imageUriArray = imageUrls
      .filter((img) => !img.deleting && !img.uploading)
      .map((img) => (typeof img === "string" ? img : img.uri))

    setValue("imageUrls", imageUriArray)
  }, [imageUrls, setValue])

  if (
    !certificatesData ||
    isCertificatesLoading ||
    !expertiseData ||
    isExpertiseLoading
  )
    return <LoadingScreen />

  const openSheetExpertise = () => ExpertiseRef.current?.scrollTo(-540)
  const openSheetIssueDate = () => IssueDateRef.current?.scrollTo(-300)
  const openSheetExpiryDate = () => ExpiryDateRef.current?.scrollTo(-300)
  const openSheetUpload = () => UploadSheetRef.current?.scrollTo(-200)

  const closeSheet = () => {
    ExpertiseRef.current?.scrollTo(0)
    IssueDateRef.current?.scrollTo(0)
    ExpiryDateRef.current?.scrollTo(0)
    UploadSheetRef.current?.scrollTo(0)
  }

  const onSubmit = async (data: ExpertiseUpdateType) => {
    Keyboard.dismiss()

    // console.log(JSON.stringify(data, null, 2))

    updateExpertise(
      { consultantId, updatedData: data },
      {
        onSuccess: () => {
          router.back()
        }
      }
    )
  }

  const onExpertiseSelect = (expertise: string) => {
    setValue("expertise", expertise)
    setSelectedExpertise(expertise)
    closeSheet()
  }

  const onDateSelect = (
    _event: DateTimePickerEvent,
    type: "issueDate" | "expiryDate",
    selectedDate?: Date
  ) => {
    if (selectedDate) {
      const formattedDate = formatUTCDate(selectedDate)

      if (type === "issueDate") {
        setValue("issueDate", formattedDate)
        setSelectedIssueDate(selectedDate)
      } else {
        setValue("expiryDate", formattedDate)
        setSelectedExpiryDate(selectedDate)
      }
    }
  }

  const issueDateLabel = formatDate(selectedIssueDate || "")
  const expiryDateLabel = formatDate(selectedExpiryDate || "")

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="h-full flex-1 bg-background">
        <Container>
          <Header back label="Cập nhật chuyên môn" />

          <Content className="mt-2">
            <ScrollArea>
              <VStack gap={12} className="pb-20">
                <Select
                  label="Chuyên môn"
                  defaultValue="Chọn chuyên môn"
                  value={selectedExpertise}
                  onPress={openSheetExpertise}
                />

                <Controller
                  name="number"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      label="Số hiệu"
                      onChangeText={onChange}
                      canClearText
                      errorMessage={errors.number?.message}
                    />
                  )}
                />

                <Controller
                  name="certificate"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      label="Tên chứng chỉ"
                      onChangeText={onChange}
                      canClearText
                      errorMessage={errors.certificate?.message}
                    />
                  )}
                />

                <Select
                  label="Ngày cấp"
                  defaultValue="Chọn ngày cấp"
                  value={issueDateLabel}
                  onPress={openSheetIssueDate}
                  errorMessage={errors.issueDate?.message}
                />

                <Select
                  label="Ngày hết hạn"
                  defaultValue="Chọn ngày hết hạn"
                  value={expiryDateLabel}
                  onPress={openSheetExpiryDate}
                  errorMessage={errors.expiryDate?.message}
                />

                <Controller
                  name="issuedBy"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      label="Nơi cấp"
                      onChangeText={onChange}
                      canClearText
                      errorMessage={errors.issuedBy?.message}
                    />
                  )}
                />

                <VStack>
                  <Text className="font-tregular text-base text-primary">
                    Hình ảnh chứng chỉ
                  </Text>

                  <Card className="py-6" onPress={openSheetUpload}>
                    <VStack center gap={10}>
                      <GalleryAdd
                        variant="Bold"
                        size="32"
                        color={COLORS.accent}
                      />
                      <Text className="text-justify font-tmedium text-sm text-accent">
                        Tải hình ảnh chứng chỉ lên
                      </Text>
                    </VStack>
                  </Card>

                  {errors.imageUrls?.message && imageUrls.length === 0 && (
                    <ErrorText text={errors.imageUrls?.message} />
                  )}
                </VStack>

                <View className="flex-row flex-wrap">
                  {imageUrls.length > 0 &&
                    imageUrls.map((item, index) => (
                      <View
                        key={index}
                        style={{ width: "30%", aspectRatio: 1, margin: "1.5%" }}
                      >
                        {item.uri && (
                          <Image
                            source={{ uri: item.uri }}
                            className="h-full w-full rounded-xl"
                          />
                        )}

                        {(item.uploading || item.deleting) && (
                          <View
                            className="absolute inset-0 items-center justify-center rounded-xl"
                            style={{
                              backgroundColor: "rgba(0,0,0,0.5)"
                            }}
                          >
                            <ActivityIndicator size="small" color="#fff" />
                            <Text className="font-tmedium text-sm text-white">
                              {item.progress}%
                            </Text>
                          </View>
                        )}

                        {!item.uploading && !item.deleting && (
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                              handleDeleteImageAndUpdateStore(
                                item.fileName,
                                setValue
                              )
                            }
                            className="absolute right-2 top-2 rounded-full bg-border p-1"
                          >
                            <X size={14} color={COLORS.primary} />
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                </View>
              </VStack>
            </ScrollArea>
          </Content>

          <Button onPress={handleSubmit(onSubmit)} className="mb-4">
            Cập nhật
          </Button>
        </Container>

        <Sheet ref={ExpertiseRef} dynamicHeight={540}>
          {expertiseData.expertise.map((expertise) => (
            <SheetItem
              key={expertise.expertiseId}
              item={expertise.name}
              isSelected={selectedExpertise === expertise.name}
              onSelect={() => onExpertiseSelect(expertise.name)}
            />
          ))}
        </Sheet>

        <Sheet ref={IssueDateRef} dynamicHeight={300}>
          <View className="items-center">
            <DateTimePicker
              value={new Date(selectedIssueDate || "")}
              mode="date"
              display="spinner"
              onChange={(event, date) => onDateSelect(event, "issueDate", date)}
              minimumDate={new Date(1904, 0, 1)}
              maximumDate={new Date()}
              locale="vi"
            />
          </View>
        </Sheet>

        <Sheet ref={ExpiryDateRef} dynamicHeight={300}>
          <View className="items-center">
            <DateTimePicker
              value={new Date(selectedExpiryDate || "")}
              mode="date"
              display="spinner"
              onChange={(event, date) =>
                onDateSelect(event, "expiryDate", date)
              }
              minimumDate={new Date(1904, 0, 1)}
              maximumDate={new Date()}
              locale="vi"
            />
          </View>
        </Sheet>

        <Sheet ref={UploadSheetRef} dynamicHeight={300}>
          {DATA.UPLOADS.map((option) => {
            const Icon = option.icon

            return (
              <SheetSelect
                key={option.value}
                label={option.label}
                icon={
                  <Icon variant="Bold" size={24} color={COLORS.secondary} />
                }
                onPress={() => {
                  closeSheet()
                  handleSelectImage(
                    option.value === "library",
                    handleUploadImage
                  )
                }}
              />
            )
          })}
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default ExpertiseUpdateScreen
